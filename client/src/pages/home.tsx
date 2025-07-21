import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { 
  Building2, 
  Phone, 
  Calculator, 
  Shield, 
  Leaf, 
  Award, 
  Heart, 
  Clock, 
  Users, 
  ShieldCheck,
  Star,
  Gift,
  MapPin,
  Mail,
  Loader2,
  CheckCircle,
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactInquirySchema, type InsertContactInquiry } from "@shared/schema";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertContactInquiry>({
    resolver: zodResolver(insertContactInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
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

  const services = [
    {
      icon: Building2,
      title: "Unterhaltsreinigung",
      description: "Regelmäßige professionelle Reinigung von Büros, Praxen und Gewerbeflächen für ein stets sauberes Arbeitsumfeld.",
    },
    {
      icon: Users,
      title: "Glas- & Fensterreinigung",
      description: "Streifenfreie Reinigung von Fenstern, Glasfassaden und Schaufenstern für perfekte Durchsicht und professionellen Eindruck.",
    },
    {
      icon: Award,
      title: "Bauabschlussreinigung", 
      description: "Gründliche Endreinigung nach Bau- oder Renovierungsarbeiten für bezugsfertige Räumlichkeiten.",
    },
    {
      icon: Shield,
      title: "Sonderreinigung",
      description: "Spezialreinigung bei besonderen Herausforderungen wie Graffiti-Entfernung oder Tiefenreinigung.",
    },
    {
      icon: MapPin,
      title: "Entrümpelung",
      description: "Professionelle Haushaltsauflösung und Entrümpelung mit umweltgerechter Entsorgung und Verwertung.",
    },
    {
      icon: Building2,
      title: "Treppenhausreinigung",
      description: "Regelmäßige Reinigung von Treppenhäusern, Aufzügen und Gemeinschaftsbereichen in Mehrfamilienhäusern.",
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Familienunternehmen mit Herz",
      description: "Persönlicher Service und individuelle Betreuung stehen bei uns im Mittelpunkt.",
    },
    {
      icon: Clock,
      title: "Lokal & Schnell",
      description: "In Moers ansässig – kurze Wege bedeuten schnelle Reaktionszeiten bei Ihren Anfragen.",
    },
    {
      icon: Leaf,
      title: "Umweltbewusst",
      description: "Wir verwenden ausschließlich umweltfreundliche Reinigungsmittel für Ihre Gesundheit.",
    },
    {
      icon: Users,
      title: "Flexible Arbeitszeiten",
      description: "Reinigung außerhalb Ihrer Geschäftszeiten – ohne Störung Ihres Betriebsablaufs.",
    },
    {
      icon: ShieldCheck,
      title: "Vollversichert & Zertifiziert",
      description: "Umfassender Versicherungsschutz und professionelle Zertifizierungen für Ihre Sicherheit.",
    },
  ];

  const testimonials = [
    {
      text: "Sehr zuverlässiger Service! Die Reinigung unserer Praxis erfolgt immer gründlich und pünktlich. Das Team ist freundlich und professionell.",
      author: "Dr. M. Weber",
      company: "Zahnarztpraxis Moers",
      rating: 5,
    },
    {
      text: "Die Bauabschlussreinigung war perfekt! Trotz des engen Zeitplans haben sie alles rechtzeitig fertiggestellt. Sehr empfehlenswert!",
      author: "S. Müller",
      company: "Müller Bau GmbH",
      rating: 5,
    },
    {
      text: "Faire Preise, flexible Terminplanung und immer saubere Ergebnisse. Die Kita-Reinigung ist in besten Händen bei Grema!",
      author: "A. Schmidt",
      company: "Kita Sonnenschein",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-primary text-white p-2 rounded-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Grema Gebäudeservice</h1>
                <p className="text-xs text-slate-600">GmbH</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#leistungen" className="text-slate-600 hover:text-primary transition-colors">Leistungen</a>
              <a href="#ueber-uns" className="text-slate-600 hover:text-primary transition-colors">Über uns</a>
              <a href="#kontakt" className="text-slate-600 hover:text-primary transition-colors">Kontakt</a>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <a href="tel:017634446399">
                  <Phone className="w-4 h-4 mr-2" />
                  Jetzt anrufen
                </a>
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-2">
              <a href="#leistungen" className="block py-2 text-slate-600 hover:text-primary transition-colors">Leistungen</a>
              <a href="#ueber-uns" className="block py-2 text-slate-600 hover:text-primary transition-colors">Über uns</a>
              <a href="#kontakt" className="block py-2 text-slate-600 hover:text-primary transition-colors">Kontakt</a>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 mt-2">
                <a href="tel:017634446399">
                  <Phone className="w-4 h-4 mr-2" />
                  Jetzt anrufen
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary to-blue-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Professionelle <span className="text-blue-300">Gebäudereinigung</span> in Moers
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
                Über 10 Jahre Erfahrung – Vertrauen Sie den Experten für saubere und gepflegte Gebäude
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="backdrop-blur-sm bg-white/95 px-4 py-2 rounded-full text-slate-900 text-sm font-medium">
                  <Shield className="w-4 h-4 text-emerald-500 mr-2 inline" />
                  Vollversichert
                </div>
                <div className="backdrop-blur-sm bg-white/95 px-4 py-2 rounded-full text-slate-900 text-sm font-medium">
                  <Leaf className="w-4 h-4 text-emerald-500 mr-2 inline" />
                  Umweltfreundlich
                </div>
                <div className="backdrop-blur-sm bg-white/95 px-4 py-2 rounded-full text-slate-900 text-sm font-medium">
                  <Award className="w-4 h-4 text-emerald-500 mr-2 inline" />
                  Zertifiziert
                </div>
              </div>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg font-semibold px-8 py-4">
                  <a href="tel:017634446399">
                    <Phone className="w-5 h-5 mr-3" />
                    Sofort anrufen: 0176/3444 6399
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-900 text-lg font-semibold px-8 py-4">
                  <a href="#kontakt">
                    <Calculator className="w-5 h-5 mr-3" />
                    Kostenloses Angebot
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-video bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center text-white">
                  <Building2 className="w-32 h-32 mx-auto mb-4 text-blue-300" />
                  <h3 className="text-2xl font-bold mb-2">Professioneller Service</h3>
                  <p className="text-blue-100">Moderne Gebäudereinigung mit Qualitätsgarantie</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="leistungen" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Unsere Leistungen</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Professionelle Reinigungslösungen für Unternehmen und Privatkunden in Moers und Umgebung
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="bg-primary text-white p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Button variant="ghost" className="text-primary font-semibold p-0 h-auto">
                    Mehr erfahren <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="ueber-uns" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8">
                Warum Grema Gebäudeservice?
              </h2>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-emerald-500 text-white p-3 rounded-full mt-1 flex-shrink-0">
                      <benefit.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                      <p className="text-slate-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Ihre Ansprechpartnerinnen</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center">
                        <Users className="w-10 h-10 text-slate-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900">Tanja Scheurenberg</h4>
                        <p className="text-slate-600">Geschäftsführerin</p>
                        <p className="text-sm text-primary">Kundenbetreuung & Operations</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center">
                        <Users className="w-10 h-10 text-slate-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900">Ivana Grejic</h4>
                        <p className="text-slate-600">Geschäftsführerin</p>
                        <p className="text-sm text-primary">Qualitätsmanagement & Projektleitung</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-center text-slate-600 italic">
                      "Über 10 Jahre Erfahrung in der professionellen Gebäudereinigung"
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Was unsere Kunden sagen</h2>
            <p className="text-xl text-slate-600">Vertrauen Sie auf die Erfahrungen zufriedener Kunden</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-slate-100">
                <CardContent className="p-8">
                  <div className="text-4xl text-primary mb-4">"</div>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.author}</p>
                    <p className="text-sm text-slate-600">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Kostenloses Angebot erhalten</h2>
            <p className="text-xl text-blue-200">Kontaktieren Sie uns noch heute – Beratung kostenlos und unverbindlich</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Sofortiger Kontakt</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                    <div className="bg-emerald-500 p-4 rounded-full">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">Rufen Sie uns direkt an:</p>
                      <a href="tel:017634446399" className="text-2xl font-bold hover:text-blue-300 transition-colors">
                        0176/3444 6399
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                    <div className="bg-emerald-500 p-4 rounded-full">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">Erreichbarkeit:</p>
                      <p className="text-lg font-semibold">Mo-Fr: 8:00-18:00 Uhr</p>
                      <p className="text-lg font-semibold">Sa: 9:00-14:00 Uhr</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                    <div className="bg-emerald-500 p-4 rounded-full">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">Unser Standort:</p>
                      <p className="text-lg font-semibold">Moers & Umgebung</p>
                      <p className="text-blue-200">Nordrhein-Westfalen</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-emerald-500/20 rounded-2xl border border-emerald-500/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <Gift className="w-6 h-6 text-emerald-500" />
                    <h4 className="text-lg font-semibold">Kostenlose Beratung</h4>
                  </div>
                  <p className="text-blue-200">
                    Lassen Sie sich unverbindlich beraten. Wir erstellen Ihnen gerne ein maßgeschneidertes Angebot.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Angebot anfordern</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-blue-200">Name *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ihr vollständiger Name" 
                            className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
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
                        <FormLabel className="text-blue-200">E-Mail *</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="ihre.email@beispiel.de" 
                            className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-blue-200">Telefon</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel"
                            placeholder="0123 456789 (optional)" 
                            className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                            {...field} 
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
                        <FormLabel className="text-blue-200">Gewünschte Leistung</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Bitte wählen Sie..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="unterhaltsreinigung">Unterhaltsreinigung</SelectItem>
                            <SelectItem value="fensterreinigung">Glas- & Fensterreinigung</SelectItem>
                            <SelectItem value="bauabschlussreinigung">Bauabschlussreinigung</SelectItem>
                            <SelectItem value="sonderreinigung">Sonderreinigung</SelectItem>
                            <SelectItem value="entruempelung">Entrümpelung & Haushaltsauflösung</SelectItem>
                            <SelectItem value="treppenhausreinigung">Treppenhausreinigung</SelectItem>
                            <SelectItem value="beratung">Allgemeine Beratung</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-blue-200">Ihre Nachricht</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Beschreiben Sie Ihre Anforderungen..." 
                            className="bg-white/10 border-white/20 text-white placeholder:text-blue-300 resize-none"
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
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 transition-all duration-300"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Wird gesendet...
                      </>
                    ) : contactMutation.isSuccess ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Erfolgreich gesendet!
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5 mr-2" />
                        Kostenloses Angebot erhalten
                      </>
                    )}
                  </Button>
                  
                  <p className="text-sm text-blue-300 text-center">
                    <ShieldCheck className="w-4 h-4 mr-1 inline" />
                    Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/10 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-primary text-white p-2 rounded-lg">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Grema Gebäudeservice GmbH</h3>
                  <p className="text-blue-200">Ihr Partner für professionelle Reinigung</p>
                </div>
              </div>
              <p className="text-blue-200 mb-6 max-w-md">
                Professionelle Gebäudereinigung in Moers und Umgebung. Über 10 Jahre Erfahrung, umweltfreundlich und vollversichert.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Leistungen</h4>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#leistungen" className="hover:text-white transition-colors">Unterhaltsreinigung</a></li>
                <li><a href="#leistungen" className="hover:text-white transition-colors">Fensterreinigung</a></li>
                <li><a href="#leistungen" className="hover:text-white transition-colors">Bauabschlussreinigung</a></li>
                <li><a href="#leistungen" className="hover:text-white transition-colors">Sonderreinigung</a></li>
                <li><a href="#leistungen" className="hover:text-white transition-colors">Entrümpelung</a></li>
                <li><a href="#leistungen" className="hover:text-white transition-colors">Treppenhausreinigung</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
              <div className="space-y-2 text-blue-200">
                <p className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-emerald-500" />
                  <a href="tel:017634446399" className="hover:text-white transition-colors">0176/3444 6399</a>
                </p>
                <p className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <span>Moers, NRW</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span>Mo-Fr: 8:00-18:00</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-blue-200">
            <p>&copy; 2025 Grema Gebäudeservice GmbH. Alle Rechte vorbehalten.</p>
            <div className="flex justify-center space-x-6 mt-4">
              <a href="#" className="hover:text-white transition-colors">Impressum</a>
              <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
              <a href="#" className="hover:text-white transition-colors">AGB</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
