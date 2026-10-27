#!/usr/bin/env bash
# Récupère le code de HealthTrack (version Android, dépôt en lecture seule) au commit suivi par upstream.json,
# puis y applique les adaptations iOS de ce dépôt : patches/*.patch (dans l'ordre des noms), overlay/ (fichiers
# ajoutés) et ios/ (projet natif, copié dans upstream/app/ios).
#
#   scripts/upstream.sh            prépare upstream/ au commit de upstream.json
#   scripts/upstream.sh --latest   met d'abord upstream.json sur le dernier commit de main dont « Play — AAB » a réussi
#                                  (= la dernière version envoyée sur Google Play), puis prépare upstream/
#
# Échoue bruyamment si un correctif ne s'applique plus : Android a changé le fichier, le correctif est à refaire.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${UPSTREAM_DIR:-$ROOT/upstream}"
REPO="$(node -p "require('$ROOT/upstream.json').repo")"
URL="https://github.com/$REPO"

# Historique complet des commits (pour le numéro de version), contenus téléchargés à la demande
if [ ! -d "$DEST/.git" ]; then
  git clone --quiet --filter=blob:none --no-checkout "$URL" "$DEST"
fi
git -C "$DEST" fetch --quiet --filter=blob:none origin main

if [ "${1:-}" = "--latest" ]; then
  API="repos/$REPO/actions/workflows/play-bundle.yml/runs?branch=main&status=success&per_page=1"
  if command -v gh >/dev/null 2>&1 && gh api "$API" >/dev/null 2>&1; then
    SHA="$(gh api "$API" --jq '.workflow_runs[0].head_sha')"
  else
    SHA="$(curl -fsSL "https://api.github.com/$API" | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>console.log(JSON.parse(s).workflow_runs[0].head_sha))")"
  fi
  git -C "$DEST" cat-file -e "$SHA^{commit}"
  COUNT="$(git -C "$DEST" rev-list --count "$SHA")"
  DATE="$(git -C "$DEST" log -1 --format=%cI "$SHA")"
  node -e "
    const fs = require('fs'), p = '$ROOT/upstream.json', u = JSON.parse(fs.readFileSync(p, 'utf8'));
    Object.assign(u, { commit: '$SHA', versionCode: $COUNT, date: '$DATE' });
    fs.writeFileSync(p, JSON.stringify(u, null, 2) + '\n');
  "
  echo "upstream.json → $SHA (Android v$COUNT, $DATE)"
fi

SHA="$(node -p "require('$ROOT/upstream.json').commit")"
EXPECTED="$(node -p "require('$ROOT/upstream.json').versionCode")"
git -C "$DEST" checkout --quiet --force --detach "$SHA"
git -C "$DEST" clean -fdxq -e app/node_modules
COUNT="$(git -C "$DEST" rev-list --count HEAD)"
if [ "$COUNT" != "$EXPECTED" ]; then
  echo "::error::upstream.json annonce v$EXPECTED mais le commit $SHA donne v$COUNT" >&2
  exit 1
fi

shopt -s nullglob
PATCHES=("$ROOT"/patches/*.patch)
for patch in "${PATCHES[@]}"; do
  if ! git -C "$DEST" apply --3way --whitespace=nowarn "$patch"; then
    echo "::error::Le correctif $(basename "$patch") ne s'applique plus sur Android v$COUNT : le refaire" >&2
    exit 1
  fi
done
if [ -d "$ROOT/overlay" ]; then
  cp -R "$ROOT/overlay/." "$DEST/"
fi
# Projet natif copié (pas lié) : le Package.swift que `cap sync ios` régénère pointe vers app/node_modules en relatif
rm -rf "$DEST/app/ios"
if [ -d "$ROOT/ios" ]; then
  cp -R "$ROOT/ios" "$DEST/app/ios"
fi

echo "upstream/ prêt : Android v$COUNT ($SHA), ${#PATCHES[@]} correctif(s)"
