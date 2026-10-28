#if DEBUG
import Capacitor
import Foundation

/// Build de captures seulement (configuration Debug, jamais livrée) : ce que la sauvegarde iCloud du téléphone
/// emporterait des données de l'app (`src/ios/captureMode.js` › `probeBackup`). La sauvegarde prend Documents et
/// Library, sauf Library/Caches et ce qui est marqué « exclu de la sauvegarde » (l'élément ou un dossier parent).
@objc(CaptureProbePlugin)
public class CaptureProbePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "CaptureProbePlugin"
    public let jsName = "CaptureProbe"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "backupStatus", returnType: CAPPluginReturnPromise),
    ]

    /// { items: [{ path, excluded, bytes, files }] } : Documents, Library/WebKit et chaque dossier IndexedDB trouvé
    /// sous Library (chemins relatifs au conteneur de l'app).
    @objc func backupStatus(_ call: CAPPluginCall) {
        let fm = FileManager.default
        let home = URL(fileURLWithPath: NSHomeDirectory()).standardizedFileURL
        let library = fm.urls(for: .libraryDirectory, in: .userDomainMask)[0]
        var targets = [fm.urls(for: .documentDirectory, in: .userDomainMask)[0], library.appendingPathComponent("WebKit")]
        if let walk = fm.enumerator(at: library, includingPropertiesForKeys: [.isDirectoryKey]) {
            for case let url as URL in walk where url.lastPathComponent == "IndexedDB" { targets.append(url) }
        }
        let items: [[String: Any]] = targets.filter { fm.fileExists(atPath: $0.path) }.map { url in
            let (bytes, files) = Self.size(of: url)
            return [
                "path": Self.relative(url, to: home),
                "excluded": Self.excluded(url, below: home),
                "bytes": bytes,
                "files": files,
            ]
        }
        call.resolve(["items": items])
    }

    private static func relative(_ url: URL, to home: URL) -> String {
        let path = url.standardizedFileURL.path
        return path.hasPrefix(home.path + "/") ? String(path.dropFirst(home.path.count + 1)) : path
    }

    /// Exclu de la sauvegarde : l'élément ou l'un de ses dossiers parents jusqu'au conteneur, ou sous Library/Caches.
    private static func excluded(_ url: URL, below home: URL) -> Bool {
        var current = url.standardizedFileURL
        while current.path.count > home.path.count {
            if current.path.hasSuffix("/Library/Caches") { return true }
            if (try? current.resourceValues(forKeys: [.isExcludedFromBackupKey]))?.isExcludedFromBackup == true { return true }
            current = current.deletingLastPathComponent()
        }
        return false
    }

    private static func size(of url: URL) -> (Int, Int) {
        guard let walk = FileManager.default.enumerator(at: url, includingPropertiesForKeys: [.fileSizeKey, .isRegularFileKey])
        else { return (0, 0) }
        var bytes = 0, files = 0
        for case let file as URL in walk {
            let values = try? file.resourceValues(forKeys: [.fileSizeKey, .isRegularFileKey])
            guard values?.isRegularFile == true else { continue }
            bytes += values?.fileSize ?? 0
            files += 1
        }
        return (bytes, files)
    }
}
#endif
