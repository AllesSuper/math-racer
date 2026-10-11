# Rally 2: Rechnen, fahren, sammeln

## Ziel und Erkenntnisse

Für einen Neunjährigen soll schneller Abruf des kleinen Einmaleins und seiner Umkehraufgaben im Mittelpunkt stehen. Die Fahrhandlung beantwortet die Aufgabe selbst. Es gibt während der 25 Tore keine Bestätigungsschaltflächen und keine Ergebnisdialoge, die die Fahrt unterbrechen.

Die Studie von Jay, Habgood, Mees und Howard-Jones (2019) untersuchte ein Rechenspiel mit 97 Kindern im Alter von 7–8 Jahren. Sie berichtet bessere Leistungen der Spielgruppe beim Abruf arithmetischer Fakten nach zwei Wochen. Das ist ein Hinweis auf die Eignung dieser Trainingsrichtung, keine Wirksamkeitsprüfung unserer Rally. Aufgabenwiederholung, der Zusammenhang von Multiplikation und Division sowie ein motivierender Rahmen passen dazu.

Die EEF-Zusammenfassung zu Feedback betont Informationen, die Lernenden beim nächsten Schritt helfen. Deshalb zeigen Fehler die vollständige Rechenfamilie; schwierige Aufgaben kommen wieder, anstatt die Runde sofort zu beenden. Genauigkeit wird vor Geschwindigkeit belohnt: jede richtige Antwort gibt mindestens 100 Punkte, schnelle richtige Antworten geben mehr. Beim Raten auf einer falschen Spur gibt es keine Rechenpunkte.

Die genaue Route, Bonusgrenzen und Fahrzeugteile sind eigene Designentscheidungen. Es gibt keine wissenschaftlich belegte optimale 25-Tor-Strecke. Der Aufbau vermeidet zusätzliche Hindernisse während der Rechentore und setzt die Fahrabwechslung in kurze Zwischenpassagen. Nach Erprobung mit dem Kind sollten Torzeit, Spuren und Bonusgrenzen bei Bedarf angepasst werden.

## Streckenbogen

| Tore | Abschnitt | Spuren | Atmosphäre |
| --- | --- | --- | --- |
| 1–5 | Stadt | 4 | Einstieg, Skyline und Straßenlaternen |
| 6–10 | Küste | 5 | Meer, Sand und wechselnde Kurven |
| 11–15 | Wald | 6 | Bäume, Baustellenpassagen |
| 16–20 | Bergtunnel | 7 | Bergsilhouette und Tunnelbogen |
| 21–25 | Neon-Finale | 5 | Nachtfarben und leuchtende Skyline |

Jede neue Runde verändert Kurvenphasen, Aufgaben, Antwortpositionen und Hindernisse. Die fünf Welten bleiben als erkennbare Orientierung erhalten. Das ist eine prozedurale Perspektivstrecke mit Kurven, kein physikalischer 3D-Fahrsimulator. Tore sind auf der Straße gezeichnet; eine zusätzliche HTML-Spurleiste hält Zahlen auch auf kleinen Displays lesbar.

## Punkte und Tempo

Die Torzeit beträgt wahlweise 5, 8 oder 12 Sekunden. In der entspannten Rally mindestens 12 Sekunden. Die Lernfahrt der ersten Version wurde durch eine entspannte automatische Fahrt ersetzt, damit auch dort keine Bestätigung nötig ist.

Der Frühbonus misst die ununterbrochene Zeit, in der das Auto vor dem Tor auf der richtigen Spur ausgerichtet ist. Ein Spurwechsel oder falsches Einordnen setzt diese Zeit zurück. Bei der Durchfahrt entscheidet die tatsächliche, weich interpolierte Autoposition über die Antwort. Das verhindert, dass ein letzter Tastendruck sofort als bereits vollzogener Spurwechsel gilt.

Punktefaktor = 1 + 2 × Anteil der richtig gehaltenen Torzeit + 0,25 × volle Dreiergruppen der bisherigen richtigen Serie; maximal ×5. Rechenpunkte = gerundet 100 × Faktor. Der gleiche Halteanteil beschleunigt das Auto sichtbar. Die Torzeit wird dadurch nicht verkürzt: schnellere Optik soll die verbleibende Rechenzeit nicht wegnehmen.

Die unmittelbare Beschleunigung gibt bereits vor dem Tor einen Hinweis auf die richtige Spur. Das ist ein bewusst gewählter Lernhinweis und entspricht der gewünschten direkten Belohnung; es ist kein unbeeinflusster Leistungstest.

## Features und Motivationskreislauf

- Drei richtige Antworten in Folge: Schutzschild gegen die nächste Kollision.
- Fünf Blitzantworten: Autowäsche mit Wasser-/Blasenanimation, Entfernung von Pfützenschmutz und 250 Bonuspunkten. Eine Blitzantwort benötigt mindestens 55 % korrekt gehaltene Torzeit.
- Sterne in kurzen Fahrpassagen: 50 Punkte beim Einsammeln.
- Baustellenkegel, Autos und Pfützen: leichter Tempoverlust; keine verlorenen Rechenpunkte und kein vorzeitiges Spielende. In der entspannten Rally entfallen sie.
- Ab 20/25 richtigen Antworten am Ziel: erfolgreiche Runde und ein neues Teil in den ersten vier erfolgreichen Runden.
- Teilefolge: Rennstreifen, Heckspoiler, Neon-Unterboden, Dachleuchte. Teile erscheinen am eigenen Auto und sind vor der nächsten Runde einzeln schaltbar.
- Zielübersicht: Rechenleistung, Blitzantworten, Punkte, Strecke und falsch beantwortete Aufgaben mit Lösungen.
- Lokaler Rekord und Garage: im selben Browser und Ursprung gespeichert. Keine Anmeldung und keine Käufe.

Die Belohnungen sind vorhersehbar und an Rechenleistung gebunden. Alle Kinder erreichen nach 25 Toren das Ziel; Autoteile erfordern zusätzlich ausreichend richtige Antworten. Eine Runde dauert je nach Einstellung ungefähr 3½ bis 6½ Minuten. Wiederholungsaufgaben zählen als Teil der 25 Tore, nicht als Zusatzrunde.

## Umsetzung und Prüfung

Animation mit requestAnimationFrame und zeitbasierten Schritten. Torfahrt, Zwischenpassage, Pause und Ziel sind getrennte Zustände. Aufgabenlogik und Bonusformel sind separat prüfbar. Speicherfehler werden abgefangen, damit privates Browsen das Spiel nicht verhindert.

`node test-rally.cjs` prüft 12.000 Aufgaben in allen Rechenarten mit 4–7 Spuren sowie vollständige erfolgreiche und vollständig fehlerhafte 25-Tor-Runden, Pause, Bonusreset und Garagenfreischaltung. Ein kleiner DOM-Ersatz führt dabei die reale Zustandslogik aus; das ersetzt keinen visuellen Browsertest. Die lokale HTTP-Vorschau lieferte 200. Die visuelle Browserprüfung wurde durch die Browser-Sicherheitsrichtlinie blockiert; Darstellung, Touchbedienung und Ton sind daher noch nicht im echten Browser verifiziert.

## Quellen, recherchiert am 9. Oktober 2026

- [Originalspiel: offizielle Mechanikbeschreibung](https://www.einmaleins.de/autobahn-einmaleins.html)
- [Jay et al.: Game-Based Training to Promote Arithmetic Fluency](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2019.00118/full)
- [EEF: Feedback](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/feedback)
- [MDN: requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
