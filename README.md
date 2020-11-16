<img src="https://verkaufen.trademax24.de/images/trademax24-header-image.jpeg" />
<br/>
<br/>

## tl;dr
Formular für den Ankauf von diversen Apple Geräten.
* direkter Upload von Bildern in Dropbox
* dynamisches Einladen von zum Ankauf verfügbar stehenden Apple Geräten
* Dynamisch wählbare Gerätespezifikationen nach Vorgabe durch Apple
* Admin-Dashboard:
    * Login/Logout für Admins
    * Auflistung aller Ankaufanfragen mit sämtlichen Informationen
    * Löschen von Ankaufanfragen
    * Hinzufügen, bearbeiten und löschen von zum Ankauf verfügbar stehenden Apple-Geräten inkl. verfügbaren Spezifikationen nach Vorgabe durch Apple

## Technologiestack
#### Node.js
<a href="https://nodejs.org/en/">Node.js</a> ist eine JavaScript-Laufzeitumgebung und bildet die Basis dieses Projekts. Mit Hilfe des Node.js Ökosystems lassen sich auch größere Anwendungen schnell & effizient umsetzen.

#### React.js
<a href="https://reactjs.org/">React.js</a> ist eine JavaScript-Bibliothek, welche auf Node.js aufbaut und zur Erstellung performanter User Interfaces auf Basis von Komponenten genutzt wird.

#### Next.js
<a href="https://vercel.com">Next.js</a> ist ein modernes React.js Framework, welches durch sog. Serverside Rendering unserer Anwendung einen zusätzlichen Performance-Boost verschafft. Weiterhin sind Serverless Functions direkt integrierbar, welches die Entwicklung eigener Schnittstellen um ein vielfaches erleichtert. Zusätzlich erlauben die Entwickler von Next.js das 100% kostenlose Hosting von Webapplikationen mit automatisch aktualisierendem SSL-Zertifikat.

#### MongoDB
<a href="https://www.mongodb.com/de">MongoDB</a> ist eine universelle, dokumentbasierte, verteilte, sowie dauerhaft kostenlose Datenbanklösung für die moderne Anwendungsentwicklung.

#### Dropbox
<a href="https://www.dropbox.com/developers/documentation/http/documentation">Dropbox</a> bietet eine eigene bidirektionale Schnittstelle, mit welcher Dateien oder gar ganze Ordner einem bestehenden Dropbox-Account hinzugefügt und entfernt werden können.

## Umsetzung
Das User Interface des Ankaufformulars wurde zum größten Teil mit dem React UI Framework Material UI erstellt. Durch die stark an Google angelehnte Designsprache von Material UI wird automatisch ein Gefühl des Vertrauens bei dem Nutzer erzeugt, dies ist auch wichtig, da zur Bearbeitung einer Ankaufanfrage zwingend persönliche Informationen des Nutzers benötigt werden. Selbstverständlich ist eine hohe Datensicherheit durch die Nutzung von MongoDB als Datenbank, als auch die Nutzung der Serverless Functions von Next.js in besonderer Form gegeben, Tracing von etwaigen Daten wird hierduch mit Sicherheit blockiert.
Die Kommunikation der Anwendung mit der Datenbank ist über dynamische API-Routen definiert.<br/>
<br/>
Das Admin-Dashboard ist mit Hilfe einer eigens implementierten Authentifizierung in Form eines Logins und Logouts vor unerwünschten Zugriffen geschützt. Im Admin-Dashboard werden alle Ankauffragen aus der Datenbank in einer übersichtlichen Tabelle aufgelistet und können hier im Detail eingesehen, sowie einzeln oder gruppenmäßig gelöscht werden.
<br/>
<br/>
Mit Hilfe einer Schnittstelle zu Dropbox können Kunden direkt aus dem Browser heraus Bilder ihres zu verkaufenden Geräts hochladen, hierzu wird die ID der Ankaufanfrage als Name für den in der Dropbox zu erzeugenden Ordner genutzt, damit Mitarbeiter von TradeMax24 eine Ankaufanfrage im Admin-Dashboard direkt den hochgeladenen Bildern des Kunden in der Dropbox zuordnen können.

## Projektdauer
Dieses Projekt wurde von der Konzeptionsphase bis hin zur Fertigstellung innerhalb von 3 Wochen durchgeführt.
<br/>
<br/>
<br/>
Sie sind an diesem Projekt interessiert oder haben Fragen? Dann kontaktieren Sie uns!
<br/>
&rarr; <a href="https://quikk.de">QUIKK Software & Webdesign UG</a>