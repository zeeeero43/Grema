import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Header } from "../components/Header";
import { insertContactInquirySchema, type InsertContactInquiry } from "@shared/schema";
import { Phone, Mail, CheckCircle, Zap, Shield, Settings, Users, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Sonderreinigung() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertContactInquiry>({
    resolver: zodResolver(insertContactInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "Sonderreinigung",
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
      setIsSubmitting(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler beim Senden",
        description: "Bitte versuchen Sie es später erneut oder rufen Sie uns direkt an.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: InsertContactInquiry) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="sonderreinigung" />
      
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Sonderreinigung
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Die Sonderreinigung umfasst alle Arten von Reinigungsdiensten, die über eine übliche Unterhalts- und Glasreinigung hinausgehen. 
                Dazu gehören zum Beispiel die Reinigung von starken und hartnäckigen Verschmutzungen, Graffitis oder die Reinigung von Anlagen mit besonderen Hygienevorschriften.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
                  <a href="tel:017634446399" className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Jetzt anrufen
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  <a href="#contact" className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Kostenlose Beratung
                  </a>
                </Button>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Professionelle Sonderreinigung"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Details */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Spezialisiert auf schwierige Reinigungsaufgaben
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Lassen Sie sich gerne unverbindlich beraten. Unsere Experten finden für jede Herausforderung die passende Lösung.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hartnäckige Verschmutzungen</h3>
              <p className="text-gray-600">
                Professionelle Entfernung von starken Verschmutzungen, Graffitis und anderen hartnäckigen Verunreinigungen.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Settings className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hochwertige Geräte</h3>
              <p className="text-gray-600">
                Modernste Reinigungsgeräte und umweltfreundliche Reinigungsmittel für optimale Ergebnisse.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Schwer zugängliche Flächen</h3>
              <p className="text-gray-600">
                Spezialisierte Reinigung auch an schwer erreichbaren Stellen mit entsprechender Sicherheitsausrüstung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Applications */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Anwendungsbereiche
            </h2>
            <p className="text-lg text-gray-600">
              Vielseitige Sonderreinigung für verschiedenste Anforderungen
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-2">Graffiti-Entfernung</h3>
              <p className="text-sm text-gray-600">
                Schonende Entfernung von Graffitis ohne Beschädigung der Oberfläche
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-2">Hygienereinigung</h3>
              <p className="text-sm text-gray-600">
                Spezielle Reinigung nach besonderen Hygienevorschriften
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-2">Industriereinigung</h3>
              <p className="text-sm text-gray-600">
                Reinigung von Produktionsanlagen und Industriebereichen
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-2">Notfallreinigung</h3>
              <p className="text-sm text-gray-600">
                Schnelle Hilfe bei außergewöhnlichen Verschmutzungen
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kostenloses Angebot anfordern
            </h2>
            <p className="text-lg text-gray-600">
              Schildern Sie uns Ihr Reinigungsproblem - wir finden die passende Lösung für Ihre Sonderreinigung.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
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
                            {...field}
                            placeholder="Ihr vollständiger Name"
                            className="bg-white border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
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
                            {...field}
                            type="email"
                            placeholder="ihre.email@beispiel.de"
                            className="bg-white border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Telefon (optional)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          type="tel"
                          placeholder="Ihre Telefonnummer für Rückfragen"
                          className="bg-white border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Beschreibung der Reinigungsaufgabe</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Beschreiben Sie detailliert Art und Umfang der benötigten Sonderreinigung..."
                          rows={4}
                          className="bg-white border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="flex-1 bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
                  >
                    {isSubmitting ? "Wird gesendet..." : "Angebot anfordern"}
                    {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2" />}
                  </Button>
                  
                  <Button asChild size="lg" variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-white">
                    <a href="tel:017634446399" className="flex items-center justify-center">
                      <Phone className="w-5 h-5 mr-2" />
                      Sofort anrufen
                    </a>
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Direkter Kontakt</h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-2 text-primary" />
                <span className="font-medium">0176 34446399</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-2 text-primary" />
                <span className="font-medium">info@grema-gebaeudeservice.de</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}