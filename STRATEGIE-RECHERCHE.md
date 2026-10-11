# Strategische Hilfen und Haptik

Recherche am 9. Oktober 2026. Die Bonusregeln sind eigene Spielentscheidungen, keine wissenschaftlich geprüften optimalen Parameter.

| Ressource | Vorteil | Entscheidung und Grenze |
| --- | --- | --- |
| Nitro | Kurz mehr Tempo und damit Rennvorsprung | Richtige Antworten laden den Tank. Nur in freien Passagen zünden; Rechenzeit bleibt erhalten. Nach einem Dreher erst die Erholung abwarten. |
| Schild | Kollision abfangen oder Rechen-Dreher verkürzen | Drei richtige Antworten verdienen einen Schild. Passiv gegen Kollision; mit E verbrauchen und sechs Sekunden gegen einen Rechen-Dreher aktivieren. Schutz ergibt 0,5 statt 1,6 Sekunden Drehen und etwa 65 statt 32 km/h. Eine falsche Antwort bleibt falsch und gibt keine Rechenpunkte. |
| Joker | Weniger Antworttore | Höchstens ein Pickup pro Runde an einer zufälligen Stelle zwischen Tor 6 und 19, nicht garantiert eingesammelt. J entfernt nur falsche Optionen und lässt mindestens drei stehen. Für eine schwierige Aufgabe sparen. |
| Magnet | Sterne einsammeln und kleiner Lenkhinweis | Ein bereits aktiver Magnet wirkt auch während einer Aufgabe. Die seitliche Hilfe bleibt unter einer halben Spur, ändert die ausgewählte Spur nicht und zeigt keine Lösungszahl. Die Richtung ist trotzdem ein Hinweis; das ist unterstütztes Lernen, kein unabhängiger Leistungstest. |
| Richtige Serie | Schild und steigender Punktefaktor | Präzision vor Geschwindigkeit; Fehlerfeedback und Wiederholung bleiben erhalten. |

Vibration ist opt-in: kurze Pulse bei Bonus, Schild und Schleudern. Controller werden zuerst über `GamepadHapticActuator.playEffect('dual-rumble', ...)` angesprochen. Ohne passenden Controller wird `navigator.vibrate()` versucht. Fehlende Unterstützung oder abgewiesene Hardwareaufrufe werden abgefangen. Keine dauernde Vibration während des Rechnens. Eine echte Geräteprüfung ist noch offen.

## Recherchebasis

- [MDN Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API): geringe Verfügbarkeit, Hardwareabhängigkeit, kurze Pulsmuster.
- [MDN Navigator.vibrate](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate): Browserbedingungen und Verhalten ohne Unterstützung.
- [MDN GamepadHapticActuator.playEffect](https://developer.mozilla.org/en-US/docs/Web/API/GamepadHapticActuator/playEffect): Intensität, Dauer, Promise und mögliche Ablehnungen.
- [Interactive Apps Promote Learning of Basic Mathematics, 2018](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2018.00262/full): gestufte Unterstützung, Wiederholung und Feedback in einer anderen Zielgruppe; keine Wirksamkeitsbehauptung für unsere Rally.
- [EEF Feedback](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/feedback): Hilfen sollen den nächsten Lernschritt unterstützen.
- [Game-Based Training to Promote Arithmetic Fluency, 2019](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2019.00118/full): Rechenhandlung als Teil der Spielmechanik.

Die praktische Strategie lautet: bei leichten Aufgaben Ressourcen verdienen, bei schwierigen Aufgaben Joker oder Schild einsetzen und auf freien Passagen mit Nitro einen Rückstand verkürzen. Weitere mögliche spätere Strategien wären ein Zeit-Pickup oder eine Auswahl zwischen Tank- und Schildstation. Sie sind hier noch nicht eingebaut.
