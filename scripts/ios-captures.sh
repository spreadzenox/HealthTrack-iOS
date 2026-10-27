#!/usr/bin/env bash
# Installe l'app sur deux simulateurs (un iPhone de 390 × 844 points comme l'iPhone 12 de test, et un iPhone récent),
# la lance en thème clair puis sombre et enregistre une capture de chaque, plus le journal de l'app.
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

capture() { # <udid> <nom> <thème>
  local udid="$1" name="$2" theme="$3" slug
  slug="$(echo "$name" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')-$theme"
  xcrun simctl ui "$udid" appearance "$theme"
  xcrun simctl terminate "$udid" "$BUNDLE" 2>/dev/null || true
  xcrun simctl launch "$udid" "$BUNDLE" >/dev/null
  sleep 15
  xcrun simctl io "$udid" screenshot "$OUT/$slug.png" >/dev/null
  echo "capture : $slug.png"
}

for dev in "$SMALL" "$LARGE"; do
  [ -n "$dev" ] || continue
  udid="${dev%% *}"; name="${dev#* }"
  echo "== $name ($udid)"
  xcrun simctl boot "$udid" 2>/dev/null || true
  xcrun simctl bootstatus "$udid" -b >/dev/null
  xcrun simctl install "$udid" "$APP"
  capture "$udid" "$name" light
  capture "$udid" "$name" dark
  # Journal de l'app (console JavaScript relayée par Capacitor, erreurs WebKit) pour la relecture
  xcrun simctl spawn "$udid" log show --last 3m --style compact \
    --predicate 'process == "App" OR subsystem CONTAINS "WebKit"' > "$OUT/$(echo "$name" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')-log.txt" 2>&1 || true
  xcrun simctl shutdown "$udid" || true
done
