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

/// Tests d'interface du bilan du ventre du soir (étape I5), lancés par scripts/ios-captures.sh pendant le parcours des
/// captures : autoriser les notifications, puis répondre « Gêne » à la notification d'essai depuis le centre de
/// notifications, sans ouvrir l'app. L'arbre d'accessibilité est écrit dans le journal du test en cas d'échec.
final class NotificationsUITests: XCTestCase {
    private let halcya = XCUIApplication(bundleIdentifier: "fr.jpesquet.sante")
    private let springboard = XCUIApplication(bundleIdentifier: "com.apple.springboard")
    private let titre = "Et votre ventre aujourd’hui ?"

    /// Alerte « “Halcya” souhaite vous envoyer des notifications » : « Autoriser ».
    func testAutoriserLesNotifications() throws {
        halcya.activate()
        let autoriser = springboard.alerts.buttons["Autoriser"]
        guard autoriser.waitForExistence(timeout: 20) else {
            print(springboard.debugDescription)
            XCTFail("alerte des notifications introuvable")
            return
        }
        autoriser.tap()
    }

    /// Bilan du ventre : bannière dépliée, puis « Gêne ».
    func testRepondreGeneDepuisLaBanniere() throws {
        guard deplierLaBanniere(titre) else { return }
        let gene = springboard.descendants(matching: .any).matching(NSPredicate(format: "label == %@", "Gêne")).firstMatch
        guard gene.waitForExistence(timeout: 10) else {
            XCTFail("bouton « Gêne » absent de la bannière dépliée")
            return
        }
        gene.tap()
        halcya.activate()
    }

    /// Note du soir : bannière « Votre soirée ? » dépliée ; les notes qu'iOS affiche (6 demandées) sont écrites dans le
    /// journal du test, puis « 4 » est touché (ou la dernière affichée si iOS en coupe).
    func testNoterLaSoireeDepuisLaBanniere() throws {
        guard deplierLaBanniere("Votre soirée ?") else { return }
        let visibles = (0...5).map(String.init).filter { springboard.buttons[$0].waitForExistence(timeout: $0 == "0" ? 10 : 1) }
        print("actions visibles : \(visibles.joined(separator: " ")) (\(visibles.count) sur 6)")
        guard let choix = visibles.contains("4") ? "4" : visibles.last else {
            XCTFail("aucune note dans la bannière dépliée")
            return
        }
        springboard.buttons[choix].tap()
        halcya.activate()
    }

    /// Rappel de portion : l'app passe en arrière-plan, la bannière « Votre portion du jour » est touchée comme le soir
    /// venu ; Halcya doit revenir au premier plan (la sonde relève ensuite la page ouverte).
    func testToucherLeRappelDePortion() throws {
        XCUIDevice.shared.press(.home)
        let banniere = springboard.descendants(matching: .any)
            .matching(NSPredicate(format: "identifier == %@ AND label CONTAINS %@", "NotificationShortLookView",
                                  "Votre portion du jour"))
            .firstMatch
        guard banniere.waitForExistence(timeout: 90) else {
            print(springboard.debugDescription)
            XCTFail("bannière « Votre portion du jour » jamais apparue")
            halcya.activate()
            return
        }
        banniere.tap()
        guard halcya.wait(for: .runningForeground, timeout: 15) else {
            XCTFail("Halcya ne s'est pas ouverte au toucher")
            halcya.activate()
            return
        }
    }

    /// Attend la bannière d'une notification d'essai (jusqu'à 90 s : elle part 45 s après le signal) et la déplie par
    /// un appui long, méthode courante des tests d'interface de notifications (l'appui long dans le centre de
    /// notifications ne la dépliait pas, essais du 28/10). Faux si elle n'est jamais apparue.
    private func deplierLaBanniere(_ titre: String) -> Bool {
        let banniere = springboard.descendants(matching: .any)
            .matching(NSPredicate(format: "identifier == %@ AND label CONTAINS %@", "NotificationShortLookView", titre))
            .firstMatch
        guard banniere.waitForExistence(timeout: 90) else {
            print(springboard.debugDescription)
            XCTFail("bannière « \(titre) » jamais apparue")
            return false
        }
        banniere.press(forDuration: 1.5)
        sleep(1)
        print(springboard.debugDescription)
        return true
    }
}

/// Import d'une sauvegarde par le sélecteur de fichiers d'iOS (étape I3), lancé par scripts/ios-captures.sh pendant le
/// parcours des captures : le mode captures a écrit un ancien fichier de sauvegarde inventé dans Documents (visible
/// dans Fichiers › Sur mon iPhone › Halcya) et ouvert Vos données. Le test touche « Choisir un fichier à importer »,
/// va jusqu'au fichier et le choisit ; l'app montre alors l'aperçu de l'import. L'arbre d'accessibilité est écrit
/// dans le journal du test à chaque étape manquée.
final class DonneesUITests: XCTestCase {
    private let halcya = XCUIApplication(bundleIdentifier: "fr.jpesquet.sante")
    private let fichier = "halcya-essai-import"

    func testImporterUnFichierDepuisFichiers() throws {
        halcya.activate()
        let choisir = element("Choisir un fichier à importer")
        guard choisir.waitForExistence(timeout: 30) else {
            print(halcya.debugDescription)
            XCTFail("« Choisir un fichier à importer » introuvable")
            return
        }
        choisir.tap()
        // Selon la version d'iOS, WKWebView ouvre le sélecteur directement ou propose d'abord un menu
        for menu in ["Choisir un fichier", "Choisir des fichiers"] where element(menu).waitForExistence(timeout: 2) {
            element(menu).tap()
            break
        }
        let cible = cellule(fichier)
        if !cible.waitForExistence(timeout: 8) {
            // Pas dans « Récents » : Parcourir › Sur mon iPhone › Halcya
            for etape in ["Parcourir", "Sur mon iPhone", "Halcya"] where !cible.exists {
                let suivant = etape == "Parcourir" ? element(etape) : cellule(etape)
                if suivant.waitForExistence(timeout: 8) {
                    suivant.tap()
                } else {
                    print("étape « \(etape) » absente")
                    print(halcya.debugDescription)
                }
                _ = cible.waitForExistence(timeout: 3)
            }
        }
        guard cible.waitForExistence(timeout: 10) else {
            print(halcya.debugDescription)
            XCTFail("« \(fichier) » introuvable dans le sélecteur de fichiers")
            return
        }
        cible.tap()
        // Selon la version, toucher le fichier l'ouvre, ou il faut encore toucher « Ouvrir »
        let ouvrir = halcya.buttons["Ouvrir"]
        if ouvrir.waitForExistence(timeout: 3) { ouvrir.tap() }
        let apercu = element("Ajouter à mes données")
        if !apercu.waitForExistence(timeout: 30) {
            print(halcya.debugDescription)
            XCTFail("aperçu de l'import jamais affiché")
        }
    }

    /// Premier élément dont le libellé est exactement `label`, quel que soit son type.
    private func element(_ label: String) -> XCUIElement {
        halcya.descendants(matching: .any).matching(NSPredicate(format: "label == %@", label)).firstMatch
    }

    /// Cellule du sélecteur dont le libellé contient `label` (« halcya-essai-import, json, … »).
    private func cellule(_ label: String) -> XCUIElement {
        halcya.descendants(matching: .cell).matching(NSPredicate(format: "label CONTAINS %@", label)).firstMatch
    }
}
