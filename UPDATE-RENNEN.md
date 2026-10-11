# Einmaleins Rally · bessere Sicht und Rennfeedback

- Antwortzahlen stehen ab Aufgabenbeginn in einer deckenden, kontrastreichen Leiste unter der Aufgabe. Straßentore beginnen bei 58 statt 20 Prozent der Projektionstiefe; ihre Zahlen sind größer. Rang und kurze Rückmeldungen verdecken den Lesebereich nicht mehr.
- Je fünf richtige Antworten in Folge schleudern alle drei Rivalen 1,05 Sekunden mit 55 km/h und kurzer Erholung. Fehler setzen die Serie zurück. Pause friert den Effekt ein; am letzten Tor läuft die Animation vor der Wertung zu Ende.
- Große Platzanzeige mit separaten Meldungen bei gewonnenen und verlorenen Positionen. Ein Wechsel muss 0,45 Sekunden stabil sein, damit kurzfristige Rangwechsel die Anzeige nicht flackern lassen. Ruhige Effekte und reduzierte Bewegung werden respektiert.
- Richtige/falsche Antworten und dabei vergebene Schutzschilde bleiben stumm. Optionaler Motor, Nitro, Rennstart und Zielmelodie bleiben erhalten.
- Originale Canvas-Autos mit modellierten Lackreflexen, Spiegeln, Motorhaubenschlitzen, heller Windschutzscheibe, durchgehendem Rücklicht und Diffusor. Fahrzeugtypen, freigeschaltete Teile und Schleudereffekte bleiben erhalten.
- Lokale Highscore-Liste: nur abgeschlossene 25-Tor-Rennen, Punkte, richtige Antworten, Datum/Uhrzeit, Rechenart, Reihen, Renntyp und Zeitvorgabe. Top 20 werden angezeigt, bis zu 100 Ergebnisse gespeichert. Gleiche Punktzahl wird nach richtigen Antworten und anschließend Datum sortiert. Abbrüche werden nicht eingetragen. Keine Übertragung von Lernständen an einen Server.

## Gestaltungsrecherche

Microsoft empfiehlt gut lesbaren HUD-Text und deckende Hintergründe bei bewegtem Inhalt. Daraus folgen die getrennte Lesezone und größere Zahlen; die konkrete Anordnung ist eine eigene Gestaltungsentscheidung.

- https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/101
- https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/117
- https://developer.apple.com/design/human-interface-guidelines/game-controls

Porsches Beschreibung breiter Heckformen und eines durchgehenden Lichtbands sowie Ferraris Diffusor- und Rennlackierungsdetails dienen als allgemeine Formideen. Die Spielgrafik zeichnet eigene einfache Geometrie ohne Markenlogos oder übernommene Assets.

- https://newsroom.porsche.com/en/2024/products/porsche-new-911-world-premiere-hybrid-36322.html
- https://www.ferrari.com/en-GQ/corporate/articles/the-ferrari-488-pista-the-synthesis-of-extreme-track-level-power-and-driving-exhilaration-for-the-road

## Prüfung

`node test-release.cjs`: Fünfer-Serie, Reset bei Fehlern, Dreher aller Rivalen, Pause, Zieleinlauf, Speicherung, Ausschluss von Abbrüchen, Schutz vor doppelten Einträgen und beschädigter Speicher. Weitere Regressionen über `test-rivals.cjs`, `test-strategy.cjs`, `test-learning.cjs`.
