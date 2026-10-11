# Erweiterung 3: Abenteuer und Fahrgefühl

## Recherche und Entscheidungen

Die ursprüngliche Zielgruppe ist ein neunjähriger Junge mit Interesse an Autos und Action. Die Gestaltung greift Fahrzeuge, Stunts, Technik und Sammelziele auf. Welche Themen ihn tatsächlich motivieren, sollte beim Spielen beobachtet werden; aus dem Geschlecht allein folgt keine verlässliche Spielepräferenz.

| Quelle | Aussage und Grenze | Konsequenz im Spiel |
| --- | --- | --- |
| [Jay et al. 2019, Game-Based Training to Promote Arithmetic Fluency](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2019.00118/full) | Studie mit 97 Kindern im Alter von 7–8 Jahren zum Abruf von Rechenwissen. Die Aufgaben waren Teil der Spielmechanik. Keine Evaluation unserer Rally. | Antwortwahl bleibt die zentrale Fahrhandlung, neue Boni entstehen aus richtigem Rechnen. |
| [2021, Extrinsically Integrated Instructional Quizzes in Learning Games](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2021.678380/full) | Untersucht Lernspiele und Quiz-Unterbrechungen bei älteren Grundschulkindern; Diskussion zeigt, dass Integration, Motivation und Ablenkung differenziert betrachtet werden müssen. Keine direkte Aussage über neun Jahre alte Rennspielnutzer. | Keine zusätzlichen Pflicht-Minispiele während der Aufgaben, kein Quizdialog zwischen Fahrphasen. |
| [2022, To Quiz or to Shoot When Practicing Grammar?](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.856623/full) | Feldstudie zu Grammatikspielen, Interesse und Lernhandlung. Fach und Spiel sind anders; die Gestaltungsidee wird übertragen, nicht die Ergebnisse. | Effekte optional, Action kurz halten und den Rechenprozess nicht verdecken. |
| [EEF, worked examples and mathematical problem solving](https://educationendowmentfoundation.org.uk/news/voices-from-the-classroom-using-worked-examples-to-support-pupils-mathematical-problem-solving) | Beispiele verbinden Problem und Lösung und können kognitive Belastung reduzieren. Keine optimale Sekundenanzahl für Antworttore. | Rechenfamilien nach Fehlern bleiben sichtbar; optional zwei weitere Sekunden für das nächste Tor. |
| [MDN, Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) | Dokumentiert Pointer-Eingaben und Pointer-Capture für Maus/Touch/Stift. | Sofortige Drag-Steuerung, Pointer-Abbruch wird behandelt, Wischen bleibt möglich. |
| [MDN, Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API) | Browserzugriff auf Controller; Unterstützung und Sicherheitsbedingungen variieren. | Optionaler Stick/Steuerkreuz mit Totzone und Wiederholungsintervall. Tastatur funktioniert unabhängig davon. |
| [MDN, requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) | Bildwiederholungsabhängige Animationsaufrufe erfordern zeitbasierte Änderungen. | Animation und gehaltene Tasten verwenden verstrichene Zeit statt Browser-Tastenwiederholung. |

Recherche am 9. Oktober 2026. Die Quelle von 2022 war als Suchauszug verfügbar; der erneute Seitenabruf schlug mit einem Timeout fehl. Entscheidungen zur Rally bleiben eigene Designhypothesen.

## Eingebaute Elemente

1. **Fahrzeugwahl:** Sportwagen, größerer Offroader und Rettungsfahrzeug mit Dachbeleuchtung. Unterschiedliche Optik, identische Rechenbedingungen. Bereits verdiente Teile bleiben kompatibel.
2. **Nitro:** jede richtige Antwort lädt 18 Prozentpunkte. SHIFT oder Nitro-Knopf verbrauchen 30 Punkte für 1,8 Sekunden Beschleunigung. Nur in freien Passagen aktivierbar; beim Beginn des nächsten Rechentors deaktiviert. Die Torzeit wird nie durch Nitro verkürzt.
3. **Sprungrampen:** optional durchfahren, automatisch kurzer Sprung und 75 Punkte. Der Wagen landet vor der nächsten Aufgabe; kein komplizierter Sprungknopf erforderlich.
4. **Sternenmagnet:** M-Pickup zieht Sterne für zwölf Sekunden auch von anderen Spuren ein. Während Rechentoren läuft kein neuer Hindernisverkehr.
5. **Nitrotank:** N-Pickup lädt 30 Prozentpunkte. Alle Pickups liegen in freien Passagen und verlangen keine Klicks.
6. **Missionen:** Rechenmeister (20 richtige Antworten), Blitzpilot (8 Blitzantworten) und eine wechselnde Zusatzmission: sechs richtig in Folge, drei Sterne oder zwei Rampensprünge. Erfüllte Missionen geben am Ziel jeweils 150 Punkte.
7. **Rally-Pass:** erfolgreiche Missionsabzeichen werden lokal gespeichert. Keine Käufe, keine Zufallsbeutekisten und keine täglichen Anwesenheitspflichten.
8. **Fahrgefühl:** sanfter Spurwechsel, Kurvenneigung, dezente Federung, Lackglanz und Karosseriedetails. Gehaltene Lenktasten wechseln Spuren nach einem kontrollierten Intervall; die native Browser-Autowiederholung wird ignoriert.
9. **Umgebung:** Asphaltkörnung, reflektierende Straßenmarker, feuchte Küsten-/Nachtstrecke, dezenter Küstenregen, Streckenbanner und Küstenwache-Hubschrauber. Das Wetter liegt hinter den HTML-Aufgabenanzeigen.
10. **Komfort:** ruhige Effekte und zusätzliche Zeit nach Fehlern. Ruhige Effekte schalten Regen, Hubschrauberanimation und Karosserieneigung/Federung ab. Die grundlegende Fahrt bleibt animiert.
11. **Ton:** zuschaltbarer synthetischer Motor mit Tempoabhängigkeit und kurze Bonusklänge. Ton startet nur nach Bedienung des Tonschalters und wird bei Pause/Ende gedämpft.
12. **Controller:** linker Stick oder Steuerkreuz steuern, A aktiviert Nitro. Erfordert Unterstützung durch Browser und Gerät, ist keine Voraussetzung zum Spielen.

## Realismus und Grenzen

Die Darstellung ist eine prozedurale Canvas-Perspektivgrafik mit einem stilisierten Fahrzeug. Licht, Materialdetails, Kurvenneigung und Federung verbessern das Fahrgefühl. Dies ist keine fotorealistische 3D-Simulation und kein physikalisch berechnetes Fahrzeugmodell. Die Aufgabe bleibt in einem ruhigen HTML-Feld, die Zahlen sind zusätzlich als große Spurleiste verfügbar. Ungewollte Kameraverwacklung, hektische Lichtblitze und Physikdrift wurden bewusst nicht eingebaut: präzise Spurwahl und Rechnen sollen zuverlässig bleiben.

## Verifikation

`node test-rally.cjs` prüft die reale Spiellogik einschließlich Erweiterung in einem DOM-/Canvas-Ersatz. `node test-adventure.cjs` ergänzt Prüfungen für Nitro-Sperre während Aufgaben, Rampen, Magnet, adaptive Torzeit, Pause, gehaltene Tasten sowie alle Fahrzeug-/Umgebungsdarstellungen. Diese Tests belegen Zustandsverhalten und API-Aufrufe, ersetzen aber keine Sichtprüfung, keine Controller-Hardwareprüfung und keine Tonprüfung. Die frühere Browser-Sicherheitsblockade bleibt bestehen; sie wurde nicht umgangen.

## Ideen für eine spätere Erprobung

Eine nachvollziehbare nächste Erweiterung wäre eine eigene Bestfahrt als Geistwagen. Dafür müssten Aufgabenfolge und Zeitmaß vergleichbar bleiben, damit ein Ghost nicht nur zufällig einfachere Aufgaben belohnt. Weitere mögliche Themen sind eine Rettungsmission mit Rechenbrücken oder eine aus Fahrzeugteilen zusammengestellte Zielgarage. Diese Ideen sind noch nicht implementiert. Zunächst sollte beobachtet werden, ob das Kind die Tore zuverlässig lesen kann und das Lenken nicht mehr Aufmerksamkeit benötigt als die Aufgabe.
