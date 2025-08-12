import { useEffect } from "react";
import { 
  Building2, 
  Award, 
  Shield, 
  Users, 
  Clock, 
  Phone, 
  Mail, 
  MapPin,
  Heart,
  CheckCircle,
  Star,
  Sparkles,
  Crown,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "../components/Header";
import teamImage from "@assets/professional-cleaning-service-person-cleaning-office-min_1754484122126.jpg";

export default function UeberUns() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="ueber-uns" />

      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              <span>Über Grema Gebäudeservice GmbH</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Ihr Partner für professionelle <span className="text-primary">Gebäudereinigung</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto">
              Aus Moers für ganz NRW - wir setzen seit 2014 Maßstäbe in der professionellen Gebäudereinigung. 
              Vertrauen, Qualität und Zuverlässigkeit stehen im Mittelpunkt unserer Arbeit.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
                <a href="tel:017634446399" className="flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-2" />
                  0176 34446399
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                <a href="#kontakt" className="flex items-center justify-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Kontakt aufnehmen
                </a>
              </Button>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">✓</div>
                  <div className="text-sm text-gray-600">Regional verwurzelt</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">✓</div>
                  <div className="text-sm text-gray-600">Zuverlässig</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">✓</div>
                  <div className="text-sm text-gray-600">Professionell</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Erreichbar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unternehmensphilosophie */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Unsere Philosophie
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Regional verwurzelt, professionell ausgerichtet
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Aus Moers für ganz NRW
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Als regionaler Gebäudereiniger aus Moers verstehen wir die besonderen 
                Anforderungen unserer Kunden in Nordrhein-Westfalen. Seit 2014 setzen 
                wir auf persönlichen Service, faire Preise und höchste Qualität.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Unser Erfolg basiert auf Vertrauen, Zuverlässigkeit und der Fähigkeit, 
                individuelle Reinigungslösungen für jeden Kunden zu entwickeln. Dabei 
                kombinieren wir bewährte Arbeitsmethoden mit modernsten Technologien.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <MapPin className="w-6 h-6 text-primary mr-3" />
                  <h4 className="font-bold text-gray-900">Regional</h4>
                </div>
                <p className="text-gray-600">Verwurzelt in Moers, aktiv in ganz NRW</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Heart className="w-6 h-6 text-primary mr-3" />
                  <h4 className="font-bold text-gray-900">Persönlich</h4>
                </div>
                <p className="text-gray-600">Direkter Kontakt und individuelle Betreuung</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Sparkles className="w-6 h-6 text-primary mr-3" />
                  <h4 className="font-bold text-gray-900">Modern</h4>
                </div>
                <p className="text-gray-600">Neueste Technologien und Reinigungsverfahren</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unsere Werte */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Unsere Werte
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Diese Prinzipien leiten unser tägliches Handeln
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Vertrauen</h3>
              <p className="text-gray-600">
                Ehrliche Kommunikation, transparente Preise und zuverlässige Leistungen 
                bilden das Fundament unserer Kundenbeziehungen.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Qualität</h3>
              <p className="text-gray-600">
                Höchste Standards in der Ausführung, regelmäßige Schulungen und 
                kontinuierliche Qualitätskontrollen garantieren perfekte Ergebnisse.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                Modernste Reinigungstechnologien und umweltschonende Verfahren 
                für nachhaltige und effiziente Ergebnisse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Unser Team */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Unser Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Qualifizierte Fachkräfte mit Leidenschaft für Sauberkeit
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Users className="w-6 h-6 text-primary mr-3" />
                  <h4 className="font-bold text-gray-900">Erfahrene Mitarbeiter</h4>
                </div>
                <p className="text-gray-600">
                  Unser Team besteht aus sorgfältig ausgewählten und geschulten Fachkräften, 
                  die ihre Arbeit mit Stolz und Professionalität ausführen.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Shield className="w-6 h-6 text-primary mr-3" />
                  <h4 className="font-bold text-gray-900">Regelmäßige Schulungen</h4>
                </div>
                <p className="text-gray-600">
                  Kontinuierliche Weiterbildung in neuen Reinigungsverfahren, 
                  Hygienemaßnahmen und Arbeitssicherheit.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <CheckCircle className="w-6 h-6 text-primary mr-3" />
                  <h4 className="font-bold text-gray-900">Zuverlässigkeit</h4>
                </div>
                <p className="text-gray-600">
                  Pünktlichkeit, Sorgfalt und Diskretion sind für uns 
                  selbstverständlich - besonders in sensiblen Unternehmensbereichen.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ausbildung und Zertifizierung
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Jeder unserer Mitarbeiter durchläuft eine umfassende Ausbildung in den 
                Bereichen Reinigungstechnik, Hygiene und Kundendienst. Regelmäßige 
                Zertifizierungen stellen sicher, dass wir stets auf dem neuesten Stand 
                der Branche sind.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Unser Qualitätsmanagement und die persönliche Betreuung durch 
                erfahrene Teamleiter garantieren konstant hohe Standards bei 
                jedem Einsatz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Qualitätsstandards */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Qualitätsstandards
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Zertifizierte Verfahren und höchste Sicherheit
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <Shield className="w-10 h-10 text-primary mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Vollversicherung</h4>
              <p className="text-sm text-gray-600">
                Umfassende Haftpflicht- und Betriebsversicherung
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <CheckCircle className="w-10 h-10 text-primary mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">ISO Standards</h4>
              <p className="text-sm text-gray-600">
                Zertifizierte Qualitätsmanagementsysteme
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Pünktlichkeit</h4>
              <p className="text-sm text-gray-600">
                Garantierte Termine und flexible Zeiten
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <Sparkles className="w-10 h-10 text-primary mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Umweltschutz</h4>
              <p className="text-sm text-gray-600">
                Ökologische Reinigungsmittel und Verfahren
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt Section */}
      <section id="kontakt" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Kontakt aufnehmen
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Sprechen Sie mit uns über Ihre Reinigungsanforderungen
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Grema Gebäudeservice GmbH
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Adresse</p>
                    <p className="text-gray-600">Moers, Nordrhein-Westfalen</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Telefon</p>
                    <a href="tel:017634446399" className="text-primary hover:underline">
                      0176 344 463 99
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Erreichbarkeit</p>
                    <p className="text-gray-600">Mo-Fr: 8:00-18:00 Uhr</p>
                    <p className="text-gray-600">Sa: 9:00-14:00 Uhr</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 w-full sm:w-auto">
                  <a href="/" className="flex items-center justify-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Kostenlose Beratung anfragen
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Warum Grema Gebäudeservice?
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-gray-700">Kostenlose und unverbindliche Beratung</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-gray-700">Individuelle Lösungen für jeden Bedarf</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-gray-700">Transparente Preise ohne versteckte Kosten</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-gray-700">Regionale Nähe und persönlicher Service</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-gray-700">Flexible Termine und Notdienst</span>
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
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Grema Gebäudeservice GmbH</h3>
            </div>
            
            <p className="text-gray-400 mb-6">
              Professionelle Gebäudereinigung in Moers seit 2014
            </p>
            
            <div className="flex justify-center items-center space-x-8 text-gray-400 text-sm mb-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:017634446399" className="hover:text-white">0176/3444 6399</a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
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

      {/* Phone Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="tel:017634446399"
          className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}