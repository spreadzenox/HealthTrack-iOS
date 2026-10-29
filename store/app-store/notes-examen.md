# Notes pour l'examen d'Apple (App Review Information → Notes)

Texte à coller par le propriétaire dans App Store Connect au moment de la soumission (A6), en anglais, la langue
des équipes d'examen (4 000 caractères au plus ; celui-ci en fait environ 2 500). À relire juste avant : chaque
phrase doit rester vraie pour la version envoyée. Le paragraphe « Backup copy » dépend de la décision sur la
directive 5.1.3 (ii) (`journal/BACKLOG.md`, I9) ; le paragraphe « Purchases » change avec I6 ; les deux adresses de la fin attendent A8 (GitHub Pages).

---

Halcya is a personal gut-and-wellbeing journal for adults (18+). It is not a medical device: it shows trends in the
user's own data and never gives a diagnosis.

No account, no sign-in: all features can be reviewed right after the first launch. To see charts with data, add a
few meals and gut notes, or allow Apple Health access on the "Sources" tab.

Data stays on the device (local database). Nothing leaves the phone except:
- AI meal analysis, only when the user taps "Analyser" and after a one-time consent screen: the photo (resized,
  metadata removed) or the typed description is sent to our relay (Google Cloud, EU), analysed by Gemini on Vertex
  AI and not stored; the app sends a random install identifier used only to count analyses. There is no API key in
  the app.
- Weather: an approximate location (about 10 km, reduced-accuracy location permission) or a chosen city is sent to
  Open-Meteo.

Apple Health (HealthKit): read-only. Halcya reads steps, distance, active energy, workouts, sleep, heart rate,
resting heart rate, HRV, blood oxygen, respiratory rate, body temperature, blood pressure, blood glucose, weight
and body fat, only to show them and compare them with the user's own notes on the device. HealthKit data is never
sent to any server, never used for advertising, never shared.

Camera: meal photos, and an optional on-device wellbeing estimate from the user's facial expression when the app
is opened (off by default, explained before activation, visible indicator during each reading). No image is
stored or sent; only a few numbers are kept. It is presented as an estimate, not a diagnosis.

Bluetooth: optional connection to standard Bluetooth Low Energy sensors (heart-rate strap, blood-pressure monitor,
scale, thermometer, pulse oximeter) to record their measurements on the device.

Notifications: optional local reminders (evening note, gut check, portion reminder during a FODMAP
reintroduction), answerable from the notification.

Backup copy: the app keeps a copy of the user's entries in its Documents folder (visible in Files) so that data is
not lost if the system clears the web database; it is included in the device's iCloud backup like other app files.

Purchases: this version has no in-app purchase; all features are free.

Privacy policy: https://spreadzenox.github.io/HealthTrack-iOS/confidentialite/
Support: https://spreadzenox.github.io/HealthTrack-iOS/assistance/
