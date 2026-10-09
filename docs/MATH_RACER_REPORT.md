# Math Racer: Umsetzung und Prüfung

Ausgangsbasis: `AllesSuper/math-treasure-quest`, Commit
`e723ef3acdf07086eab56602e855d7a501ffb8f6`.
Die Git-Historie und die MIT-Lizenz einschließlich ursprünglicher Urheberangabe
bleiben erhalten. Am Originalrepository wurden keine Änderungen vorgenommen.

## Umfang

Vollständiges Duplikat unter dem Projekttitel **Math Racer**, mit bestehender
Abenteuerkarte und Schatzmechanik. Eigenständige Rennmechaniken sind nicht Teil
dieser Übernahme. Beibehalten: 16 Sprachen, adaptive Lernstände, Schwierigkeitswahl,
gemischte und einzelne Rechenarten, Zahlentastatur und Antwortauswahl, Hinweise,
Lösungserklärungen, Rückschritte, Schutzschild, Joker, 50:50, Zusatzzeit, Shop,
Begleiter, Sterne, Münzen, Abzeichen, Tagesschätze und Sammlung, Ton, Pausieren,
mobile Darstellung und Offlinebetrieb.

## Lernregeln

| Rechenart      | Grenzen                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| Addition       | 2 oder 3 nichtnegative ganze Operanden; Summe höchstens 100                                            |
| Subtraktion    | Ausgangszahl höchstens 100; Ergebnis nichtnegativ                                                      |
| Multiplikation | Beide Faktoren 2–10; alle 81 Paare ab der ersten Aufgabe                                               |
| Division       | Dividend höchstens 100; Divisor 2–10; ganzzahliges Ergebnis 1–10; alle 90 Fakten ab der ersten Aufgabe |

Normale Runden: 25 Stationen. Die bestehende optionale Kurzrunde hat 10 Stationen.
Timer und Blitz bleiben optional und sind bei einer neuen Installation aus.
Aufgabenabhängige Grundzeit: Multiplikation 6–20 Sekunden, Division 10–30 Sekunden,
Addition/Subtraktion 12–40 Sekunden. Gekaufte Zusatzzeit kann diese Grundzeit erhöhen.

## PWA und Schutz des Originals

Repository- und Pages-Links zeigen auf `AllesSuper/math-racer` beziehungsweise
`https://allessuper.github.io/math-racer/`. Manifest, Seitentitel und iOS-App-Titel
lauten Math Racer. Relative Asset-URLs und der Service Worker funktionieren unter
dem Repository-Unterpfad. Math Racer nutzt `mr_` für lokale Daten und
`math-racer-` für Caches; es löscht nur eigene veraltete Caches und behandelt nur
Requests innerhalb seines eigenen Scopes. Spielstände des Originals werden nicht
automatisch übernommen. Bestehende Bilder, App-Icons und historische Berichte
bleiben Teil der vollständigen Ausgangsbasis.

## Lokale Prüfung am 9. Oktober 2026

- JavaScript-Syntax und JSON: bestanden.
- Mathematiktests: 364.146 Prüfungen bestanden.
- Lernregeln, Grenzen, Aufgabenabdeckung und Timer: 2.647.556 Prüfungen bestanden,
  einschließlich 264.000 reproduzierbar generierter Aufgaben.
- Offline-Tests: Installation, Cachewechsel, Schutz fremder Caches und Requests,
  Offline-Navigation bestanden.
- Browser: 192 Prüfungen mit Microsoft Edge 154.0.4258.62 bestanden, einschließlich
  25-/10-Stationen-Runden, Timer, Shop, Lernstände, Belohnungen, Pause, Timeout,
  Offlinebetrieb, mobile Darstellung, Projekttitel und `/math-racer/`-Scope.

Die GitHub-Actions-Workflows prüfen die Software und veröffentlichen die statische
Seite über GitHub Pages. Der tatsächliche Deployment-Status wird separat geprüft.
