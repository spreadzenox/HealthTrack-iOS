import Capacitor
import Foundation
import HalcyaRules
import HealthKit

/// Cycle noté dans l'app Santé (CYCLE-iOS-1, décision du propriétaire du 10/11 vers 18:50, « Ok cycle ») : règles,
/// saignements hors des règles et symptômes, lus sur le téléphone et rendus à l'app (`src/ios/cycleSante.js`), qui les
/// range avec la brique partagée d'Android (`src/services/cycle.js`). Le module Santé utilisé pour le reste
/// (`@capgo/capacitor-health`) ne lit pas ces types. Lecture seule, rien ne sort du téléphone. Sans autorisation de
/// Santé pour ces types (demandée à l'étape CYCLE-iOS-2), HealthKit ne rend rien : la lecture reste vide.
@objc(CycleHealthPlugin)
public class CycleHealthPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "CycleHealthPlugin"
    public let jsName = "CycleHealth"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "readCycle", returnType: CAPPluginReturnPromise),
    ]
    private let store = HKHealthStore()

    /// `{ samples: [{ kind, flow?, symptom?, start, sourceName }] }` entre `start` et `end` (millisecondes).
    @objc func readCycle(_ call: CAPPluginCall) {
        guard HKHealthStore.isHealthDataAvailable() else {
            call.resolve(["samples": [[String: Any]]()])
            return
        }
        let now = Date().timeIntervalSince1970 * 1000
        let start = Date(timeIntervalSince1970: (call.getDouble("start") ?? now - 183 * 86_400_000) / 1000)
        let end = Date(timeIntervalSince1970: (call.getDouble("end") ?? now) / 1000)
        let predicate = HKQuery.predicateForSamples(withStart: start, end: end, options: [])
        let group = DispatchGroup()
        let lock = NSLock()
        var rows: [[String: Any]] = []
        for id in CycleRule.identifiers {
            guard let type = HKObjectType.categoryType(forIdentifier: HKCategoryTypeIdentifier(rawValue: id)) else { continue }
            group.enter()
            let query = HKSampleQuery(sampleType: type, predicate: predicate, limit: HKObjectQueryNoLimit, sortDescriptors: nil) { _, samples, _ in
                // Erreur (autorisation pas encore demandée) ou rien noté : aucune ligne
                let found: [[String: Any]] = (samples as? [HKCategorySample] ?? []).compactMap { sample in
                    guard var row = CycleRule.row(identifier: id, value: sample.value, startMs: sample.startDate.timeIntervalSince1970 * 1000) else { return nil }
                    row["sourceName"] = sample.sourceRevision.source.name
                    return row
                }
                lock.lock()
                rows.append(contentsOf: found)
                lock.unlock()
                group.leave()
            }
            store.execute(query)
        }
        group.notify(queue: .global(qos: .userInitiated)) {
            call.resolve(["samples": rows])
        }
    }
}
