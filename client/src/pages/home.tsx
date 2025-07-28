import { useState, useRef, useEffect } from "react";
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
  Heart, 
  Clock, 
  Users, 
  ShieldCheck,
  Star,
  MapPin,
  Mail,
  Loader2,
  CheckCircle,
  Calendar,
  Menu,
  X,
  Quote,
  Sparkles,
  Crown,
  CheckCheck,
  ArrowRight,
  Gift,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Hammer,
  Zap,
  Trash2,
  Camera
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
  
  // Carousel setup  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Animation refs for scroll-triggered effects
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const processRef = useRef(null);
  const reviewsRef = useRef(null);
  const faqRef = useRef(null);
  const contactRef = useRef(null);
  
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const processInView = useInView(processRef, { once: true, margin: "-100px" });
  const reviewsInView = useInView(reviewsRef, { once: true, margin: "-100px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-100px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" });

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
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Unterhalts- & Gewerbereinigung",
      description: "Regelmäßige Reinigung für Büros, Praxen und Geschäfte. Flexible Zeiten und individuelle Reinigungspläne.",
      href: "/services/unterhaltsreinigung",
      icon: "🏢"
    },
    {
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Grundreinigung",
      description: "Tiefenreinigung für Wohnungen, Büros und Gewerbe. Professionelle Dampfreinigung für makellose Sauberkeit.",
      href: "/services/grundreinigung",
      icon: "✨"
    },
    {
      image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Fenster- & Glasreinigung",
      description: "Streifenfreie Ergebnisse durch Osmose-Technik und professionelle Steiger-Ausrüstung. Auch schwer erreichbare Bereiche.",
      href: "/services/fensterreinigung",
      icon: "🪟"
    },
    {
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Industriereinigung",
      description: "Maschinenreinigung, Produktionsanlagen, Chemie-/Säurebehandlungen. Hochdruck- und Heißreinigung für optimale Betriebseffizienz.",
      href: "/services/industriereinigung",
      icon: "🏭"
    },
    {
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Bauschlussreinigung",
      description: "Komplette Bauschlussreinigung inklusive Wertstofftrennung und fachgerechter Entsorgung. Übergabebereit in kürzester Zeit.",
      href: "/services/bauschlussreinigung",
      icon: "🏗️"
    }
  ];

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
      setIsTransitioning(false);
    }, 0);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
      setIsTransitioning(false);
    }, 0);
  };

  const usps = [
    {
      title: "Marktführer seit 2009",
      subtitle: "500+ Geschäftskunden deutschlandweit",
      description: "Von Kleinbetrieben bis DAX-Unternehmen - unsere zertifizierten Standards überzeugen seit über 15 Jahren die anspruchsvollsten Kunden."
    },
    {
      title: "Zertifizierte Qualitätsgarantie",
      subtitle: "ISO-Standards & Vollversicherung",
      description: "Professionelle Ausbildung, modernste Technik und umfassende Versicherung garantieren höchste Sicherheit für Ihr Unternehmen."
    },
    {
      title: "Deutschlandweiter Premium-Service",
      subtitle: "Niederlassungen von Düsseldorf bis Hamburg",
      description: "Regionale Nähe, nationale Kompetenz. Wir liefern einheitliche Premium-Standards an allen Standorten Ihres Unternehmens."
    }
  ];

  const testimonials = [
    {
      text: "Das Team war pünktlich, freundlich und äußerst gründlich. Besonders beeindruckt hat mich die Sorgfalt, mit der jedes Detail beachtet wurde. Unsere KiTa glänzen förmlich und alle Ecken und Winkel wurden sorgfältig gereinigt.",
      author: "Vera M.", 
      company: "KiTa Moers",
      location: "Google Bewertung",
      years: "⭐⭐⭐⭐⭐"
    },
    {
      text: "Hat alles super geklappt, schnelle Terminvergabe, freundliche Mitarbeiter und meine Fenster sind wieder blitzeblank 😊 werde ich aufjedenfall weiterempfehlen 👍",
      author: "Sandra K.",
      company: "Privatkunde",
      location: "Google Bewertung", 
      years: "⭐⭐⭐⭐⭐"
    },
    {
      text: "Wir als FoodTruck Event Caterer sind vollsten zufrieden mit Herrn Grema und seinen Mitarbeitern. Ob komplette Küchenreinigung, Büro oder unsere FoodTrucks wir sind zufrieden und wenn es mal nicht so sein sollte, wird nachgebessert.",
      author: "Mario R.",
      company: "FoodTruck Caterer",
      location: "Google Bewertung", 
      years: "⭐⭐⭐⭐⭐"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.nav 
        className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 anthracite-bg flex items-center justify-center">
                <Crown className="w-6 h-6 gold-accent" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-gray-900">Grema</h1>
                <p className="text-sm text-gray-600 tracking-wide">GEBÄUDESERVICE GMBH</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="#services" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-gray-700 hover:gold-accent transition-colors font-medium cursor-pointer"
              >
                Leistungen
              </a>
              <a 
                href="#about" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-gray-700 hover:gold-accent transition-colors font-medium cursor-pointer"
              >
                Über uns
              </a>
              <a 
                href="#process" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-gray-700 hover:gold-accent transition-colors font-medium cursor-pointer"
              >
                Ablauf
              </a>
              <a 
                href="#reviews" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-gray-700 hover:gold-accent transition-colors font-medium cursor-pointer"
              >
                Bewertungen
              </a>
              <Button 
                asChild 
                className="anthracite-bg text-white hover:gold-shine font-bold px-8 py-3 text-lg sparkle-effect"
              >
                <a 
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Jetzt kostenlos anrufen!
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
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: mobileMenuOpen ? "auto" : 0,
            opacity: mobileMenuOpen ? 1 : 0 
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
        >
          {mobileMenuOpen && (
            <motion.div 
              className="px-6 py-4 space-y-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <a 
                href="#services" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block py-2 text-gray-700 hover:gold-accent transition-colors font-medium cursor-pointer"
              >
                Leistungen
              </a>
              <a 
                href="#about" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block py-2 text-gray-700 hover:gold-accent transition-colors font-medium cursor-pointer"
              >
                Über uns
              </a>
              <a 
                href="#process" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block py-2 text-gray-700 hover:gold-accent transition-colors font-medium cursor-pointer"
              >
                Ablauf
              </a>
              <a 
                href="#reviews" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block py-2 text-gray-700 hover:gold-accent transition-colors font-medium cursor-pointer"
              >
                Bewertungen
              </a>
              <Button asChild className="w-full anthracite-bg hover:gold-shine text-white font-bold mt-4 sparkle-effect">
                <a 
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Jetzt kostenlos anrufen!
                </a>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative bg-gray-50 min-h-[90vh] flex items-center">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-20">
          <div className="text-center space-y-8">
            {/* Simple Badge */}
            <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-2 shadow-sm border">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-gray-700">Professionelle Gebäudereinigung seit 2014</span>
            </div>
            
            {/* Main Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-gray-900 mb-6 leading-tight">
                <span className="block">Grema Gebäudeservice GmbH</span>
                <span className="text-primary block">Ihr Partner für Sauberkeit</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Professionelle Gebäudereinigung in Moers und Umgebung. 
                Seit 2014 vertrauen über 500 Kunden auf unsere zuverlässigen Reinigungsdienstleistungen.
              </p>
            </div>

            {/* Simple Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="text-3xl font-bold text-gray-900 mb-1">15</div>
                <div className="text-sm text-gray-600">Jahre Erfahrung</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="text-3xl font-bold text-primary mb-1">5.0</div>
                <div className="text-sm text-gray-600">⭐ Google Bewertung</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
                <div className="text-sm text-gray-600">Zufriedene Kunden</div>
              </div>
            </div>

            {/* Simple CTA Section */}
            <div className="flex flex-col items-center space-y-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary text-white px-8 py-3 text-lg font-semibold hover:opacity-90"
              >
                <a href="tel:017634446399" className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Jetzt anrufen: 0176 34446399
                </a>
              </Button>
              
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Kostenlose Beratung</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Angebot in 24h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Premium Carousel */}
      <section ref={servicesRef} id="services" className="py-16 md:py-20 bg-[hsl(220,13%,97%)] relative overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[hsl(187,96%,43%)]/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-[hsl(213,78%,32%)]/5 rounded-full blur-xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-4 md:mb-6 px-4 md:px-0"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="block sm:inline-block">Deutschlands führende</span>{" "}
              <span className="gold-accent block sm:inline-block">Gebäudereinigungs-Experten</span>
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 md:px-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Von der Grundreinigung bis zur Spezialpflege - unsere zertifizierten Teams liefern makellose Ergebnisse für über 500 Geschäftskunden deutschlandweit.
            </motion.p>
          </motion.div>
          
          {/* Desktop Carousel Layout */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Navigation Buttons */}
              <Button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-900 rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300"
                size="sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              
              <Button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-900 rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300"
                size="sm"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Carousel Container */}
              <div className="mx-12 overflow-hidden">
                <div 
                  className="flex gap-8 transition-transform duration-500 ease-in-out"
                  style={{ 
                    transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                  }}
                >
                  {[...services, ...services].map((service, index) => {
                    return (
                      <motion.div
                        key={`${service.title}-${index}`}
                        initial={{ y: 50, opacity: 0, rotateX: -15 }}
                        animate={{ y: 0, opacity: 1, rotateX: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                          duration: 0.8,
                          delay: index * 0.1
                        }}
                        className="flex-shrink-0 w-80 hover:scale-102 hover:-translate-y-1 transition-transform"
                      >
                        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(45,95%,50%)]/20 via-[hsl(45,95%,50%)]/10 to-transparent transition-opacity duration-300 group-hover:opacity-60" />
                          
                          <div className="absolute bottom-0 left-0 right-0 text-white transition-transform duration-300 group-hover:translate-y-0 z-10">
                            <div className="bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6">
                            <h3 className="text-xl font-bold mb-2 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-yellow-300 group-hover:to-yellow-200 group-hover:bg-clip-text group-hover:text-transparent">
                              {service.title}
                            </h3>
                            <p className="text-sm opacity-90 mb-4 leading-relaxed transition-opacity duration-300 group-hover:opacity-100">
                              {service.description}
                            </p>
                            <Button 
                              className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/40 group-hover:scale-102"
                              size="sm"
                            >
                              Mehr Infos <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'gold-shine scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Horizontal Scroll Layout */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ y: 50, opacity: 0, rotateX: -15 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    duration: 0.8,
                    delay: index * 0.1
                  }}
                  className="flex-shrink-0 w-80 snap-start"
                >
                  <div className="relative h-96 rounded-xl overflow-hidden shadow-lg group">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(45,95%,50%)]/20 via-[hsl(45,95%,50%)]/10 to-transparent transition-opacity duration-300 group-hover:opacity-60" />
                    
                    <div className="absolute bottom-0 left-0 right-0 text-white transition-transform duration-300 group-hover:translate-y-0 z-10">
                      <div className="bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6">
                      <h3 className="text-xl font-bold mb-2 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-yellow-300 group-hover:to-yellow-200 group-hover:bg-clip-text group-hover:text-transparent">
                        {service.title}
                      </h3>
                      <p className="text-sm opacity-90 mb-4 leading-relaxed transition-opacity duration-300 group-hover:opacity-100">
                        {service.description}
                      </p>
                      <Button 
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/40 group-hover:scale-102"
                        size="sm"
                      >
                        Mehr Infos <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutRef} id="about" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h2 
                className="text-5xl lg:text-6xl font-serif text-gray-900 mb-12 sparkle-effect"
                initial={{ opacity: 0, y: 50 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Warum uns 500+ Unternehmen <span className="gold-accent">vertrauen</span>?
              </motion.h2>
              
              <div className="space-y-10">
                {usps.map((usp, index) => (
                  <motion.div 
                    key={index}
                    className="glass-card p-6 rounded-xl clean-hover sparkle-effect"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={aboutInView ? { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1 
                    } : { 
                      opacity: 0, 
                      y: 30, 
                      scale: 0.95 
                    }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.4 + (index * 0.2),
                      ease: "easeOut" 
                    }}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -5,
                      transition: { duration: 0.2 } 
                    }}
                  >
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{usp.title}</h3>
                    <p className="gold-accent text-lg font-medium mb-3">{usp.subtitle}</p>
                    <p className="text-gray-600 leading-relaxed text-lg">{usp.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            >
              <motion.div 
                className="crystal-clear shadow-2xl rounded-2xl sparkle-effect"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={aboutInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <div className="p-10">
                  <motion.div 
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">Ihre Experten-Geschäftsführung</h3>
                    <p className="text-gray-600">15 Jahre Branchenerfahrung aus einer Hand</p>
                  </motion.div>
                  
                  <div className="space-y-8">
                    {[
                      { name: "Tanja Scheurenberg", role: "Geschäftsführerin", dept: "Kundenbetreuung & Operations" },
                      { name: "Ivana Grejic", role: "Geschäftsführerin", dept: "Qualitätsmanagement & Projektleitung" }
                    ].map((person, index) => (
                      <motion.div 
                        key={index}
                        className="text-center"
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={aboutInView ? { 
                          opacity: 1, 
                          y: 0, 
                          scale: 1 
                        } : { 
                          opacity: 0, 
                          y: 30, 
                          scale: 0.9 
                        }}
                        transition={{ duration: 0.6, delay: 0.7 + (index * 0.1) }}
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                      >
                        <motion.div 
                          className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center"
                          whileHover={{ rotate: 5, transition: { duration: 0.3 } }}
                        >
                          <Users className="w-16 h-16 text-gray-400" />
                        </motion.div>
                        <div>
                          <h4 className="text-xl font-serif font-bold text-gray-900">{person.name}</h4>
                          <p className="gold-accent font-medium mb-2">{person.role}</p>
                          <p className="text-sm text-gray-600">{person.dept}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="mt-10 pt-8 border-t border-gray-200 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <Quote className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-700 italic text-lg">
                      „Von lokalen Büros bis zu internationalen Konzernen – 
                      wir liefern deutschlandweit Premium-Reinigungsstandards."
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} id="process" className="py-16 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <motion.div 
            className="text-center mb-12 md:mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6 md:mb-8 px-4 md:px-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={processInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Ihr Weg zu <span className="gold-accent block sm:inline">Premium-Sauberkeit</span> in 3 Schritten
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 md:px-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Unser bewährtes Verfahren für maximale Effizienz und garantierte Qualitätsstandards - von der Beratung bis zur perfekten Ausführung
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Step 1: Contact */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center relative"
            >
              <div className="relative mb-6 md:mb-8">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg relative z-10">
                  <Phone className="w-12 h-12 md:w-16 md:h-16 text-gray-700" />
                </div>
                <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 gold-bg rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm z-20">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Professionelle Beratung</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Unser Expertenteam analysiert Ihre spezifischen Anforderungen und entwickelt maßgeschneiderte Reinigungskonzepte für Ihr Unternehmen.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 gold-accent" />
                  <span>Kostenlose Beratung</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 gold-accent" />
                  <span>Individuelle Lösungen</span>
                </div>
              </div>
            </motion.div>

            {/* Step 2: Quote */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center relative"
            >
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg relative z-10">
                  <Calendar className="w-16 h-16 text-gray-700" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 gold-bg rounded-full flex items-center justify-center text-white font-bold text-sm z-20">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Präzise Kalkulation</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Detaillierte Kostenaufstellung nach Industriestandards mit transparenter Preisgestaltung und flexiblen Vertragsmodellen für langfristige Partnerschaften.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 gold-accent" />
                  <span>Transparente Preise</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 gold-accent" />
                  <span>Detaillierte Leistungsbeschreibung</span>
                </div>
              </div>
            </motion.div>

            {/* Step 3: Execution */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center relative"
            >
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg relative z-10">
                  <Sparkles className="w-16 h-16 text-gray-700" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 gold-bg rounded-full flex items-center justify-center text-white font-bold text-sm z-20">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Zertifizierte Durchführung</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Professionelle Umsetzung nach ISO-Standards mit modernster Technik und geschulten Fachkräften - nachweisbare Qualität durch kontinuierliche Kontrollen.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 gold-accent" />
                  <span>Pünktliche Ausführung</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 gold-accent" />
                  <span>Garantierte Qualität</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex justify-center mt-16"
          >
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg text-center max-w-md">
              <h4 className="text-xl font-serif font-bold text-gray-900 mb-2">
                Bereit für Premium-Standards?
              </h4>
              <p className="text-gray-600 mb-6">
                Starten Sie Ihre Partnerschaft mit Deutschlands führenden Reinigungsexperten - kostenlose Erstberatung inklusive!
              </p>
              <a 
                href="tel:017634446399"
                className="inline-flex items-center space-x-2 gold-bg text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
              >
                <span>Jetzt kostenlos anrufen!</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <motion.div
        ref={reviewsRef}
        id="reviews"
        initial={{ opacity: 0, y: 100 }}
        animate={reviewsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <GoogleReviews />
      </motion.div>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-32 anthracite-bg text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-5xl lg:text-6xl font-serif text-white mb-8 sparkle-effect"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={contactInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Bereit für <span className="gold-accent">Premium-Partnerschaft</span>?
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Kontaktieren Sie Deutschlands führende Reinigungsexperten. Kostenlose Beratung, maßgeschneiderte Lösungen, zertifizierte Qualität.
            </motion.p>
          </motion.div>
          
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Contact Info */}
            <motion.div 
              className="lg:col-span-2 space-y-10"
              initial={{ opacity: 0, x: -80 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <div>
                <h3 className="text-3xl font-serif font-bold text-white mb-8">Ihr direkter Draht zu den Experten</h3>
                
                <div className="space-y-6">
                  <motion.div 
                    className="p-8 bg-white/5 rounded-2xl border border-white/10"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={contactInView ? { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1 
                    } : { 
                      opacity: 0, 
                      y: 30, 
                      scale: 0.95 
                    }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -5,
                      transition: { duration: 0.2 } 
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="gold-bg p-3 rounded-full flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-300 text-sm mb-2">Geschäftsführung persönlich erreichen:</p>
                        <a href="tel:017634446399" className="text-2xl font-serif font-bold text-white hover:gold-accent transition-colors block">
                          0176 / 3444 6399
                        </a>
                        <p className="text-gray-400 text-sm mt-2">Geschäftszeiten: Mo-Fr: 7:00-19:00 Uhr • Sa: 8:00-16:00 Uhr • Notfall: 24/7</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="p-8 bg-white/5 rounded-2xl border border-white/10"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={contactInView ? { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1 
                    } : { 
                      opacity: 0, 
                      y: 30, 
                      scale: 0.95 
                    }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -5,
                      transition: { duration: 0.2 } 
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="gold-bg p-3 rounded-full flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-300 text-sm mb-2">Hauptniederlassung:</p>
                        <p className="text-xl font-serif font-bold text-white">Moers • Düsseldorf • Ruhrgebiet</p>
                        <p className="text-gray-400 text-sm">Deutschlandweit tätig • 15+ Standorte</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="mt-10 p-6 bg-yellow-600/20 rounded-2xl border border-yellow-600/30"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={contactInView ? { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1 
                  } : { 
                    opacity: 0, 
                    y: 30, 
                    scale: 0.95 
                  }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -5,
                    transition: { duration: 0.2 } 
                  }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle className="w-6 h-6 gold-accent" />
                    <h4 className="text-lg font-serif font-bold text-white">Premium-Beratung kostenfrei</h4>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Geschäftsführung analysiert Ihren Bedarf persönlich. Strategische Beratung auf höchstem Niveau - kostenfrei und unverbindlich.
                  </p>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 80 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <motion.div 
                className="bg-white/95 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={contactInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <div className="p-10">
                  <h3 className="text-3xl font-serif font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-8">Gespräch vereinbaren</h3>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 text-sm font-medium">Vollständiger Name *</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Max Mustermann" 
                                  className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl focus:border-yellow-600 focus:ring-yellow-600"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 text-sm font-medium">E-Mail Adresse *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder="m.mustermann@beispiel.de" 
                                  className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl focus:border-yellow-600 focus:ring-yellow-600"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
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
                              <FormLabel className="text-gray-700 text-sm font-medium">Telefon (optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="tel"
                                  placeholder="0123 456789" 
                                  className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl focus:border-yellow-600 focus:ring-yellow-600"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="service"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 text-sm font-medium">Interesse</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-white border-gray-200 text-gray-900 h-12 rounded-xl focus:border-yellow-600 focus:ring-yellow-600">
                                    <SelectValue placeholder="Bitte auswählen..." />
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
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 text-sm font-medium">Ihre Nachricht (optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Teilen Sie uns gerne weitere Details zu Ihrem Projekt mit..." 
                                className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 resize-none min-h-24 rounded-xl focus:border-yellow-600 focus:ring-yellow-600"
                                rows={4}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-4">
                        <Button 
                          type="submit" 
                          className="w-full gold-bg hover:bg-yellow-700 text-white font-serif font-bold py-4 text-lg rounded-xl transition-all duration-300"
                          disabled={contactMutation.isPending}
                        >
                          {contactMutation.isPending ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Nachricht wird gesendet...
                            </>
                          ) : contactMutation.isSuccess ? (
                            <>
                              <CheckCircle className="w-5 h-5 mr-2" />
                              Erfolgreich gesendet!
                            </>
                          ) : (
                            <>
                              <Calendar className="w-5 h-5 mr-2" />
                              Persönliches Gespräch vereinbaren
                            </>
                          )}
                        </Button>
                        
                        <p className="text-sm text-gray-600 text-center mt-4 leading-relaxed">
                          <ShieldCheck className="w-4 h-4 mr-1 inline gold-accent" />
                          Ihre Daten werden streng vertraulich behandelt. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                        </p>
                      </div>
                    </form>
                  </Form>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} id="faq" className="py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-5xl lg:text-6xl font-serif text-gray-900 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={faqInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Expertenwissen auf einen <span className="gold-accent">Blick</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Die wichtigsten Antworten zu Premium-Reinigungsstandards und maßgeschneiderten Unternehmenslösungen
            </motion.p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "Welche Branchen und Gebäudetypen betreuen Sie?",
                answer: "Wir sind spezialisiert auf Großkunden aus allen Branchen: Bürokomplexe, Industrieanlagen, Einzelhandel, Gesundheitswesen, Bildungseinrichtungen und öffentliche Gebäude. Unser Portfolio umfasst Unterhaltsreinigung, Industriereinigung, Fensterreinigung mit Osmose-Technik, Grundreinigung und Bauschlussreinigung - alles nach zertifizierten ISO-Standards."
              },
              {
                question: "Wie läuft Ihre Angebotsstellung für Großprojekte ab?",
                answer: "Unsere Geschäftsführung führt eine detaillierte Bedarfsanalyse vor Ort durch. Sie erhalten ein präzises Angebot nach Industriestandards mit transparenter Kostenaufstellung, flexiblen Vertragsmodellen und maßgeschneiderten Service-Level-Agreements. Kompletter Prozess kostenfrei und unverbindlich."
              },
              {
                question: "In welchen Regionen sind Sie deutschlandweit aktiv?",
                answer: "Über 15 strategische Standorte ermöglichen deutschlandweite Betreuung. Schwerpunkte: NRW (Moers, Düsseldorf, Köln, Ruhrgebiet), Norddeutschland (Hamburg, Bremen) und sukzessive Expansion. Für Großkunden mit mehreren Standorten bieten wir einheitliche Standards und zentrale Projektsteuerung."
              },
              {
                question: "Welche Zertifizierungen und Qualitätsgarantien bieten Sie?",
                answer: "ISO 9001 Qualitätsmanagement, vollständige Betriebshaftpflicht- und Sachversicherung, geschulte Fachkräfte mit regelmäßigen Weiterbildungen. Modernste Reinigungstechnik und ökologische Reinigungsmittel. Kontinuierliche Qualitätskontrollen und 24h-Notfallservice für Großkunden."
              },
              {
                question: "Welche Vertragsmodelle bieten Sie für Unternehmen?",
                answer: "Maßgeschneiderte Rahmenverträge für Großkunden mit flexiblen Laufzeiten und Service-Level-Agreements. Von täglicher Unterhaltsreinigung bis zu projektbasierten Sonderleistungen. Zentrale Rechnungsstellung, einheitliche Ansprechpartner und attraktive Mengenrabatte bei mehreren Standorten."
              },
              {
                question: "Arbeiten Sie auch außerhalb der Geschäftszeiten?",
                answer: "Vollständig versichert mit allen Gewerbegenehmigungen. Reinigungen außerhalb regulärer Zeiten, Wochenenden und Feiertage sind Standard für Geschäftskunden. 24/7-Notfallservice verfügbar. Sicherheitsschulungen für Zugang zu sensiblen Bereichen und Zusammenarbeit mit Sicherheitsdiensten."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={faqInView ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1 
                } : { 
                  opacity: 0, 
                  y: 30, 
                  scale: 0.95 
                }}
                transition={{ duration: 0.6, delay: 0.6 + (index * 0.1), ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  transition: { duration: 0.2 } 
                }}
                whileInView={{ opacity: 1, y: 0 }}
                className="group"
              >
                <details className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                  <summary className="cursor-pointer p-8 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300">
                    <h3 className="text-xl font-serif font-bold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full gold-bg flex items-center justify-center transition-transform duration-300 group-open:rotate-180">
                      <ChevronRight className="w-5 h-5 text-white transform rotate-90" />
                    </div>
                  </summary>
                  <div className="px-8 pb-8">
                    <div className="border-t border-gray-100 pt-6">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h4 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                Ihre Frage war nicht dabei?
              </h4>
              <p className="text-gray-600 mb-6 text-lg">
                Kein Problem! Rufen Sie uns an oder schreiben Sie uns – wir beantworten gerne alle Ihre Fragen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="tel:017634446399"
                  className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity duration-300"
                >
                  <Phone className="w-5 h-5" />
                  <span>0176 34446399</span>
                </a>
                <a 
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center space-x-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-gray-400 transition-colors duration-300 cursor-pointer"
                >
                  <Mail className="w-5 h-5" />
                  <span>Nachricht senden</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center border-t border-gray-700 pt-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary flex items-center justify-center rounded">
                <Crown className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-white">Grema Gebäudeservice GmbH</h3>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Professionelle Gebäudereinigung in Moers seit 2014. 
              Geschäftsführerinnen: Tanja Scheurenberg & Ivana Grejic
            </p>
            
            <div className="flex justify-center items-center space-x-8 text-gray-400 text-sm mb-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:017634446399" className="hover:text-white transition-colors">0176/3444 6399</a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Moers, NRW</span>
              </div>
            </div>
            
            <div className="text-gray-500 text-sm">
              <p>&copy; 2025 Grema Gebäudeservice GmbH. Alle Rechte vorbehalten.</p>
              <div className="flex justify-center space-x-6 mt-3">
                <a href="#" className="hover:text-white transition-colors">Impressum</a>
                <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
                <a href="#" className="hover:text-white transition-colors">AGB</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Phone Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.a
          href="tel:017634446399"
          className="flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
          whileHover={{ 
            scale: 1.1, 
            rotate: [0, -10, 10, 0],
            transition: { duration: 0.4 } 
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <Phone className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
          
          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-30 animate-ping"></div>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Jetzt anrufen: 0176 34446399
            <div className="absolute top-1/2 -right-1 w-2 h-2 bg-gray-900 rotate-45 transform -translate-y-1/2"></div>
          </div>
        </motion.a>
      </motion.div>
    </div>
  );
}
