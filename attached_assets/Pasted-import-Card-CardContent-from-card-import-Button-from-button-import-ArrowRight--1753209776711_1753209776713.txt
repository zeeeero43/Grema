import { Card, CardContent } from "./card";
import { Button } from "./button";
import { ArrowRight, Star, ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import industriereinigungImage from "@assets/professioneller-industriereiniger-im-einheitlichen-schutzboden-der-lebensmittelverarbeitungsanlage-min_1752416442442.jpg";
import bauschlussreinigungImage from "@assets/mannlicher-arbeiter-der-auf-der-baustelle-eine-betonestrichmaschine-verwendet-min_1752416454977.jpg";
import bueroreinigungImage from "@assets/mittlere-aufnahme-von-menschen-die-gebaude-reinigen-min_1752416458056.jpg";
import grundreinigungImage from "@assets/professional-cleaning-service-person-using-steam-cleaner-office-min_1752625794454.jpg";
import fensterreinigungImage from "@assets/mittlere-aufnahme-von-menschen-die-gebaude-reinigen (1)-min (1)_1752416463220.jpg";

const services = [
  {
    image: bueroreinigungImage,
    title: "Unterhalts- & Gewerbereinigung",
    description: "Regelmäßige Reinigung für Büros, Praxen und Geschäfte. Flexible Zeiten und individuelle Reinigungspläne.",
    href: "/services/unterhaltsreinigung",
    icon: "🏢"
  },
  {
    image: grundreinigungImage,
    title: "Grundreinigung",
    description: "Tiefenreinigung für Wohnungen, Büros und Gewerbe. Professionelle Dampfreinigung für makellose Sauberkeit.",
    href: "/services/grundreinigung",
    icon: "✨"
  },
  {
    image: fensterreinigungImage,
    title: "Fenster- & Glasreinigung",
    description: "Streifenfreie Ergebnisse durch Osmose-Technik und professionelle Steiger-Ausrüstung. Auch schwer erreichbare Bereiche.",
    href: "/services/fensterreinigung",
    icon: "🪟"
  },
  {
    image: industriereinigungImage,
    title: "Industriereinigung",
    description: "Maschinenreinigung, Produktionsanlagen, Chemie-/Säurebehandlungen. Hochdruck- und Heißreinigung für optimale Betriebseffizienz.",
    href: "/services/industriereinigung",
    icon: "🏭"
  },
  {
    image: bauschlussreinigungImage,
    title: "Bauschlussreinigung",
    description: "Komplette Bauschlussreinigung inklusive Wertstofftrennung und fachgerechter Entsorgung. Übergabebereit in kürzester Zeit.",
    href: "/services/bauschlussreinigung",
    icon: "🏗️"
  }
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, rotateX: -15 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-[hsl(220,13%,97%)] relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[hsl(187,96%,43%)]/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-[hsl(213,78%,32%)]/5 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-[hsl(213,78%,32%)] mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="inline-block">Unsere</span>{" "}
            <span className="gradient-text inline-block">Dienstleistungen</span>
            <motion.div
              className="inline-block ml-2"
              animate={{ 
                rotate: [0, 20, -20, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4,
                delay: 1
              }}
            >
              <Star className="w-8 h-8 text-yellow-400" />
            </motion.div>
          </motion.h2>
          <motion.p 
            className="text-xl text-[hsl(220,9%,43%)] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Professionelle Gebäudereinigung für jeden Bedarf - von der Industrie bis zum Büro
          </motion.p>
        </motion.div>
        
        {/* Desktop Carousel Layout */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Navigation Buttons */}
            <Button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-[hsl(213,78%,32%)] rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300"
              size="sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <Button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-[hsl(213,78%,32%)] rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300"
              size="sm"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Carousel Container */}
            <div className="mx-12 overflow-hidden">
              <div className="flex gap-8 transition-transform duration-500 ease-in-out">
                {[...services, ...services].map((service, index) => {
                  const actualIndex = index % services.length;
                  const isVisible = index >= currentIndex && index < currentIndex + 4;
                  
                  return (
                    <motion.div
                      key={`${service.title}-${index}`}
                      variants={cardVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      className={`flex-shrink-0 w-80 hover:scale-102 hover:-translate-y-1 transition-transform ${
                        isVisible ? 'block' : 'hidden'
                      }`}
                      style={{ 
                        transform: `translateX(-${currentIndex * 100}%)`,
                        transition: isTransitioning ? 'none' : 'transform 0.5s ease-in-out'
                      }}
                    >
                      <div className="relative h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(213,78%,32%)]/80 via-[hsl(213,78%,32%)]/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                        
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-transform duration-300 group-hover:translate-y-0">
                          <h3 className="text-xl font-bold mb-2 transition-all duration-300 group-hover:text-yellow-300">
                            {service.title}
                          </h3>
                          <p className="text-sm opacity-90 mb-4 leading-relaxed transition-opacity duration-300 group-hover:opacity-100">
                            {service.description}
                          </p>
                          <Link href={service.href}>
                            <Button 
                              className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/40 group-hover:scale-102"
                              size="sm"
                            >
                              Mehr Infos <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
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
                      ? 'bg-[hsl(187,96%,43%)] scale-125' 
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
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex-shrink-0 w-80 snap-start"
              >
                <div className="relative h-96 rounded-xl overflow-hidden shadow-lg group">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(213,78%,32%)]/80 via-[hsl(213,78%,32%)]/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-transform duration-300 group-hover:translate-y-0">
                    <h3 className="text-xl font-bold mb-2 transition-all duration-300 group-hover:text-yellow-300">
                      {service.title}
                    </h3>
                    <p className="text-sm opacity-90 mb-4 leading-relaxed transition-opacity duration-300 group-hover:opacity-100">
                      {service.description}
                    </p>
                    <Link href={service.href}>
                      <Button 
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/40 group-hover:scale-102"
                        size="sm"
                      >
                        Mehr Infos <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}