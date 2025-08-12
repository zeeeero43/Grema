import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { 
  Building2, 
  Phone, 
  Shield, 
  Clock, 
  Users, 
  ShieldCheck,
  MapPin,
  Mail,
  Loader2,
  CheckCircle,
  Menu,
  X,
  ArrowRight,
  Star,
  Award,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactInquirySchema, type InsertContactInquiry } from "@shared/schema";
import { Link } from "wouter";
import { Header } from "../components/Header";
import { ServicePageSEO } from "../components/seo/ServicePageSEO";
import heroImage from "@assets/professional-cleaning-service-person-cleaning-office-min_1754484122126.jpg";

export default function Unterhaltsreinigung() {
  const { toast } = useToast();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const form = useForm<InsertContactInquiry>({
    resolver: zodResolver(insertContactInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "unterhaltsreinigung",
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactInquiry) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Erfolgreich gesendet!",
        description: data.message,
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler beim Senden",
        description: "Bitte versuchen Sie es später erneut oder rufen Sie uns direkt an.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactInquiry) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-white">
      <ServicePageSEO
        serviceName="Unterhaltsreinigung"
        serviceDescription="Professionelle Büro- und Praxisreinigung in Moers und Umgebung. Zuverlässige Unterhaltsreinigung für Unternehmen aller Größen mit höchsten Hygienestandards."
        serviceKeywords="Unterhaltsreinigung Moers, Büroreinigung, Praxisreinigung, Gewerbliche Reinigung, Objektreinigung Moers, Reinigungsservice Büro"
        canonicalUrl="/unterhaltsreinigung"
        serviceDetails={{
          coverage: ["Moers", "Duisburg", "Krefeld", "Düsseldorf"]
        }}
      />
      {/* Header */}
      <Header currentPage="unterhaltsreinigung" />

      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Award className="w-4 h-4" />
                <span>Deutschlands führende Büroreinigung</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Professionelle <span className="text-primary">Büro- & Praxisreinigung</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Unternehmen vertrauen auf unsere zuverlässige Unterhaltsreinigung. 
                Von Großraumbüros bis zu medizinischen Praxen – wir garantieren höchste Hygienestandards.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
                  <a href="tel:017634446399" className="flex items-center justify-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Jetzt anrufen
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  <a href="#angebot" className="flex items-center justify-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Kostenlose Beratung
                  </a>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">✓</div>
                  <div className="text-sm text-gray-600">Zuverlässig</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">✓</div>
                  <div className="text-sm text-gray-600">Professionell</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Service</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage}
                alt="Professionelle Büroreinigung von Grema Gebäudeservice" 
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leistungen Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Unsere Büroreinigung-Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Maßgeschneiderte Reinigungslösungen für Ihr Unternehmen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tägliche Unterhaltsreinigung</h3>
              <p className="text-gray-600">
                Regelmäßige Reinigung von Büros, Konferenzräumen, Sanitäranlagen und Gemeinschaftsbereichen nach individuellen Plänen.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Praxis & Medizin</h3>
              <p className="text-gray-600">
                Spezialisierte Hygienereinigung für Arztpraxen, Kliniken und medizinische Einrichtungen nach strengsten Standards.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Zeiten</h3>
              <p className="text-gray-600">
                Reinigung außerhalb Ihrer Geschäftszeiten, abends oder am Wochenende. Keine Störung Ihres Betriebsablaufs.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Geschultes Personal</h3>
              <p className="text-gray-600">
                Erfahrene und geschulte Reinigungskräfte mit Sicherheitsschulung für sensible Unternehmensbereiche.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Grundreinigung</h3>
              <p className="text-gray-600">
                Intensive Tiefenreinigung für Teppiche, Polster und schwer zugängliche Bereiche. Perfekt für Umzüge oder Renovierungen.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Qualitätskontrolle</h3>
              <p className="text-gray-600">
                Regelmäßige Qualitätskontrollen und direkter Ansprechpartner für kontinuierlich hohe Standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Warum Grema Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Warum Grema für Ihre Büroreinigung?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Vertrauen Sie auf unsere professionelle und zuverlässige Reinigung
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Langjährige Erfahrung</h3>
              <p className="text-gray-600">
                Wir reinigen Büros und Praxen in NRW mit bewährten Methoden. 
                Unsere Erfahrung garantiert professionelle Ergebnisse.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Vollversichert</h3>
              <p className="text-gray-600">
                Umfassende Betriebshaftpflicht- und Sachversicherung für Ihre 
                Sicherheit und unsere Verantwortung.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">ISO-Zertifiziert</h3>
              <p className="text-gray-600">
                Qualitätsmanagement nach ISO 9001 und modernste Reinigungstechnik 
                für beste Ergebnisse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="angebot" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Kostenlose Beratung vereinbaren
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lassen Sie sich unverbindlich beraten. Wir erstellen Ihnen ein maßgeschneidertes Angebot für Ihre Büroreinigung.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Kontakt & Anfahrt</h3>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary p-3 rounded-full flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">Telefon</h4>
                        <a href="tel:017634446399" className="text-xl font-bold text-primary hover:underline">
                          0176 / 3444 6399
                        </a>
                        <p className="text-sm text-gray-600 mt-1">Mo-Fr: 7:00-19:00 • Sa: 8:00-16:00</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary p-3 rounded-full flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">Standort</h4>
                        <p className="text-gray-900">Grema Gebäudeservice GmbH</p>
                        <p className="text-gray-600">Moers, Düsseldorf & Ruhrgebiet</p>
                        <p className="text-sm text-gray-600">Deutschlandweit tätig</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center space-x-3 mb-3">
                      <CheckCircle className="w-6 h-6 text-primary" />
                      <h4 className="font-bold text-gray-900">Kostenlose Beratung</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Lassen Sie sich unverbindlich beraten. Wir analysieren Ihren Bedarf 
                      und erstellen Ihnen ein maßgeschneidertes Angebot.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Angebot anfordern</h3>
                  
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Max Mustermann" 
                                className="border-gray-300 focus:border-primary focus:ring-primary"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">E-Mail *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="mail@beispiel.de" 
                                className="border-gray-300 focus:border-primary focus:ring-primary"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">Telefon</FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                value={field.value || ""}
                                type="tel"
                                placeholder="0123 456789" 
                                className="border-gray-300 focus:border-primary focus:ring-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">Interesse</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-gray-300 focus:border-primary focus:ring-primary">
                                  <SelectValue placeholder="Büro-/Praxisreinigung" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="unterhaltsreinigung">Büro-/Praxisreinigung</SelectItem>
                                <SelectItem value="fensterreinigung">Fenster & Glas</SelectItem>
                                <SelectItem value="bauabschlussreinigung">Bauabschlussreinigung</SelectItem>
                                <SelectItem value="sonderreinigung">Sonderreinigung</SelectItem>
                                <SelectItem value="entruempelung">Entrümpelung</SelectItem>
                                <SelectItem value="beratung">Persönliche Beratung</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Nachricht</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Beschreiben Sie gerne Ihr Anliegen..." 
                              className="border-gray-300 focus:border-primary focus:ring-primary"
                              rows={4}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Wird gesendet...
                        </>
                      ) : contactMutation.isSuccess ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Erfolgreich gesendet!
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Nachricht senden
                        </>
                      )}
                    </Button>
                    
                    <p className="text-sm text-gray-600 text-center">
                      <ShieldCheck className="w-4 h-4 mr-1 inline text-primary" />
                      Vertrauliche Behandlung. Antwort binnen 24h.
                    </p>
                  </form>
                </Form>
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
                <Link href="/" className="hover:text-white">Startseite</Link>
                <a href="/impressum" className="hover:text-white">Impressum</a>
                <a href="/datenschutz" className="hover:text-white">Datenschutz</a>

              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Simple Phone Button */}
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