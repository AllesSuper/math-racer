# Einmaleins Rally · Version 2

Öffne `dist/index.html` im Browser und lade eine schon offene Seite mit Strg+F5 neu. Alternativ `Einmaleins-Rally.html` per Doppelklick starten; diese einzelne Datei enthält die vollständige aktuelle Version.

## Neu

25 automatisch gewertete Antworttore, eine durchgehende Fahrt, fünf Welten mit 4–7 Spuren, Kurven, Frühbonus für Tempo und Punkte, Autowäsche, Schutzschild, Fahrhindernisse, Sammelsterne und vier freischaltbare sichtbare Autoteile. Multiplikation, Division und gemischte Aufgaben bleiben erhalten. Fehler werden während der Fahrt erklärt und wiederholt.

Während der Runde nur mit Pfeiltasten, A/D oder 1–7 lenken. Touch: wischen oder eine Spur antippen. Keine Antwortbestätigung nötig. Leertaste pausiert. Die Garage wird nach 25 Toren angezeigt. Ab 20 richtigen Antworten gilt die Runde als erfolgreich und schaltet in den ersten vier erfolgreichen Runden jeweils ein Teil frei.

Rekord und Garage werden im selben Browser gespeichert. Zwischen Dateiversion und HTTP-Version können Speicherstände getrennt sein. Optionale Google-Schriften benötigen Internet; Ersatzschriften funktionieren offline.

## Konzept und Recherche

Siehe `RECHERCHE-UND-SPIELKONZEPT.md` für Quellen, Streckenplanung, Bonusformel, Motivation und Grenzen.

## Entwicklung

- `node server.cjs`: lokale Vorschau auf http://127.0.0.1:4173/
- `node test-rally.cjs`: 12.000 Aufgaben mit 4–7 Spuren und vollständige 25-Tor-Zustandsprüfungen.
- `node test.cjs`: weitere 15.000 Rechenaufgaben.
- `node --check dist/app.js`: Syntaxprüfung.
- `node package.cjs`: eigenständige HTML-Datei nach Änderungen neu erzeugen.

Die HTTP-Vorschau antwortete erfolgreich mit 200. Die visuelle Browserprüfung wurde von der Browser-Sicherheitsrichtlinie blockiert und blieb offen. Die Zustandsprüfungen verwenden einen DOM-Ersatz, keinen echten Browser. Keine Veröffentlichung durchgeführt.

## Version 3 · Abenteuer

Zusätzlich: drei Fahrzeugtypen, Nitro (SHIFT, nur zwischen Rechentoren), Rampensprünge, Sternenmagnet, Nitrotanks, Missionsziele und gespeicherte Abzeichen. Gehaltene Lenktasten und unmittelbares Touch-Dragging; optionaler Controller. Die Darstellung erhält Lackglanz, Karosserieneigung, Federung, Straßenstruktur, Reflektoren und Küstenwetter. Komfortoptionen: ruhigere Effekte und zwei Zusatzsekunden nach Fehlern.

`dist/adventure.js` ergänzt die bestehende Spiellogik. `node test-adventure.cjs` prüft die neuen Interaktionen. Recherche, Entscheidungen und Grenzen stehen in `RECHERCHE-V3.md`. Controller, Touch, Ton und Optik sind nicht mit echter Browser-/Gerätehardware verifiziert.

## Geisterrennen

Drei halbtransparente, simulierte Rivalen konkurrieren bei denselben 25 Aufgaben. Live-Platzierung und Podium am Ziel. Richtige Antworten zählen mehr als reines Tempo: pro richtigem Tor 1 Rennpunkt plus bis zu 0,5 Zeitbonus. Sterne und Missionen ändern die Rennplatzierung nicht direkt. Der Tempovorsprung zählt zusätzlich zur Rennwertung; dadurch wirken Nitro und Dreher auf den Rückstand. Geisterautos sind kollisionsfrei und ihre grafischen Spuren verraten keine Lösung. `node test-rivals.cjs` prüft Siegerlogik, Zeitbonus, Podium, vollständige Runden und Abbruch.


### Schleudern bei Rechenfehlern

Alle vier Fahrer haben eigene Geschwindigkeit, Dreherzeit und Erholung. Eine falsche Antwort löst 1,6 Sekunden Schleudern mit zwei sichtbaren Drehungen aus, das Tempo fällt auf etwa 32 km/h und erholt sich anschließend. Die anderen Fahrzeuge werden nicht künstlich beschleunigt: Sie fahren weiter und ziehen relativ vorbei. Der Tempounterschied wird laufend in den Vorsprung eingerechnet. Gegnerfehler treten bei ihrer simulierten Antwortzeit auf; Spielerfehler bei der Tordurchfahrt. Bei einem Fehler am letzten Tor läuft die Dreheranimation vor der Podiumsauswertung zu Ende. Pausieren friert auch die Dreher ein. Die Rechenanzeige selbst dreht sich nicht.

Tests: `node test-rivals.cjs` prüft Dreher, Geschwindigkeit, Rückstand, Erholung, Pause und Zielauswertung. Die tatsächliche visuelle Darstellung bleibt ohne Browser-Sichtprüfung.
