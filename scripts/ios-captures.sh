#!/usr/bin/env bash
# Installe l'app (build simulateur avec VITE_IOS_CAPTURE=1) sur deux simulateurs : un iPhone de 390 × 844 points
# comme l'iPhone 12 de test, et un iPhone récent. L'app parcourt elle-même ses pages (overlay/app/src/ios/
# captureMode.js) : quand une page est prête, elle écrit son nom dans Documents/capture/ready.txt de son conteneur ;
# on capture l'écran, puis on répond dans Documents/capture/ack.txt, et l'app passe à la suite, jusqu'à « fin ».
# La console est enregistrée ; ses erreurs JavaScript sont résumées dans js-errors.txt.
#   scripts/ios-captures.sh <chemin/App.app> <dossier de sortie>
set -euo pipefail
APP="$1"; OUT="$2"; BUNDLE="fr.jpesquet.sante"
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

run_device() { # <udid> <nom>
  local udid="$1" name="$2" dev log pid seen=0 deadline
  dev="$(echo "$name" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')"
  log="$OUT/$dev-console.txt"
  echo "== $name ($udid)"
  xcrun simctl boot "$udid" 2>/dev/null || true
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
      printf '%s' "$page" > "$data/Documents/capture/ack.txt"
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
