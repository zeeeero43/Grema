import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion, useInView } from "framer-motion";
import { 
  Building2, 
  Phone, 
  Shield, 
  Leaf, 
  Award, 
  Clock, 
  Users, 
  Star,
  MapPin,
  Mail,
  Loader2,
  CheckCircle,
  Menu,
  X,
  ArrowRight,
  Camera,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { GoogleReviews } from "../components/GoogleReviews";
import { insertContactInquirySchema, type InsertContactInquiry } from "@shared/schema";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  
  // Animation refs
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  
  const servicesInView = useInView(servicesRef, { once: true, margin: "-50px" });
  const aboutInView = useInView(aboutRef, { once: true, margin: "-50px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-50px" });

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Classic Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 classic-blue" />
              <div>
                <h1 className="text-xl font-bold classic-blue">GREMA</h1>
                <p className="text-xs text-gray-500 leading-none">Gebäudeservice GmbH</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Leistungen
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Über uns
              </button>
              <button 
                onClick={() => scrollToSection('reviews')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Bewertungen
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Kontakt
              </button>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="classic-orange-bg hover:bg-orange-600 text-white px-6"
              >
                Jetzt Anrufen
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t py-4">
              <div className="flex flex-col space-y-3">
                <button onClick={() => scrollToSection('home')} className="text-left text-gray-700 hover:text-blue-600 font-medium">Home</button>
                <button onClick={() => scrollToSection('services')} className="text-left text-gray-700 hover:text-blue-600 font-medium">Leistungen</button>
                <button onClick={() => scrollToSection('about')} className="text-left text-gray-700 hover:text-blue-600 font-medium">Über uns</button>
                <button onClick={() => scrollToSection('reviews')} className="text-left text-gray-700 hover:text-blue-600 font-medium">Bewertungen</button>
                <button onClick={() => scrollToSection('contact')} className="text-left text-gray-700 hover:text-blue-600 font-medium">Kontakt</button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="classic-gradient-bg text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Professionelle Gebäudereinigung in Moers
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Über 15 Jahre Erfahrung in der professionellen Reinigung von Büros, 
                Praxen und Gewerbeimmobilien. Vertrauen Sie auf unsere Expertise.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="classic-orange-bg hover:bg-orange-600 text-white px-8 py-4"
                  onClick={() => scrollToSection('contact')}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Jetzt Anrufen: 0176 34446399
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4"
                  onClick={() => scrollToSection('contact')}
                >
                  Kostenvoranschlag anfordern
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold">15+</div>
                  <div className="text-sm opacity-75">Jahre Erfahrung</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm opacity-75">Zufriedene Kunden</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">5.0</div>
                  <div className="text-sm opacity-75">⭐ Google Bewertung</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Professionelle Gebäudereinigung"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold classic-blue mb-4">Unsere Leistungen</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Von der regelmäßigen Unterhaltsreinigung bis zur Grundreinigung - 
              wir bieten professionelle Lösungen für jeden Bedarf.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Building2 className="h-12 w-12 classic-blue" />,
                title: "Büroreinigung",
                description: "Regelmäßige professionelle Reinigung von Büroräumen, Besprechungsräumen und Gemeinschaftsbereichen.",
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              },
              {
                icon: <Sparkles className="h-12 w-12 classic-blue" />,
                title: "Grundreinigung",
                description: "Tiefenreinigung für Wohnungen, Büros und Gewerberäume mit modernsten Reinigungsverfahren.",
                image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              },
              {
                icon: <Camera className="h-12 w-12 classic-blue" />,
                title: "Fensterreinigung",
                description: "Professionelle Glasreinigung mit Osmose-Technik für streifenfreie Ergebnisse.",
                image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              },
              {
                icon: <Shield className="h-12 w-12 classic-blue" />,
                title: "Praxisreinigung",
                description: "Spezialisierte Reinigung für Arztpraxen und medizinische Einrichtungen nach höchsten Hygienestandards.",
                image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              },
              {
                icon: <Users className="h-12 w-12 classic-blue" />,
                title: "Industriereinigung",
                description: "Professionelle Reinigung von Produktionsstätten und Industrieanlagen.",
                image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              },
              {
                icon: <Award className="h-12 w-12 classic-blue" />,
                title: "Bauschlussreinigung",
                description: "Gründliche Endreinigung nach Bau- oder Renovierungsarbeiten.",
                image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-48 object-cover rounded-lg mb-6"
                    />
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold mb-3 classic-blue">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold classic-blue mb-6">
                Über Grema Gebäudeservice
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Seit über 15 Jahren sind wir Ihr verlässlicher Partner für professionelle 
                Gebäudereinigung in Moers und Umgebung. Unser erfahrenes Team sorgt dafür, 
                dass Ihre Räumlichkeiten stets in bestem Zustand sind.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="h-8 w-8 classic-orange mx-auto mb-2" />
                  <h4 className="font-bold classic-blue">Zuverlässig</h4>
                  <p className="text-sm text-gray-600">Pünktlich und verlässlich</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Shield className="h-8 w-8 classic-orange mx-auto mb-2" />
                  <h4 className="font-bold classic-blue">Versichert</h4>
                  <p className="text-sm text-gray-600">Vollständig versichert</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Leaf className="h-8 w-8 classic-orange mx-auto mb-2" />
                  <h4 className="font-bold classic-blue">Umweltfreundlich</h4>
                  <p className="text-sm text-gray-600">Ökologische Reinigungsmittel</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Award className="h-8 w-8 classic-orange mx-auto mb-2" />
                  <h4 className="font-bold classic-blue">Qualität</h4>
                  <p className="text-sm text-gray-600">Höchste Standards</p>
                </div>
              </div>

              <Button 
                size="lg" 
                className="classic-orange-bg hover:bg-orange-600 text-white"
                onClick={() => scrollToSection('contact')}
              >
                Jetzt Kontakt aufnehmen
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Unser Team"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section id="reviews" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold classic-blue mb-4">Was unsere Kunden sagen</h2>
            <p className="text-xl text-gray-600">Echte Bewertungen von zufriedenen Kunden</p>
          </div>
          <GoogleReviews />
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold classic-blue mb-4">Kontakt aufnehmen</h2>
            <p className="text-xl text-gray-600">
              Rufen Sie uns an oder senden Sie uns eine Nachricht für ein kostenloses Angebot
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold classic-blue mb-6">Kontaktinformationen</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Phone className="h-6 w-6 classic-orange" />
                    <div>
                      <p className="font-medium">Telefon</p>
                      <p className="text-gray-600">0176 34446399</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 classic-orange" />
                    <div>
                      <p className="font-medium">E-Mail</p>
                      <p className="text-gray-600">info@grema-gebaeudeservice.de</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-6 w-6 classic-orange" />
                    <div>
                      <p className="font-medium">Standort</p>
                      <p className="text-gray-600">Moers und Umgebung</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="classic-gradient-bg p-6 rounded-lg text-white">
                <h4 className="text-xl font-bold mb-4">Warum Grema wählen?</h4>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-300" />
                    <span>15+ Jahre Erfahrung</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-300" />
                    <span>500+ zufriedene Kunden</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-300" />
                    <span>Vollständig versichert</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-300" />
                    <span>Kostenlose Beratung</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold classic-blue mb-6">Kostenvoranschlag anfordern</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Ihr Name" {...field} />
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
                              <FormLabel>Telefon</FormLabel>
                              <FormControl>
                                <Input placeholder="Ihre Telefonnummer" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-Mail</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="ihre@email.de" {...field} />
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
                            <FormLabel>Gewünschte Leistung</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Bitte wählen Sie eine Leistung" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="buero">Büroreinigung</SelectItem>
                                <SelectItem value="grund">Grundreinigung</SelectItem>
                                <SelectItem value="fenster">Fensterreinigung</SelectItem>
                                <SelectItem value="praxis">Praxisreinigung</SelectItem>
                                <SelectItem value="industrie">Industriereinigung</SelectItem>
                                <SelectItem value="bau">Bauschlussreinigung</SelectItem>
                                <SelectItem value="sonstiges">Sonstiges</SelectItem>
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
                            <FormLabel>Nachricht</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Beschreiben Sie kurz Ihre Anforderungen..."
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
                        className="w-full classic-orange-bg hover:bg-orange-600 text-white"
                        disabled={contactMutation.isPending}
                      >
                        {contactMutation.isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Wird gesendet...
                          </>
                        ) : (
                          "Kostenvoranschlag anfordern"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="classic-gradient-bg text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-bold">GREMA</h3>
                  <p className="text-sm opacity-75">Gebäudeservice GmbH</p>
                </div>
              </div>
              <p className="opacity-75">
                Ihr zuverlässiger Partner für professionelle Gebäudereinigung in Moers und Umgebung.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Kontakt</h4>
              <div className="space-y-2 opacity-75">
                <p>📞 0176 34446399</p>
                <p>✉️ info@grema-gebaeudeservice.de</p>
                <p>📍 Moers und Umgebung</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Leistungen</h4>
              <div className="space-y-1 opacity-75">
                <p>• Büroreinigung</p>
                <p>• Grundreinigung</p>
                <p>• Fensterreinigung</p>
                <p>• Praxisreinigung</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-blue-600 mt-8 pt-8 text-center opacity-75">
            <p>&copy; 2025 Grema Gebäudeservice GmbH. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}