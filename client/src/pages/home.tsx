import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
import useEmblaCarousel from 'embla-carousel-react';
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
  
  // Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });

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

  const cleaningServices = [
    {
      title: "Unterhaltsreinigung & Gewerbereinigung",
      description: "Regelmäßige Reinigung für Büros, Praxen und Geschäfte. Perfekte Sauberkeit und individuelle Reinigungspläne.",
      icon: Building2,
      image: "office-cleaning"
    },
    {
      title: "Grundreinigung",
      description: "Tiefenreinigung für Wohnungen, Büros und Gewerbe. Intensive Dampfreinigung für makellose Sauberkeit.",
      icon: Droplets,
      image: "deep-cleaning"
    },
    {
      title: "Fenster- & Glasreinigung",
      description: "Streifenfreie Ergebnisse bei Fenstern, Glasfassaden. Technik und professionelle Steiger. Auch schwer erreichbare Bereiche.",
      icon: Sparkles,
      image: "window-cleaning"
    },
    {
      title: "Industriereinigung",
      description: "Maschinen Reinigung, Produktionsanlagen, Chemie Anlagentechnik und Hochdruckreinigung für optimale Betriebshygiene.",
      icon: Zap,
      image: "industrial-cleaning"
    },
    {
      title: "Baureinigung",
      description: "Bauschlussreinigung, Baustellenreinigung und Rohbaureinigung. Perfekte Übergabe für Ihr neues Zuhause.",
      icon: Hammer,
      image: "construction-cleaning"
    },
    {
      title: "Haushaltsauflösung",
      description: "Komplette Entrümpelung und fachgerechte Entsorgung. Wir räumen auf und hinterlassen alles blitzeblank.",
      icon: Trash2,
      image: "household-dissolution"
    }
  ];

  const usps = [
    {
      title: "Streifenfrei seit 2014",
      subtitle: "1000+ glänzende Fenster in Moers",
      description: "Kristallklar, fleckenlos, porentief rein – wir haben uns das Vertrauen durch makelloses Arbeiten verdient."
    },
    {
      title: "Moers kennen wir blitzeblank",
      subtitle: "kurze Wege, persönlicher Service",
      description: "Wir sind echte Moerser. Wir kennen jeden Winkel der Stadt und machen ihn sauber."
    },
    {
      title: "Ein Team, ein Versprechen",
      subtitle: "Professionelle Reinigungsdienstleistung",
      description: "Blitzeblank oder nichts! Wir stehen persönlich dafür ein, dass alles perfekt sauber wird."
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
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
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
              <a href="#leistungen" className="text-gray-700 hover:gold-accent transition-colors font-medium">Leistungen</a>
              <a href="#ueber-uns" className="text-gray-700 hover:gold-accent transition-colors font-medium">Über uns</a>
              <a href="#referenzen" className="text-gray-700 hover:gold-accent transition-colors font-medium">Referenzen</a>
              <Button 
                asChild 
                className="anthracite-bg text-white hover:gold-shine font-bold px-8 py-3 text-lg sparkle-effect"
              >
                <a href="#kontakt">
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
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-6 py-4 space-y-4">
              <a href="#leistungen" className="block py-2 text-gray-700 hover:gold-accent transition-colors font-medium">Leistungen</a>
              <a href="#ueber-uns" className="block py-2 text-gray-700 hover:gold-accent transition-colors font-medium">Über uns</a>
              <a href="#referenzen" className="block py-2 text-gray-700 hover:gold-accent transition-colors font-medium">Referenzen</a>
              <Button asChild className="w-full anthracite-bg hover:gold-shine text-white font-bold mt-4 sparkle-effect">
                <a href="#kontakt">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Jetzt kostenlos anrufen!
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative crystal-bg min-h-[90vh] flex items-center">
        <div className="absolute inset-0 wipe-animation opacity-30"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 relative z-10">
          <div className="grid lg:grid-cols-3 gap-16 items-center">
            {/* Left Content - 2 columns */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-1 h-16 gold-shine sparkle-effect"></div>
                  <div className="text-sm tracking-wide text-gray-600 uppercase">
                    Seit 2014 • Blitzeblank in Moers
                  </div>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-serif leading-tight text-gray-900 mb-8">
                  <span className="sparkle-effect">Kristall</span><span className="gold-accent">klar</span><br />
                  <em className="font-normal">streifenfrei</em> sauber
                </h1>
                
                <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mb-10">
                  Wir machen sauber. Richtig sauber. Seit 10 Jahren verwandeln wir Büros, Praxen und Baustellen in 
                  <strong className="gold-accent"> blitzblanke Schmuckstücke</strong>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-6 sm:space-y-0 sm:space-x-12">
                <div className="glass-card p-4 rounded-lg clean-hover">
                  <div className="text-3xl font-serif font-bold text-gray-900">1000+</div>
                  <div className="text-sm text-gray-600">Glänzende Fenster</div>
                </div>
                <div className="glass-card p-4 rounded-lg clean-hover">
                  <div className="text-3xl font-serif font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Blitzblanke Büros</div>
                </div>
                <div className="glass-card p-4 rounded-lg clean-hover bubble-effect">
                  <div className="text-3xl font-serif font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-600">Flecken übrig</div>
                </div>
              </div>

              <div className="pt-8">
                <Button 
                  asChild 
                  size="lg" 
                  className="gold-shine hover:gold-shine text-white px-10 py-4 text-lg font-medium sparkle-effect"
                >
                  <a href="#kontakt">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Alles blitzeblank machen lassen
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative lg:col-span-1">
              <div className="aspect-[4/5] crystal-clear rounded-2xl overflow-hidden relative sparkle-effect">
                {/* Glass/Crystal background with cleaning reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-blue-50/50 to-yellow-50/30">
                  <div className="absolute inset-0 bg-gradient-to-t from-anthracite/10 to-transparent flex items-end p-8">
                    <div className="text-gray-800">
                      <Sparkles className="w-16 h-16 mb-4 gold-accent wipe-animation" />
                      <div className="text-lg font-serif font-bold">Kristallklar & Streifenfrei</div>
                      <div className="text-sm text-gray-600">Professionelle Reinigung • Moers</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Trust indicators */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 gold-bg rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Vollversichert</div>
                    <div className="text-sm text-gray-600">& Zertifiziert</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Carousel Section */}
      <section id="leistungen" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-6">
              Unsere <span className="gold-accent">Dienstleistungen</span> ⭐
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Professionelle Gebäudereinigung für jeden Bedarf – von der Industrie bis zum Büro
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {cleaningServices.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <div key={index} className="flex-[0_0_100%] min-w-0 px-3 md:flex-[0_0_50%] lg:flex-[0_0_33.33%]">
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                        {/* Service Image */}
                        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <IconComponent className="w-16 h-16 text-gray-600" />
                          </div>
                        </div>
                        
                        {/* Service Content */}
                        <div className="p-6 pb-8">
                          <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 leading-tight">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed text-sm mb-6">
                            {service.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <Button variant="ghost" size="sm" className="gold-accent hover:gold-accent/80 p-0 h-auto font-medium">
                              Mehr Infos <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Gold accent bar at bottom */}
                        <div className="h-1 gold-shine"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation buttons */}
            <Button 
              variant="outline" 
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg border-0 hover:bg-gray-50 z-10"
              onClick={() => emblaApi?.scrollPrev()}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg border-0 hover:bg-gray-50 z-10"
              onClick={() => emblaApi?.scrollNext()}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            {/* Dots indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {[...Array(6)].map((_, index) => (
                <button 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index < 3 ? 'gold-shine' : 'bg-gray-300'
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="ueber-uns" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl lg:text-6xl font-serif text-gray-900 mb-12 sparkle-effect">
                Warum sind wir so <span className="gold-accent">blitzeblank</span>?
              </h2>
              
              <div className="space-y-10">
                {usps.map((usp, index) => (
                  <div key={index} className="glass-card p-6 rounded-xl clean-hover sparkle-effect">
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{usp.title}</h3>
                    <p className="gold-accent text-lg font-medium mb-3">{usp.subtitle}</p>
                    <p className="text-gray-600 leading-relaxed text-lg">{usp.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="crystal-clear shadow-2xl rounded-2xl sparkle-effect">
                <div className="p-10">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">Die Sauberfrauen von Moers</h3>
                    <p className="text-gray-600">Ihre persönlichen Ansprechpartnerinnen</p>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Users className="w-16 h-16 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-serif font-bold text-gray-900">Tanja Scheurenberg</h4>
                        <p className="gold-accent font-medium mb-2">Geschäftsführerin</p>
                        <p className="text-sm text-gray-600">Kundenbetreuung & Operations</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Users className="w-16 h-16 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-serif font-bold text-gray-900">Ivana Grejic</h4>
                        <p className="gold-accent font-medium mb-2">Geschäftsführerin</p>
                        <p className="text-sm text-gray-600">Qualitätsmanagement & Projektleitung</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10 pt-8 border-t border-gray-200 text-center">
                    <Quote className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-700 italic text-lg">
                      „Über 10 Jahre Erfahrung in der professionellen Gebäudereinigung – 
                      Moers ist unser Zuhause."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="referenzen" className="py-32 crystal-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-serif text-gray-900 mb-8 sparkle-effect">
              So <span className="gold-accent">blitzeblank</span> arbeiten wir
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Unsere Kunden schwärmen von kristallklaren Ergebnissen</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card border-0 shadow-lg clean-hover sparkle-effect">
                <div className="p-8">
                  <Sparkles className="w-12 h-12 gold-accent mb-6 bubble-effect" />
                  <p className="text-gray-700 mb-8 leading-relaxed text-lg italic">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t border-white/20 pt-6">
                    <div className="mb-2">
                      <p className="font-serif font-bold text-gray-900 text-lg">{testimonial.author}</p>
                      <p className="text-gray-600 font-medium">{testimonial.company}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{testimonial.location}</span>
                      <span className="gold-accent font-medium">{testimonial.years}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-32 anthracite-bg text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-serif text-white mb-8 sparkle-effect">
              Alles <span className="gold-accent">blitzeblank</span> machen lassen?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Sprechen Sie direkt mit unserem Team. Kostenlos, unverbindlich, und garantiert kristallklar.</p>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h3 className="text-3xl font-serif font-bold text-white mb-8">Direkte Kontaktaufnahme</h3>
                
                <div className="space-y-6">
                  <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-start space-x-4">
                      <div className="gold-bg p-3 rounded-full flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-300 text-sm mb-2">Sprechen Sie direkt mit uns:</p>
                        <a href="tel:017634446399" className="text-2xl font-serif font-bold text-white hover:gold-accent transition-colors block">
                          0176 / 3444 6399
                        </a>
                        <p className="text-gray-400 text-sm mt-2">Mo-Fr: 8:00-18:00 Uhr • Sa: 9:00-14:00 Uhr</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-start space-x-4">
                      <div className="gold-bg p-3 rounded-full flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-300 text-sm mb-2">Unser Standort:</p>
                        <p className="text-xl font-serif font-bold text-white">Moers & Umgebung</p>
                        <p className="text-gray-400 text-sm">Nordrhein-Westfalen</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 p-6 bg-yellow-600/20 rounded-2xl border border-yellow-600/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle className="w-6 h-6 gold-accent" />
                    <h4 className="text-lg font-serif font-bold text-white">Kostenlose Erstberatung</h4>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Tanja und Ivana nehmen sich persönlich Zeit für Sie. Unverbindlich und kostenfrei.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="crystal-clear shadow-2xl sparkle-effect">
                <div className="p-10">
                  <h3 className="text-3xl font-serif font-bold text-white mb-8">Gespräch vereinbaren</h3>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300 text-sm font-medium">Vollständiger Name *</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Max Mustermann" 
                                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 focus:border-yellow-600 focus:ring-yellow-600"
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
                              <FormLabel className="text-gray-300 text-sm font-medium">E-Mail Adresse *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder="m.mustermann@beispiel.de" 
                                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 focus:border-yellow-600 focus:ring-yellow-600"
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
                              <FormLabel className="text-gray-300 text-sm font-medium">Telefon (optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="tel"
                                  placeholder="0123 456789" 
                                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 focus:border-yellow-600 focus:ring-yellow-600"
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
                              <FormLabel className="text-gray-300 text-sm font-medium">Interesse</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-white/10 border-white/20 text-white h-12 focus:border-yellow-600 focus:ring-yellow-600">
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
                            <FormLabel className="text-gray-300 text-sm font-medium">Ihre Nachricht (optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Teilen Sie uns gerne weitere Details zu Ihrem Projekt mit..." 
                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 resize-none min-h-24 focus:border-yellow-600 focus:ring-yellow-600"
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
                          className="w-full gold-bg hover:bg-yellow-700 text-white font-serif font-bold py-4 text-lg transition-all duration-300"
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
                        
                        <p className="text-sm text-gray-400 text-center mt-4 leading-relaxed">
                          <ShieldCheck className="w-4 h-4 mr-1 inline gold-accent" />
                          Ihre Daten werden streng vertraulich behandelt. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                        </p>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center border-t border-gray-700 pt-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 anthracite-bg flex items-center justify-center">
                <Crown className="w-4 h-4 gold-accent" />
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
                <Phone className="w-4 h-4 gold-accent" />
                <a href="tel:017634446399" className="hover:text-white transition-colors">0176/3444 6399</a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 gold-accent" />
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
    </div>
  );
}
