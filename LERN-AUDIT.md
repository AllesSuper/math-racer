# Lern- und Technikprüfung · 9. Oktober 2026

Die bestehende Rally wurde lokal erweitert; GitHub bleibt zurückgestellt.

## Recherche und Entscheidung

Der [IES-Leitfaden für Mathematik in der Grundschule](https://ies.ed.gov/ncee/wwc/PracticeGuide/26) empfiehlt systematische Anleitung, verständliche mathematische Sprache, Darstellungen und Zeitübungen zum Aufbau von Rechenflüssigkeit. Der [EEF-Leitfaden](https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/maths-ks-2-3) behandelt mathematisches Verständnis und typische Lernschwierigkeiten. Diese Empfehlungen betreffen Unterricht und Intervention; sie belegen keine Wirksamkeit unseres Spiels. Unsere Umsetzung ist eine daraus abgeleitete Designentscheidung.

Für die Rally hat Rechnen Vorrang vor zusätzlichen Ablenkungen. Neue Funktionen:

- Einmal je Aufgabe kann H oder der Rechentipp-Knopf drei Sekunden zusätzliche Zeit geben. Hinweise nutzen Zerlegung, Verdopplung, Gruppen oder die Umkehrung einer Division. Sie erklären einen Rechenweg.
- Falsche Antwortmöglichkeiten enthalten häufiger Nachbarergebnisse und Verwechslungen statt beliebiger Zahlen. Sie sind eindeutig und enthalten genau einmal die richtige Antwort.
- Der Lernbericht zeigt Multiplikation und Division getrennt, die Trefferquote und die Anzahl genutzter Tipps. Unter 70 Prozent wird die entspannte Rally empfohlen. Diese Schwelle ist eine Produktentscheidung, keine diagnostische Norm.
- Bei fälligen Wiederholungen erhält die älteste Fehleraufgabe Vorrang. Ungültige numerische Speicherwerte werden bereinigt.

## Testbefund

Alle Tests bestanden: test.cjs, test-adventure.cjs, test-rivals.cjs, test-strategy.cjs, test-learning.cjs, test-full.cjs und test-audit.cjs.

Geprüft wurden 15.000 grundlegende Rechenaufgaben; jeweils 12.000 Antwortsets mit vier bis sieben Spuren in den Regressionstests; zusätzlich 6.000 Antwortsets mit den neuen Ablenkantworten. Die wiederholten Regressionstests überschneiden sich und sind keine entsprechend große Anzahl verschiedener Fakten.

Die vollständige Integration lädt alle elf Skripte in der Reihenfolge der Webseite. Sie prüft vollständige 25-Tor-Runden mit richtigen und falschen Antworten, Pause, Garage, Lernbericht, einmalige Tippnutzung und die Begrenzung der Retina-Auflösung. Weitere Prüfungen decken Rivalen, Schleudern, Podium, Nitro-Sperre während Rechenaufgaben, Joker, Schild, Magnet, adaptive Zeit, gehaltene Lenktasten, Aufgabenpool über acht Rennen, Fehlerabstand, kleine Pools, ungültige Speicherwerte und JavaScript-Syntax ab.

Die eigenständige HTML-Datei sowie das Web-ZIP wurden neu erzeugt.

## Grenzen und sinnvolle nächste Schritte

Die Tests nutzen eine simulierte DOM-/Canvas-Umgebung. Sie bestätigen keine reale Bildrate, visuelle Anordnung oder tatsächliche Ton-/Vibrationsausgabe. Die Browserprüfung war durch die Sicherheitsrichtlinie blockiert; ein physisches iPad wurde nicht geprüft. Lernfortschritt ist hier eine Trefferstatistik, keine pädagogische Diagnose. Richtige Aufgaben bleiben wie gewünscht bis zum Poolabschluss ausgespart, auch wenn Hilfen verwendet wurden.

Als nächste Lernfunktion wäre eine freiwillige Werkstatt mit Punktfeldern für Fehleraufgaben sinnvoll: erst verstehen, anschließend in der Rally abrufen. Ein späterer Wiederholungsmodus für bereits beherrschte Aufgaben könnte langfristiges Behalten prüfen; er müsste ausdrücklich wählbar sein, weil der jetzige Trainingsplan richtige Aufgaben bewusst ausspart. Zunächst sollte eine kurze echte iPad-Spielrunde zeigen, ob Aufgaben und Tipps gut lesbar bleiben und die Bedienung angenehm ist.
