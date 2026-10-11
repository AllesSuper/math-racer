# Veröffentlichung auf GitHub Pages

Die Veröffentlichung ist vorbereitet, aber noch nicht erfolgt. Ziel-Repository und GitHub-Zugang fehlen in dieser Sitzung.

Der Workflow .github/workflows/pages.yml prüft die Spiellogik und veröffentlicht ausschließlich dist. Er startet bei Änderungen auf main oder manuell. Im Ziel-Repository unter Settings → Pages die Quelle GitHub Actions auswählen. Bei erfolgreicher Veröffentlichung gibt der Workflow die tatsächliche URL aus. Bei vorhandenen fremden Repository-Inhalten muss der Workflow vor dem Einspielen auf Konflikte geprüft werden.

Alle Assets verwenden relative Pfade und unterstützen eine Pages-Unteradresse. Lernstände bleiben im Safari-Browser des iPads gespeichert; vorhandene PC-Spielstände werden nicht synchronisiert.

## Dezenter Ton

Ton ist standardmäßig aus und wird mit dem Tonschalter aktiviert. Web Audio startet erst durch eine Bedienung, entsprechend den Safari-Autoplay-Bedingungen. Die Grundlautstärke ist 35 Prozent. Leiser Motor, kurze richtige/falsche Antwortsignale, Nitro, Schild und eine Zielmelodie sind synthetisch erzeugt. Keine Musikdateien und keine zusätzlichen Downloads nötig. Der Tonschalter bleibt während der Fahrt erreichbar.

Referenzen:
https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices

Logiktests und Syntaxprüfung bestehen. Echter Safari-Soundtest sowie Online-Veröffentlichung sind noch offen.
