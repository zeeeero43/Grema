// Lokale Geschäftsinformationen als strukturierte Daten für bessere lokale SEO

import { useEffect } from 'react';

interface LocalBusinessInfoProps {
  pageName: string;
}

export function LocalBusinessInfo({ pageName }: LocalBusinessInfoProps) {
  useEffect(() => {
    // Lokale Geschäftsdaten in strukturierter Form
    const localBusinessData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Grema Gebäudeservice GmbH",
      "description": "Professioneller Gebäudereinigungsservice in Moers. Spezialisiert auf Unterhaltsreinigung, Fensterreinigung, Bauabschlussreinigung und Entrümpelung.",
      "url": "http://212.227.103.141",
      "telephone": "+49-2841-123456",
      "email": "info@grema-service.de",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Musterstraße 123",
        "addressLocality": "Moers",
        "addressRegion": "Nordrhein-Westfalen",
        "postalCode": "47441",
        "addressCountry": "DE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "51.4508",
        "longitude": "6.6261"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday", 
          "opens": "09:00",
          "closes": "14:00"
        }
      ],
      "areaServed": [
        {
          "@type": "City",
          "name": "Moers",
          "@id": "https://www.wikidata.org/wiki/Q3055"
        },
        {
          "@type": "City",
          "name": "Duisburg",
          "@id": "https://www.wikidata.org/wiki/Q2100"
        },
        {
          "@type": "City",
          "name": "Krefeld",
          "@id": "https://www.wikidata.org/wiki/Q2656"
        },
        {
          "@type": "City",
          "name": "Düsseldorf",
          "@id": "https://www.wikidata.org/wiki/Q1718"
        }
      ],
      "priceRange": "€€",
      "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "SEPA"],
      "currenciesAccepted": "EUR",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      },
      "founder": {
        "@type": "Person",
        "name": "Geschäftsführung Grema"
      },
      "foundingDate": "2014",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": "15-25"
      },
      "slogan": "Professionelle Reinigung seit 2014",
      "image": "http://212.227.103.141/assets/logo-grema-high_1753727835385-B4bEaZMk.webp",
      "logo": "http://212.227.103.141/assets/logo-grema-high_1753727835385-B4bEaZMk.webp",
      "sameAs": [
        "https://www.facebook.com/grema.service",
        "https://www.instagram.com/grema.service"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Reinigungsdienstleistungen",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Unterhaltsreinigung",
              "description": "Regelmäßige professionelle Büro- und Objektreinigung",
              "category": "Gebäudereinigung",
              "areaServed": ["Moers", "Duisburg", "Krefeld"]
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "priceCurrency": "EUR",
              "price": "0",
              "description": "Kostenlose Beratung und Angebot"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Fensterreinigung",
              "description": "Professionelle Glas- und Fensterreinigung",
              "category": "Glasreinigung",
              "areaServed": ["Moers", "Duisburg", "Krefeld"]
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Bauabschlussreinigung", 
              "description": "Grundreinigung nach Bau- und Renovierungsarbeiten",
              "category": "Grundreinigung",
              "areaServed": ["Moers", "Duisburg", "Krefeld"]
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Entrümpelung",
              "description": "Professionelle Entrümpelung und Haushaltsauflösung", 
              "category": "Entrümpelung",
              "areaServed": ["Moers", "Duisburg", "Krefeld"]
            }
          }
        ]
      }
    };

    // JSON-LD Script hinzufügen
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(localBusinessData);
    script.id = `local-business-${pageName}`;
    
    // Alte Scripts entfernen  
    const oldScript = document.getElementById(`local-business-${pageName}`);
    if (oldScript) {
      document.head.removeChild(oldScript);
    }
    
    document.head.appendChild(script);

    // Cleanup beim Unmount
    return () => {
      const scriptToRemove = document.getElementById(`local-business-${pageName}`);
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, [pageName]);

  return null; // Keine sichtbare Komponente
}