import XCTest

/// Test d'interface de la CI (étape I4), écrit dans ce dépôt, sans bibliothèque tierce. Le mode captures de Halcya
/// a ouvert la feuille « Accès à Santé » et attend la réponse ; scripts/ios-captures.sh lance ce test sur le même
/// simulateur, qui touche « Tout activer » puis « Autoriser ». L'app n'est pas relancée : on la remet au premier plan.
/// Simulateur vierge : aucune donnée de santé réelle.
final class SanteUITests: XCTestCase {
    private let halcya = XCUIApplication(bundleIdentifier: "fr.jpesquet.sante")

    func testAccepterLaFeuilleSante() throws {
        halcya.activate()
        let toutActiver = element("Tout activer")
        guard toutActiver.waitForExistence(timeout: 30) else {
            // Arbre d'accessibilité dans le journal du test, pour comprendre où se trouve la feuille
            print(halcya.debugDescription)
            print(XCUIApplication(bundleIdentifier: "com.apple.springboard").debugDescription)
            XCTFail("« Tout activer » introuvable sur la feuille de l'app Santé")
            return
        }
        let autoriser = halcya.buttons["Autoriser"]
        // Un toucher pendant l'animation de la feuille peut se perdre (CI du 27/10, iPhone 17 Pro) : on retouche
        // « Tout activer » tant qu'« Autoriser » reste grisé, trois fois au plus
        var actif = false
        for _ in 1...3 where !actif {
            if toutActiver.exists { toutActiver.tap() } // une fois pris, le libellé peut changer
            actif = XCTWaiter().wait(for: [condition(autoriser, "isEnabled == true")], timeout: 5) == .completed
        }
        XCTAssertTrue(actif, "« Autoriser » toujours grisé après trois touchers sur « Tout activer »")
        autoriser.tap()
        attendre(autoriser, "exists == false", 15)
    }

    /// Premier élément dont le libellé est exactement `label`, quel que soit son type (bouton, cellule, texte).
    private func element(_ label: String) -> XCUIElement {
        halcya.descendants(matching: .any).matching(NSPredicate(format: "label == %@", label)).firstMatch
    }

    private func condition(_ element: XCUIElement, _ predicate: String) -> XCTNSPredicateExpectation {
        XCTNSPredicateExpectation(predicate: NSPredicate(format: predicate), object: element)
    }

    private func attendre(_ element: XCUIElement, _ predicate: String, _ timeout: TimeInterval) {
        let atteint = XCTWaiter().wait(for: [condition(element, predicate)], timeout: timeout)
        XCTAssertEqual(atteint, .completed, "« \(predicate) » non atteint")
    }
}
