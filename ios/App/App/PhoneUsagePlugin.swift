import Capacitor
import DeviceActivity
import FamilyControls
import Foundation
// Les segments (`activitySegments`, `categories`, `applications`) sont déclarés dans le recouvrement
// `_DeviceActivity_SwiftUI`, chargé seulement quand SwiftUI est importé aussi.
import SwiftUI

/// Temps d'écran sur iPhone (étape I8) : même nom de plugin que `PhoneUsagePlugin.java` d'Android, vu de
/// `src/services/phoneUsageSync.js` (correctif iOS) et d'`src/ios/phoneUsageIos.js`. Android lit les allumages d'écran
/// un à un ; l'iPhone donne des totaux par heure (`DeviceActivityData.activityData`, iOS 26.4+), seulement sur un
/// appareil de l'UE et avec l'accord de la personne (`approvedWithDataAccess`, droit « Family Controls App and Website
/// Usage » accordé à Halcya le 30/10). Rien ne sort du téléphone : les totaux vont à l'app, qui les range sur place.
@objc(PhoneUsagePlugin)
public class PhoneUsagePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "PhoneUsagePlugin"
    public let jsName = "PhoneUsage"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "checkAccess", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "openAccessSettings", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "queryUsageSegments", returnType: CAPPluginReturnPromise),
    ]

    /// `{ granted, supported }`, comme sur Android : `supported` faux avant iOS 26.4.
    @objc func checkAccess(_ call: CAPPluginCall) {
        guard #available(iOS 26.4, *) else {
            call.resolve(["granted": false, "supported": false])
            return
        }
        call.resolve(["granted": AuthorizationCenter.shared.authorizationStatus == .approvedWithDataAccess, "supported": true])
    }

    /// Sur Android, ouvre le réglage « Accès aux données d'utilisation » ; sur iPhone, demande l'autorisation Temps
    /// d'écran de la personne (Face ID ou code), puis rend le nouvel état.
    @objc func openAccessSettings(_ call: CAPPluginCall) {
        guard #available(iOS 26.4, *) else {
            call.resolve(["granted": false, "supported": false])
            return
        }
        Task {
            do {
                try await AuthorizationCenter.shared.requestAuthorization(for: .individual)
                call.resolve(["granted": AuthorizationCenter.shared.authorizationStatus == .approvedWithDataAccess, "supported": true])
            } catch {
                call.reject("Temps d’écran non autorisé : \(error.localizedDescription)")
            }
        }
    }

    /// Segments horaires `{ start, end, activeMs, pickups, firstPickup }` (millisecondes) entre `start` et `end`.
    @objc func queryUsageSegments(_ call: CAPPluginCall) {
        guard #available(iOS 26.4, *) else {
            call.reject("Temps d’écran : iOS 26.4 ou plus")
            return
        }
        let now = Date().timeIntervalSince1970 * 1000
        let start = Date(timeIntervalSince1970: (call.getDouble("start") ?? now - 7 * 86_400_000) / 1000)
        let end = Date(timeIntervalSince1970: (call.getDouble("end") ?? now) / 1000)
        guard end > start else {
            call.resolve(["segments": []])
            return
        }
        let filter = DeviceActivityFilter(segment: .hourly(during: DateInterval(start: start, end: end)), users: .all, devices: .init([.iPhone]))
        Task {
            do {
                var segments: [[String: Any]] = []
                for try await data in DeviceActivityData.activityData(filteredBy: filter) {
                    for await segment in data.activitySegments {
                        var pickups = segment.totalPickupsWithoutApplicationActivity
                        for await category in segment.categories {
                            for await app in category.applications {
                                pickups += app.numberOfPickups
                            }
                        }
                        var item: [String: Any] = [
                            "start": segment.dateInterval.start.timeIntervalSince1970 * 1000,
                            "end": segment.dateInterval.end.timeIntervalSince1970 * 1000,
                            "activeMs": segment.totalActivityDuration * 1000,
                            "pickups": pickups,
                        ]
                        if let first = segment.firstPickup { item["firstPickup"] = first.timeIntervalSince1970 * 1000 }
                        segments.append(item)
                    }
                }
                call.resolve(["segments": segments])
            } catch {
                call.reject("Lecture du temps d’écran impossible : \(error.localizedDescription)")
            }
        }
    }
}
