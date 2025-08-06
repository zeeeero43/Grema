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
import { Phone, Mail, CheckCircle, Shield, Clock, Users, ArrowRight, Building } from "lucide-react";
import { Link } from "wouter";

export default function Treppenhausreinigung() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertContactInquiry>({
    resolver: zodResolver(insertContactInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "Treppenhausreinigung",
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
      <Header currentPage="treppenhausreinigung" />
      
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Treppenhausreinigung
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Unsere Treppenhausreinigung bietet eine gründliche Reinigung von Treppenhäusern und Fluren, um ein sauberes und einladendes Wohn- oder Arbeitsumfeld zu gewährleisten. 
                Wir reinigen Handläufe, Treppenstufen, Aufzüge und Geländer sorgfältig und entfernen Schmutz und Staub aus schwer zugänglichen Bereichen.
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
                src="https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Professionelle Treppenhausreinigung"
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
              Sicherheit und Hygiene für stark frequentierte Bereiche
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Regelmäßige Reinigungen sorgen für Sicherheit und Hygiene in stark frequentierten Bereichen. 
              Unser Service passt sich Ihren Bedürfnissen an, sei es für Wohngebäude oder Geschäftsräume.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sorgfältige Reinigung</h3>
              <p className="text-gray-600">
                Professionelle Reinigung aller Bereiche inklusive Handläufe, Treppenstufen, Aufzüge und Geländer.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Building className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Schwer zugängliche Bereiche</h3>
              <p className="text-gray-600">
                Entfernung von Schmutz und Staub auch aus schwer erreichbaren Ecken und Winkeln.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Anpassbar für alle Bereiche</h3>
              <p className="text-gray-600">
                Flexibler Service sowohl für Wohngebäude als auch für Geschäfts- und Büroräume.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Unsere Reinigungsbereiche
            </h2>
            <p className="text-lg text-gray-600">
              Umfassende Treppenhausreinigung für verschiedene Gebäudetypen
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-2">Wohngebäude</h3>
              <p className="text-sm text-gray-600">
                Mehrfamilienhäuser, Wohnanlagen und Eigentümergemeinschaften
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-2">Bürogebäude</h3>
              <p className="text-sm text-gray-600">
                Geschäftshäuser, Bürokomplexe und Verwaltungsgebäude
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-2">Praxisgebäude</h3>
              <p className="text-sm text-gray-600">
                Arztpraxen, Kliniken und medizinische Zentren
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-2">Gewerbeobjekte</h3>
              <p className="text-sm text-gray-600">
                Einkaufszentren, Hotels und öffentliche Gebäude
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl p-8 shadow-sm border">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Was wir reinigen</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span>Handläufe und Geländer</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span>Treppenstufen und Podeste</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span>Aufzüge innen und außen</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span>Eingangsbereiche und Foyers</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span>Fenster und Glasflächen</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span>Briefkastenanlagen</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span>Keller- und Dachgeschossbereiche</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span>Müllbereiche und Kellerflure</span>
                  </li>
                </ul>
              </div>
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
              Erhalten Sie ein maßgeschneidertes Angebot für die regelmäßige Reinigung Ihres Treppenhauses.
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
                          placeholder="Beschreiben Sie Ihr Gebäude (Anzahl Etagen, Wohneinheiten, gewünschte Reinigungsintervalle...)"
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