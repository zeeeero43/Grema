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
import { Phone, Mail, CheckCircle, Droplets, Shield, Clock, Users, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function GlasRahmenreinigung() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertContactInquiry>({
    resolver: zodResolver(insertContactInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "Glas- & Rahmenreinigung",
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
      <Header currentPage="glas-rahmenreinigung" />
      
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Glas- & Rahmenreinigung
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Mit unserer Glasreinigung sorgen wir für klare Sicht und einen positiven ersten Eindruck. Unsere Fachkräfte reinigen Fenster in allen Höhen und Schwierigkeitsgraden, sowohl innen als auch außen.
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
                src="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Professionelle Glas- und Rahmenreinigung"
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
              Streifenfreie Ergebnisse garantiert
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Wir verwenden spezielle Techniken und Werkzeuge, um Streifen und Rückstände zu vermeiden. 
              Regelmäßige Fensterreinigung trägt nicht nur zur Ästhetik bei, sondern verlängert auch die Lebensdauer Ihrer Fenster.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Droplets className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Streifenfreie Reinigung</h3>
              <p className="text-gray-600">
                Moderne Techniken und spezialisierte Werkzeuge für perfekte Ergebnisse ohne Streifen oder Rückstände.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Für alle Höhen geeignet</h3>
              <p className="text-gray-600">
                Professionelle Reinigung auch in schwierigen Bereichen und großen Höhen mit entsprechender Sicherheitsausrüstung.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verlängert Fensterlebensdauer</h3>
              <p className="text-gray-600">
                Regelmäßige professionelle Reinigung schützt vor Beschädigungen und spart langfristig Kosten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Unser Reinigungsprozess
            </h2>
            <p className="text-lg text-gray-600">
              Professionell ausgebildete Fachkräfte mit langjähriger Erfahrung
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bestandsaufnahme</h3>
              <p className="text-gray-600">
                Begutachtung der zu reinigenden Flächen und Festlegung der optimalen Reinigungsmethode.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Professionelle Reinigung</h3>
              <p className="text-gray-600">
                Einsatz spezieller Techniken und Werkzeuge für streifenfreie Ergebnisse an allen Glasflächen.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Nachkontrolle</h3>
              <p className="text-gray-600">
                Sorgfältige Überprüfung aller gereinigten Flächen und Nachbearbeitung bei Bedarf.
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
              Lassen Sie sich unverbindlich beraten und erhalten Sie ein maßgeschneidertes Angebot für Ihre Glas- und Rahmenreinigung.
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
                      <FormLabel className="text-gray-700 font-medium">Nachricht</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Beschreiben Sie kurz Ihr Anliegen (Objektgröße, Reinigungsintervall, besondere Anforderungen...)"
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