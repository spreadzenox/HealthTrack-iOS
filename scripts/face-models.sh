#!/usr/bin/env bash
# Lecture du visage sur iPhone (I7) : les 3 modèles du Face Landmarker de MediaPipe (Apache-2.0), mêmes fichiers et
# mêmes empreintes SHA-256 que la build Android (lues dans upstream/app/android/app/face-models.gradle, préparé par
# scripts/upstream.sh), et TensorFlow Lite C (Apache-2.0) pour les faire tourner, comme LiteRT sur Android.
# Téléchargés puis vérifiés dans ios/HalcyaFaceModels/Vendor/ (ignoré par git) : jamais versionnés.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
GRADLE="$ROOT/upstream/app/android/app/face-models.gradle"
DEST="$ROOT/ios/HalcyaFaceModels/Vendor"
# TensorFlow Lite C 2.17.0, l'archive du pod CocoaPods TensorFlowLiteC (dernière publiée) ; empreinte relevée en CI le
# 28/10/2026 (run 40769499312), figée ici : une archive différente arrête le script
TFLITE_URL="https://dl.google.com/tflite-release/ios/prod/tensorflow/lite/release/ios/release/32/20240729-115310/TensorFlowLiteC/2.17.0/0c10b3543e01f547/TensorFlowLiteC-2.17.0.tar.gz"
TFLITE_SHA256="9667b476015f136e5b332ce040e12822c4ac6d5c58947882ddc809cdff0fb99e"

sha() { shasum -a 256 "$1" | cut -d' ' -f1; }
fetch() { curl -fsSL --retry 3 --retry-delay 2 -o "$2" "$1"; }

[ -f "$GRADLE" ] || { echo "face-models.sh : $GRADLE absent, lancer d'abord scripts/upstream.sh" >&2; exit 1; }
TASK_URL="$(sed -n "s/^def faceTaskUrl = '\(.*\)'$/\1/p" "$GRADLE")"
TASK_SHA="$(sed -n "s/^def faceTaskSha256 = '\([0-9a-f]*\)'$/\1/p" "$GRADLE")"
MODELS="$(sed -n "s/^ *'\(face_[a-z_]*\.tflite\)' *: *'\([0-9a-f]*\)',*$/\1 \2/p" "$GRADLE")"
[ -n "$TASK_URL" ] && [ -n "$TASK_SHA" ] && [ "$(echo "$MODELS" | wc -l | tr -d ' ')" = 3 ] \
  || { echo "face-models.sh : URL ou empreintes introuvables dans $GRADLE" >&2; exit 1; }

mkdir -p "$DEST/face"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

ok=1
while read -r name sum; do [ -f "$DEST/face/$name" ] && [ "$(sha "$DEST/face/$name")" = "$sum" ] || ok=0; done <<< "$MODELS"
if [ "$ok" = 0 ]; then
  fetch "$TASK_URL" "$TMP/face_landmarker.task"
  [ "$(sha "$TMP/face_landmarker.task")" = "$TASK_SHA" ] || { echo "face-models.sh : empreinte du .task inattendue" >&2; exit 1; }
  unzip -q -o "$TMP/face_landmarker.task" -d "$TMP/task"
  while read -r name sum; do
    [ "$(sha "$TMP/task/$name")" = "$sum" ] || { echo "face-models.sh : empreinte de $name inattendue" >&2; exit 1; }
    cp "$TMP/task/$name" "$DEST/face/$name"
  done <<< "$MODELS"
fi
echo "Modèles du visage : 3 fichiers vérifiés (empreintes d'Android)"

if [ ! -d "$DEST/TensorFlowLiteC.xcframework" ]; then
  fetch "$TFLITE_URL" "$TMP/tflite.tar.gz"
  got="$(sha "$TMP/tflite.tar.gz")"
  if [ "$got" != "$TFLITE_SHA256" ]; then
    echo "face-models.sh : empreinte de TensorFlow Lite C inattendue ($got)" >&2
    exit 1
  fi
  tar -xzf "$TMP/tflite.tar.gz" -C "$TMP"
  cp -R "$(find "$TMP" -type d -name TensorFlowLiteC.xcframework | head -1)" "$DEST/"
fi
echo "TensorFlow Lite C : $(ls "$DEST/TensorFlowLiteC.xcframework" | tr '\n' ' ')"
