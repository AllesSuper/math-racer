# Web-Version und iPad

Fertiges Uploadpaket: Einmaleins-Rally-Web.zip. Enthält ausschließlich die statischen Dateien aus dist, einschließlich index.html und aller Spielmodule. Keine Installation und kein Build auf dem Webserver nötig.

## Veröffentlichung

Es wurde noch keine öffentliche URL erstellt: In dieser Sitzung sind weder Sites-Veröffentlichungstools noch ein nutzbarer Hosting-Zugang verfügbar.

Ein möglicher Weg ist Netlify Drop (https://app.netlify.com/drop). ZIP entpacken und den Ordner, der index.html enthält, hochladen. Die offizielle Dokumentation beschreibt die Veröffentlichung per Drag-and-drop: https://docs.netlify.com/deploy/create-deploys/. Alternativ alle Inhalte von dist auf vorhandenen HTTPS-Webspace kopieren.

## iPad-Anpassungen

- Große Links-/Rechts-Tasten mit Pointer-Capture und kontrolliertem Wiederholen, zusätzlich Wischsteuerung und direkte Antwortspurwahl.
- Nitro, Schild und Joker als mindestens 44 Pixel hohe Touch-Bedienelemente.
- Während der Fahrt ausgeblendete Startaufstellung und Bildschirmhöhe mit Safari-sicherem Viewport und Safe-Area-Abständen.
- Retina-Zeichenfläche mit begrenzter Auflösung, um Arbeit und Speichernutzung zu begrenzen.
- Weniger Partikel im ruhigen Modus und Missionsanzeige nur bei tatsächlichen Änderungen neu aufgebaut.
- Keine Voraussetzung für Vibration, Controller oder Vollbild-API. Browserunterstützung der Vibration bleibt optional.
- Alle Spielmodule sind jetzt auch korrekt in die einzelne lokale HTML-Datei eingebettet.

Nach Veröffentlichung den HTTPS-Link in Safari öffnen. Optional über Teilen zum Home-Bildschirm hinzufügen. Spielstände bleiben pro Gerät und Ursprung; sie werden nicht vom Windows-Browser auf das iPad übertragen.

## Prüfung

Rechen-, Strategie- und Lernplanprüfungen bestehen. Die Tablet-Datei besteht die Syntaxprüfung. Eine echte Prüfung auf einem iPad und visuelle Browserprüfung sind noch offen; vollständige Gerätekompatibilität und Bildrate werden daher nicht zugesichert.
