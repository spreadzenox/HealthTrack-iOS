#!/usr/bin/env bash
# Installe l'app (build simulateur avec VITE_IOS_CAPTURE=1) sur deux simulateurs : un iPhone de 390 × 844 points
# comme l'iPhone 12 de test, et un iPhone récent. Capture : l'onboarding d'une installation vierge, puis chaque page
# avec les données de démo d'Android (thème clair), et quelques pages en thème sombre. La console JavaScript de l'app
# (relayée par Capacitor) est enregistrée ; ses erreurs sont résumées dans js-errors.txt.
#   scripts/ios-captures.sh <chemin/App.app> <dossier de sortie>
set -euo pipefail
APP="$1"; OUT="$2"; BUNDLE="fr.jpesquet.sante"
mkdir -p "$OUT"

# Les mêmes pages que `npm run visual` d'Android (upstream/app/scripts/visual/visual-check.mjs, DEFAULT_ROUTES)
ROUTES=(/ /journal /tendances /food /nutrition /data /connectors /recommendations /settings /plus /montre /premium /bien-etre /reintroduction)
DARK_ROUTES=(/ /journal /recommendations)

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

slugify() { echo "$1" | tr ' ' '-' | tr '[:upper:]' '[:lower:]'; }
shot() { xcrun simctl io "$1" screenshot "$OUT/$2.png" >/dev/null; echo "capture : $2.png"; }
page_name() { local p="${1#/}"; echo "${p:-accueil}"; }
open_capture() { xcrun simctl openurl "$1" "halcya-capture://go?$2"; sleep "${3:-5}"; }

run_device() { # <udid> <nom> <complet: 1|0>
  local udid="$1" name="$2" full="$3" dev pid
  dev="$(slugify "$name")"
  echo "== $name ($udid)"
  xcrun simctl boot "$udid" 2>/dev/null || true
  xcrun simctl bootstatus "$udid" -b >/dev/null
  xcrun simctl ui "$udid" appearance light
  xcrun simctl install "$udid" "$APP"
  # Console de l'app (stdout de Capacitor) tant qu'elle tourne
  xcrun simctl launch --console-pty --terminate-running-process "$udid" "$BUNDLE" > "$OUT/$dev-console.txt" 2>&1 &
  pid=$!
  sleep 15
  shot "$udid" "$dev-vierge-onboarding"
  open_capture "$udid" "data=demo&theme=light&route=%2F" 10
  local routes=("${ROUTES[@]}")
  [ "$full" = 1 ] || routes=(/ /journal /recommendations)
  for r in "${routes[@]}"; do
    open_capture "$udid" "route=$(printf '%s' "$r" | sed 's#/#%2F#g')"
    shot "$udid" "$dev-demo-clair-$(page_name "$r")"
  done
  for r in "${DARK_ROUTES[@]}"; do
    open_capture "$udid" "theme=dark&route=$(printf '%s' "$r" | sed 's#/#%2F#g')"
    shot "$udid" "$dev-demo-sombre-$(page_name "$r")"
  done
  xcrun simctl terminate "$udid" "$BUNDLE" 2>/dev/null || true
  sleep 1; kill "$pid" 2>/dev/null || true
  xcrun simctl shutdown "$udid" || true
}

[ -z "$SMALL" ] || run_device "${SMALL%% *}" "${SMALL#* }" 1
[ -z "$LARGE" ] || run_device "${LARGE%% *}" "${LARGE#* }" 0

# Erreurs JavaScript relayées par Capacitor (« ⚡️  [error] - … ») et exceptions non rattrapées
grep -hE "\[error\]|Unhandled|TypeError|ReferenceError|SyntaxError" "$OUT"/*-console.txt > "$OUT/js-errors.txt" || true
echo "erreurs JavaScript : $(wc -l < "$OUT/js-errors.txt" | tr -d ' ') ligne(s) (js-errors.txt)"
