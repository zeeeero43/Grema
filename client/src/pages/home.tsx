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
import { StaticReviews } from "../components/StaticReviews";
import { insertContactInquirySchema, type InsertContactInquiry } from "@shared/schema";
import { Link } from "wouter";
import { Header } from "../components/Header";
import heroImage from "@assets/view-professional-cleaning-service-person-holding-supplies_1753726946244.jpg";

export default function Home() {
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
      title: "Unterhaltsreinigung",
      description: "Saubere und hygienische Arbeitsplätze. Desinfektion von Geräten und gemeinsamen Bereichen mit umweltfreundlichen Reinigungsmitteln.",
      href: "/unterhaltsreinigung",
      icon: "🏢"
    },
    {
      image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Glas- & Rahmenreinigung",
      description: "Streifenfreie Reinigung für alle Höhen und Schwierigkeitsgrade. Verlängert die Lebensdauer Ihrer Fenster durch regelmäßige professionelle Reinigung.",
      href: "/glas-rahmenreinigung",
      icon: "🪟"
    },
    {
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Sonderreinigung",
      description: "Entfernung hartnäckiger Verschmutzungen und Graffitis. Reinigung mit hochwertigen Geräten auch an schwer zugänglichen Flächen.",
      href: "/sonderreinigung",
      icon: "⚡"
    },
    {
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Bauabschlussreinigung",
      description: "Professionelle Grob- und Feinreinigung nach Umbau oder Neubau. Entfernung von Mörtelresten, Bauschutt und Verpackungsmaterialien.",
      href: "/bauabschlussreinigung",
      icon: "🏗️"
    },
    {
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Entrümpelung",
      description: "Haushaltsauflösung und Nachlassräumung mit langjähriger Erfahrung. Faires Preis-Leistungsverhältnis und professionelle Organisation.",
      href: "/entruempelung",
      icon: "🚛"
    },
    {
      image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Treppenhausreinigung",
      description: "Gründliche Reinigung von Treppenhäusern und Fluren. Sorgfältige Reinigung von Handläufen, Treppenstufen und schwer zugänglichen Bereichen.",
      href: "/treppenhausreinigung",
      icon: "🏢"
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
      <Header currentPage="home" />


      {/* Hero Section - Classical Layout with Image */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Reinigungsservice<br />
                für Moers und Umgebung
              </h2>
              
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Seit 2014 vertrauen Unternehmen in Moers auf unsere zuverlässigen 
                Reinigungsdienstleistungen. Professionell, termintreu und mit 
                höchsten Qualitätsstandards.
              </p>
              
              <div className="flex flex-col gap-3 sm:gap-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-primary text-white hover:bg-primary/90 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold transition-colors"
                >
                  <a href="tel:017634446399" className="flex items-center justify-center">
                    <Phone className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                    Jetzt anrufen: 0176 34446399
                  </a>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold transition-colors"
                >
                  <a href="#contact" className="flex items-center justify-center">
                    <Mail className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                    Kostenlose Beratung
                  </a>
                </Button>
              </div>
            </motion.div>
            
            {/* Right Column - Professional Image */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <img 
                  src={heroImage}
                  alt="Professioneller Reinigungsservice - Grema Gebäudeservice"
                  className="w-full h-[300px] sm:h-[400px] lg:h-[450px] object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-primary/10 rounded-lg"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Section - Simple Grid with Animations */}
      <section ref={servicesRef} id="services" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={servicesInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Unsere Leistungen
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professionelle Reinigungsdienstleistungen für Unternehmen, Praxen und Gewerbeobjekte
            </p>
          </motion.div>
          
          {/* Simple Service Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ y: 50, opacity: 0 }}
                animate={servicesInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <Button asChild
                    size="sm"
                    className="bg-primary text-white hover:bg-primary/90 transition-colors"
                  >
                    <Link href={service.href}>Mehr erfahren</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section - Clean Two Column */}
      <section ref={aboutRef} id="about" className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={aboutInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Warum uns 500+ Unternehmen vertrauen
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Mit 15 Jahren Erfahrung in der professionellen Gebäudereinigung sind wir Ihr 
                zuverlässiger Partner für höchste Sauberkeitsstandards in Moers und deutschlandweit.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <motion.div 
                  initial={{ y: 30, opacity: 0 }}
                  animate={aboutInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <Shield className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">ISO-Zertifiziert</h3>
                  <p className="text-sm text-gray-600">Qualitätsstandards nach DIN ISO 9001</p>
                </motion.div>
                <motion.div 
                  initial={{ y: 30, opacity: 0 }}
                  animate={aboutInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <Users className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Geschulte Teams</h3>
                  <p className="text-sm text-gray-600">Regelmäßige Weiterbildung und Zertifizierung</p>
                </motion.div>
                <motion.div 
                  initial={{ y: 30, opacity: 0 }}
                  animate={aboutInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <Clock className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Termingenau</h3>
                  <p className="text-sm text-gray-600">Pünktlich und zuverlässig seit 2014</p>
                </motion.div>
                <motion.div 
                  initial={{ y: 30, opacity: 0 }}
                  animate={aboutInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <Leaf className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Umweltfreundlich</h3>
                  <p className="text-sm text-gray-600">Nachhaltige Reinigungsmittel</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={aboutInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg p-8 border shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Kostenlose Beratung</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-primary" />
                  <span className="text-gray-700">Kostenlose Beratung und Angebotserstellung</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-primary" />
                  <span className="text-gray-700">Antwort innerhalb von 24 Stunden</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-primary" />
                  <span className="text-gray-700">Flexible Vertragsgestaltung</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-primary" />
                  <span className="text-gray-700">Qualitätsgarantie bei allen Leistungen</span>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">5.0 ⭐</div>
                  <div className="text-sm text-gray-600">Google Bewertung</div>
                  <div className="text-sm text-gray-600">15 Kundenbewertungen</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section - Clean Simple Steps */}
      <section ref={processRef} id="process" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              So einfach geht's
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              In nur 3 Schritten zu professioneller Gebäudereinigung
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kostenlose Beratung</h3>
              <p className="text-gray-600 leading-relaxed">
                Rufen Sie uns an oder schreiben Sie uns. Wir beraten Sie gerne kostenlos 
                und unverbindlich zu Ihren Reinigungsanforderungen.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Angebot erhalten</h3>
              <p className="text-gray-600 leading-relaxed">
                Sie erhalten innerhalb von 24 Stunden ein detailliertes und 
                transparentes Angebot, zugeschnitten auf Ihre Bedürfnisse.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Professionelle Reinigung</h3>
              <p className="text-gray-600 leading-relaxed">
                Unser geschultes Team führt die Reinigung termingerecht und 
                nach höchsten Qualitätsstandards durch.
              </p>
            </div>
          </div>

          {/* Simple CTA */}
          <div className="text-center mt-12">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary text-white hover:bg-primary/90 px-8 py-3 text-lg"
            >
              <a href="tel:017634446399" className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Jetzt anrufen: 0176 34446399
              </a>
            </Button>
          </div>
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
        <StaticReviews />
      </motion.div>

      {/* Contact Section - Clean Professional */}
      <section ref={contactRef} id="contact" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Kontakt aufnehmen
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Haben Sie Fragen oder benötigen Sie ein Angebot? Wir sind gerne für Sie da.
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
                                type="tel"
                                placeholder="0123 456789" 
                                className="border-gray-300 focus:border-primary focus:ring-primary"
                                {...field}
                                value={field.value || ""}
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
                                  <SelectValue placeholder="Bitte auswählen..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="unterhaltsreinigung">Unterhaltsreinigung</SelectItem>
                                <SelectItem value="glas-rahmenreinigung">Glas- & Rahmenreinigung</SelectItem>
                                <SelectItem value="sonderreinigung">Sonderreinigung</SelectItem>
                                <SelectItem value="bauabschlussreinigung">Bauabschlussreinigung</SelectItem>
                                <SelectItem value="entruempelung">Entrümpelung</SelectItem>
                                <SelectItem value="treppenhausreinigung">Treppenhausreinigung</SelectItem>
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

      {/* FAQ Section - Clean Simple */}
      <section ref={faqRef} id="faq" className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Häufige Fragen
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Antworten auf die wichtigsten Fragen zu unseren Reinigungsdienstleistungen
            </p>
          </div>

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
              <div key={index} className="bg-white rounded-lg shadow-sm border">
                <details className="group">
                  <summary className="cursor-pointer p-6 flex items-center justify-between hover:bg-gray-50">
                    <h3 className="font-bold text-gray-900">
                      {faq.question}
                    </h3>
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center transition-transform group-open:rotate-180">
                      <ChevronRight className="w-4 h-4 text-white transform rotate-90" />
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </details>
              </div>
            ))}
          </div>

          {/* Simple CTA */}
          <div className="text-center mt-12">
            <div className="bg-gray-50 rounded-lg p-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Weitere Fragen?
              </h4>
              <p className="text-gray-600 mb-6">
                Rufen Sie uns an oder schreiben Sie uns – wir helfen gerne weiter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-primary text-white hover:bg-primary/90">
                  <a href="tel:017634446399" className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    0176 34446399
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  asChild 
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <a href="#contact" className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Nachricht senden
                  </a>
                </Button>
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
                <a href="#" className="hover:text-white">Impressum</a>
                <a href="#" className="hover:text-white">Datenschutz</a>
                <a href="#" className="hover:text-white">AGB</a>
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
