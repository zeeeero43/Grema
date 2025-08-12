import { useEffect } from "react";
import { Building2, Phone, Mail, Users } from "lucide-react";
import { Header } from "../components/Header";
import { SEOHead } from "../components/seo/SEOHead";

export default function Impressum() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Impressum | Grema Gebäudeservice GmbH - Moers"
        description="Impressum und rechtliche Angaben der Grema Gebäudeservice GmbH. Geschäftsführung: Ivana Grejic, Moers."
        keywords="Impressum, Grema Gebäudeservice, Moers, rechtliche Angaben, Kontaktdaten"
        canonicalUrl="/impressum"
        ogType="website"
      />
      
      {/* Header */}
      <Header currentPage="" />

      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              <span>Rechtliche Angaben</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Impressum
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)
            </p>
          </div>
        </div>
      </section>

      {/* Impressum Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-12">
            
            {/* Firmenangaben */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Firmenangaben</h2>
              </div>
              
              <div className="space-y-3 text-gray-700">
                <p className="text-xl font-semibold text-gray-900">Grema Gebäudeservice GmbH</p>
                <div className="space-y-1">
                  <p>Neuer Wall 2-4</p>
                  <p>47441 Moers</p>
                  <p>Deutschland</p>
                </div>
              </div>
            </div>

            {/* Kontakt */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Kontakt</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-gray-700">Telefon: <a href="tel:01763444639" className="text-primary hover:underline">0176/3444 6399</a></span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-gray-700">E-Mail: <a href="mailto:info@grema-service.de" className="text-primary hover:underline">info@grema-service.de</a></span>
                </div>
              </div>
            </div>

            {/* Geschäftsführung */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Geschäftsführung</h2>
              </div>
              
              <div className="space-y-2 text-gray-700">
                <p>Ivana Grejic</p>
              </div>
            </div>

            {/* Rechtliche Hinweise */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Rechtliche Hinweise</h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Haftung für Inhalte</h3>
                  <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Haftung für Links</h3>
                  <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Urheberrecht</h3>
                  <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
                </div>
              </div>
            </div>

            {/* Stand der Angaben */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">Stand: August 2025</p>
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
                <Building2 className="w-5 h-5 text-white" />
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