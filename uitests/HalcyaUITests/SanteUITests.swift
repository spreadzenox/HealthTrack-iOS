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
        toutActiver.tap()

        let autoriser = halcya.buttons["Autoriser"]
        XCTAssertTrue(autoriser.waitForExistence(timeout: 10), "bouton « Autoriser » absent")
        attendre(autoriser, "isEnabled == true", 10)
        autoriser.tap()
        attendre(autoriser, "exists == false", 15)
    }

    /// Premier élément dont le libellé est exactement `label`, quel que soit son type (bouton, cellule, texte).
    private func element(_ label: String) -> XCUIElement {
        halcya.descendants(matching: .any).matching(NSPredicate(format: "label == %@", label)).firstMatch
    }

    private func attendre(_ element: XCUIElement, _ condition: String, _ timeout: TimeInterval) {
        let attente = XCTNSPredicateExpectation(predicate: NSPredicate(format: condition), object: element)
        XCTAssertEqual(XCTWaiter().wait(for: [attente], timeout: timeout), .completed, "« \(condition) » non atteint")
    }
}
