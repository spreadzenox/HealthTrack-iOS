import XCTest
@testable import HalcyaRules

/// Mémoire du bilan du ventre du soir sur iPhone : mêmes règles que GutEveningPlugin.java d'Android (configure,
/// boîte des bilans vidée par l'app à l'ouverture), plus les soirs à programmer d'avance.
final class GutEveningStoreTests: XCTestCase {
    final class Memory: KeyValueStore {
        var values: [String: Any] = [:]
        func object(forKey key: String) -> Any? { values[key] }
        func set(_ value: Any?, forKey key: String) { values[key] = value }
    }

    private let paris: Calendar = {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = TimeZone(identifier: "Europe/Paris")!
        return calendar
    }()

    private func date(_ day: Int, _ hour: Int, _ minute: Int = 0) -> Date {
        paris.date(from: DateComponents(year: 2026, month: 10, day: day, hour: hour, minute: minute))!
    }

    func testEteintParDefautA20h() {
        let store = GutEveningStore(defaults: Memory())
        XCTAssertFalse(store.enabled)
        XCTAssertEqual(store.minuteOfDay, 20 * 60)
        XCTAssertEqual(store.plan(now: date(28, 9), calendar: paris), [])
    }

    func testConfigureHeureRameneeEtJourDuBilanLePlusRecent() {
        let store = GutEveningStore(defaults: Memory())
        store.configure(enabled: true, minuteOfDay: 7 * 60, noteDay: "2026-10-27")
        XCTAssertTrue(store.enabled)
        XCTAssertEqual(store.minuteOfDay, 18 * 60)
        // un bilan donné depuis la notification n'est peut-être pas encore importé : on garde le plus récent
        store.configure(enabled: nil, minuteOfDay: nil, noteDay: "2026-10-25")
        XCTAssertEqual(store.noteDay, "2026-10-27")
        store.configure(enabled: nil, minuteOfDay: nil, noteDay: "pas une date")
        XCTAssertEqual(store.noteDay, "2026-10-27")
        store.configure(enabled: false, minuteOfDay: nil, noteDay: nil)
        XCTAssertFalse(store.enabled)
    }

    func testSoirsAProgrammerSansLeJourDuBilan() {
        let store = GutEveningStore(defaults: Memory())
        store.configure(enabled: true, minuteOfDay: 20 * 60, noteDay: "2026-10-28")
        XCTAssertEqual(store.plan(now: date(28, 9), calendar: paris).first, date(29, 20))
    }

    func testGesteRangeDansLaBoiteEtCompteCommeBilanDuJour() {
        let store = GutEveningStore(defaults: Memory())
        store.configure(enabled: true, minuteOfDay: 20 * 60, noteDay: nil)
        XCTAssertTrue(store.answer(level: "pain", answeredAt: date(28, 20, 5), askedAt: date(28, 20), calendar: paris))
        XCTAssertFalse(store.answer(level: "terrible", answeredAt: date(28, 20, 6), askedAt: date(28, 20), calendar: paris))
        XCTAssertEqual(store.noteDay, "2026-10-28")
        XCTAssertEqual(store.answers, 1)
        let notes = store.inbox()
        XCTAssertEqual(notes.count, 1)
        XCTAssertTrue(notes[0].json.contains("\"level\":\"pain\""))
        // le soir même n'est plus programmé : le prochain soir est demain
        XCTAssertEqual(store.plan(now: date(28, 20, 7), calendar: paris).first, date(29, 20))
    }

    func testRetirerLesBilansImportes() {
        let store = GutEveningStore(defaults: Memory())
        _ = store.answer(level: "calm", answeredAt: date(27, 20, 1), askedAt: date(27, 20), calendar: paris)
        _ = store.answer(level: "discomfort", answeredAt: date(28, 20, 1), askedAt: date(28, 20), calendar: paris)
        let names = store.inbox().map(\.name)
        XCTAssertEqual(names.count, 2)
        XCTAssertNotEqual(names[0], names[1])
        XCTAssertEqual(store.remove(names: [names[0], "inconnu"]), 1)
        XCTAssertEqual(store.inbox().map(\.name), [names[1]])
    }

    func testBoiteBornee() {
        let store = GutEveningStore(defaults: Memory())
        for i in 0..<(GutEveningStore.inboxMax + 5) {
            _ = store.answer(level: "calm", answeredAt: Date(timeIntervalSince1970: Double(1_761_000_000 + i * 60)),
                             askedAt: Date(timeIntervalSince1970: Double(1_761_000_000 + i * 60)), calendar: paris)
        }
        XCTAssertEqual(store.inbox().count, GutEveningStore.inboxMax)
    }
}
