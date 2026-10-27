#!/usr/bin/env bash
# Installe l'app (build simulateur avec VITE_IOS_CAPTURE=1) sur deux simulateurs : un iPhone de 390 × 844 points
# comme l'iPhone 12 de test, et un iPhone récent. L'app parcourt elle-même ses pages (overlay/app/src/ios/
# captureMode.js) : quand une page est prête, elle écrit son nom dans Documents/capture/ready.txt de son conteneur ;
# on capture l'écran, puis on répond dans Documents/capture/ack.txt, et l'app passe à la suite, jusqu'à « fin ».
# La console est enregistrée ; ses erreurs JavaScript sont résumées dans js-errors.txt.
# Sur la feuille « Accès à Santé » (I4), le test d'interface du dépôt (uitests/, déjà construit : fichier .xctestrun)
# touche « Tout activer » puis « Autoriser » avant l'accusé ; sans lui, la feuille reste ouverte.
#   scripts/ios-captures.sh <chemin/App.app> <dossier de sortie> [<fichier .xctestrun>]
set -euo pipefail
APP="$1"; OUT="$2"; XCTESTRUN="${3:-}"; BUNDLE="fr.jpesquet.sante"
mkdir -p "$OUT"

# Premier simulateur disponible dont le nom correspond, dans l'ordre de préférence donné
pick() {
  for name in "$@"; do
    udid="$(xcrun simctl list devices available -j | jq -r --arg n "$name" \
      '[.devices | to_entries[] | select(.key | test("iOS")) | .value[] | select(.name == $n)] | last | .udid // empty')"
    if [ -n "$udid" ]; then echo "$udid $name"; return 0; fi
  done
  return 1
}

SMALL="$(pick "iPhone 16e" "iPhone 14" "iPhone 13" "iPhone 12" || true)"
LARGE="$(pick "iPhone 17 Pro" "iPhone 17" "iPhone 16 Pro" "iPhone 16" "iPhone 15 Pro" || true)"
[ -n "$SMALL$LARGE" ] || { echo "::error::Aucun simulateur iPhone disponible"; xcrun simctl list devices available; exit 1; }

# Feuille de l'app Santé acceptée par le test d'interface, puis capture de l'écran qui suit (feuille fermée)
accept_health() { # <udid> <préfixe des fichiers>
  if [ -z "$XCTESTRUN" ] || [ ! -f "$XCTESTRUN" ]; then
    echo "::warning::test d'interface absent : feuille de l'app Santé laissée ouverte"
    return 0
  fi
  if xcodebuild test-without-building -xctestrun "$XCTESTRUN" -destination "id=$1" \
      -only-testing:HalcyaUITests/SanteUITests/testAccepterLaFeuilleSante > "$OUT/$2-test-interface.txt" 2>&1; then
    echo "test d'interface : feuille de l'app Santé acceptée"
  else
    echo "::warning::$2 : test d'interface en échec (voir $2-test-interface.txt)"
    grep -E "error:|failed|introuvable|absent|non atteint" "$OUT/$2-test-interface.txt" | head -8 || true
  fi
  sleep 2
  xcrun simctl io "$1" screenshot "$OUT/$2-healthkit-apres.png" >/dev/null || true
}

run_device() { # <udid> <nom>
  local udid="$1" name="$2" dev log pid seen=0 deadline
  dev="$(echo "$name" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')"
  log="$OUT/$dev-console.txt"
  echo "== $name ($udid)"
  xcrun simctl boot "$udid" 2>/dev/null || true
  xcrun simctl bootstatus "$udid" -b >/dev/null
  # iPhone en français (feuilles et boutons d'iOS comme chez un utilisateur français) : réglage global, puis
  # redémarrage du simulateur pour que les processus d'iOS le prennent
  xcrun simctl spawn "$udid" defaults write -g AppleLanguages -array fr-FR
  xcrun simctl spawn "$udid" defaults write -g AppleLocale -string fr_FR
  xcrun simctl shutdown "$udid"
  xcrun simctl boot "$udid"
  xcrun simctl bootstatus "$udid" -b >/dev/null
  xcrun simctl ui "$udid" appearance light
  xcrun simctl install "$udid" "$APP"
  # Accusé vide créé d'avance : sans lui, chaque lecture de l'app en attente remplit la console d'erreurs « fichier absent »
  data="$(xcrun simctl get_app_container "$udid" "$BUNDLE" data)"
  mkdir -p "$data/Documents/capture"
  : > "$data/Documents/capture/ack.txt"
  xcrun simctl launch --console-pty --terminate-running-process "$udid" "$BUNDLE" > "$log" 2>&1 &
  pid=$!
  deadline=$((SECONDS + 900)); last=""
  while [ "$SECONDS" -lt "$deadline" ]; do
    page="$(cat "$data/Documents/capture/ready.txt" 2>/dev/null || true)"
    if [ -n "$page" ] && [ "$page" != "$last" ]; then
      [ "$page" = fin ] && break
      xcrun simctl io "$udid" screenshot "$OUT/$dev-$page.png" >/dev/null
      echo "capture : $dev-$page.png"
      seen=$((seen + 1)); last="$page"
      [ "$page" != healthkit-autorisation ] || accept_health "$udid" "$dev"
      printf '%s' "$page" > "$data/Documents/capture/ack.txt"
    fi
    # L'app s'est arrêtée (plantage) : inutile d'attendre la limite, la cause est dans la console
    if ! kill -0 "$pid" 2>/dev/null; then
      echo "::warning::$name : l'app s'est arrêtée en cours de parcours (voir $dev-console.txt)"
      grep -a -m1 "Terminating app" "$log" || true
      break
    fi
    sleep 0.3
  done
  [ "$(cat "$data/Documents/capture/ready.txt" 2>/dev/null)" = fin ] || echo "::warning::$name : parcours des pages inachevé ($seen capture(s))"
  # Données (I3) : la copie de secours s'écrit 10 s après le dernier chargement ; où WKWebView range IndexedDB
  sleep 12
  { echo "== Documents"; ls -la "$data/Documents"; echo "== Library/WebKit"; find "$data/Library/WebKit" -maxdepth 6 2>/dev/null | sed "s|$data/||" | head -60; } > "$OUT/$dev-donnees.txt" 2>&1
  grep -q "Halcya-copie-de-secours.json" "$OUT/$dev-donnees.txt" && echo "copie de secours : présente" || echo "::warning::$name : pas de copie de secours dans Documents"
  xcrun simctl terminate "$udid" "$BUNDLE" 2>/dev/null || true
  sleep 1; kill "$pid" 2>/dev/null || true
  xcrun simctl shutdown "$udid" || true
}

[ -z "$SMALL" ] || run_device "${SMALL%% *}" "${SMALL#* }"
[ -z "$LARGE" ] || run_device "${LARGE%% *}" "${LARGE#* }"

# Erreurs JavaScript relayées par Capacitor (« ⚡️  [error] - … ») et exceptions non rattrapées
grep -hE "\[error\]|Unhandled|TypeError|ReferenceError|SyntaxError" "$OUT"/*-console.txt > "$OUT/js-errors.txt" || true
echo "erreurs JavaScript : $(wc -l < "$OUT/js-errors.txt" | tr -d ' ') ligne(s) (js-errors.txt)"
