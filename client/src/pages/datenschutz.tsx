import { useEffect } from "react";
import { Shield, Eye, Database, Lock, Mail, Phone } from "lucide-react";
import { Header } from "../components/Header";
import { SEOHead } from "../components/seo/SEOHead";

export default function Datenschutz() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Datenschutzerklärung | Grema Gebäudeservice GmbH - Moers"
        description="Datenschutzerklärung der Grema Gebäudeservice GmbH. Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO."
        keywords="Datenschutz, DSGVO, Datenschutzerklärung, Grema Gebäudeservice, Moers, Privatsphäre"
        canonicalUrl="/datenschutz"
        ogType="website"
      />
      
      {/* Header */}
      <Header currentPage="" />

      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              <span>Datenschutz & Privatsphäre</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Datenschutzerklärung
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß Art. 13 DSGVO
            </p>
          </div>
        </div>
      </section>

      {/* Datenschutz Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="space-y-12">

            {/* Verantwortlicher */}
            <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Verantwortlicher</h2>
              </div>
              
              <div className="space-y-3 text-gray-700">
                <p className="text-xl font-semibold text-gray-900">Grema Gebäudeservice GmbH</p>
                <div className="space-y-1">
                  <p>Neuer Wall 2-4</p>
                  <p>47441 Moers</p>
                  <p>Deutschland</p>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>Telefon: <a href="tel:01763444639" className="text-primary hover:underline">0176/3444 6399</a></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>E-Mail: <a href="mailto:info@grema-service.de" className="text-primary hover:underline">info@grema-service.de</a></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grundsätze */}
            <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Grundsätze der Datenverarbeitung</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
                <p>Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten erhoben werden, erfolgt dies stets auf freiwilliger Basis und mit Ihrer ausdrücklichen Einwilligung.</p>
              </div>
            </div>

            {/* Datenerhebung Kontaktformular */}
            <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Kontaktformular & Anfragen</h2>
              </div>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Welche Daten werden erhoben?</h3>
                  <ul className="space-y-1 ml-4">
                    <li>• Name und Vorname</li>
                    <li>• E-Mail-Adresse</li>
                    <li>• Telefonnummer (optional)</li>
                    <li>• Gewählter Service</li>
                    <li>• Ihre Nachricht</li>
                    <li>• Zeitpunkt der Anfrage</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Rechtsgrundlage</h3>
                  <p>Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO zur Erfüllung vorvertraglicher Maßnahmen und zur Bearbeitung Ihrer Anfrage.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Zweck der Verarbeitung</h3>
                  <p>Ihre Daten verwenden wir ausschließlich zur Bearbeitung Ihrer Anfrage und zur Kontaktaufnahme bezüglich unserer Reinigungsdienstleistungen.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Speicherdauer</h3>
                  <p>Ihre Kontaktdaten werden für 3 Jahre gespeichert und anschließend gelöscht, sofern keine vertragliche Beziehung entsteht.</p>
                </div>
              </div>
            </div>

            {/* Website-Nutzung */}
            <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Website-Nutzung & Server-Logs</h2>
              </div>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Automatisch erhobene Daten</h3>
                  <p>Bei jedem Zugriff auf unsere Website werden automatisch folgende Informationen in Server-Logfiles gespeichert:</p>
                  <ul className="space-y-1 ml-4 mt-2">
                    <li>• IP-Adresse des zugreifenden Rechners</li>
                    <li>• Datum und Uhrzeit des Zugriffs</li>
                    <li>• Name und URL der abgerufenen Datei</li>
                    <li>• Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
                    <li>• Verwendeter Browser und Betriebssystem</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Rechtsgrundlage</h3>
                  <p>Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO aufgrund unseres berechtigten Interesses am ordnungsgemäßen Betrieb der Website.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Speicherdauer</h3>
                  <p>Diese Daten werden nach 7 Tagen automatisch gelöscht.</p>
                </div>
              </div>
            </div>

            {/* Ihre Rechte */}
            <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Ihre Rechte</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Recht auf Auskunft</strong> (Art. 15 DSGVO)</li>
                  <li>• <strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO)</li>
                  <li>• <strong>Recht auf Löschung</strong> (Art. 17 DSGVO)</li>
                  <li>• <strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
                  <li>• <strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
                  <li>• <strong>Recht auf Widerspruch</strong> (Art. 21 DSGVO)</li>
                </ul>
                <p className="mt-4">Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: <a href="mailto:info@grema-service.de" className="text-primary hover:underline">info@grema-service.de</a></p>
              </div>
            </div>

            {/* Datensicherheit */}
            <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Datensicherheit</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>Wir verwenden angemessene technische und organisatorische Sicherheitsmaßnahmen, um Ihre Daten gegen zufällige oder vorsätzliche Manipulationen, Verlust, Zerstörung oder gegen den Zugriff unberechtigter Personen zu schützen.</p>
                <p>Unsere Sicherheitsverfahren werden regelmäßig überprüft und dem technologischen Fortschritt angepasst.</p>
              </div>
            </div>

            {/* Änderungen */}
            <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Änderungen der Datenschutzerklärung</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen umzusetzen.</p>
                <p>Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.</p>
                <div className="pt-6 border-t border-gray-200 mt-8">
                  <p className="text-sm text-gray-500">Stand: August 2025</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-primary flex items-center justify-center rounded">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="text-white">
                <div className="font-bold text-lg">Grema Gebäudeservice GmbH</div>
                <div className="text-sm text-gray-300">Professionelle Reinigung in Moers</div>
              </div>
            </div>
            
            <div className="text-gray-300 text-sm space-y-1 mb-4">
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>0176 / 3444 6399</span>
                <span className="text-gray-500">•</span>
                <Mail className="w-4 h-4" />
                <span>info@grema-service.de</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span>Moers, NRW</span>
              </div>
            </div>
            
            <div className="text-gray-500 text-sm">
              <p>&copy; 2025 Grema Gebäudeservice GmbH. Alle Rechte vorbehalten.</p>
              <div className="flex justify-center space-x-6 mt-3">
                <a href="/impressum" className="hover:text-white">Impressum</a>
                <a href="/datenschutz" className="hover:text-white">Datenschutz</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}