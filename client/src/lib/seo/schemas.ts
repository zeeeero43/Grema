// Schema.org structured data for SEO

export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "http://212.227.103.141#organization",
  "name": "Grema Gebäudeservice GmbH",
  "alternateName": "Grema Reinigungsservice",
  "description": "Professioneller Gebäudereinigungsservice in Moers. Spezialisiert auf Unterhaltsreinigung, Fensterreinigung, Bauabschlussreinigung und Entrümpelung.",
  "url": "http://212.227.103.141",
  "telephone": "+49-2841-123456",
  "email": "info@grema-service.de",
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer",
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
  "areaServed": [
    {
      "@type": "City",
      "name": "Moers"
    },
    {
      "@type": "City", 
      "name": "Duisburg"
    },
    {
      "@type": "City",
      "name": "Krefeld"
    },
    {
      "@type": "City",
      "name": "Düsseldorf"
    }
  ],
  "serviceType": [
    "Unterhaltsreinigung",
    "Büroreinigung", 
    "Fensterreinigung",
    "Glasreinigung",
    "Bauabschlussreinigung",
    "Entrümpelung",
    "Treppenhausreinigung"
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
          "description": "Regelmäßige professionelle Büro- und Objektreinigung"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Fensterreinigung",
          "description": "Professionelle Glas- und Fensterreinigung für klare Sicht"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Bauabschlussreinigung",
          "description": "Grundreinigung nach Bau- und Renovierungsarbeiten"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Entrümpelung", 
          "description": "Professionelle Entrümpelung und Entsorgung"
        }
      }
    ]
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
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  },
  "image": "http://212.227.103.141/assets/logo-grema-high_1753727835385-B4bEaZMk.webp",
  "logo": "http://212.227.103.141/assets/logo-grema-high_1753727835385-B4bEaZMk.webp",
  "sameAs": [
    "https://www.facebook.com/grema.service",
    "https://www.instagram.com/grema.service"
  ]
});

export const getServiceSchema = (serviceName: string, serviceDescription: string, serviceUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": serviceName,
  "description": serviceDescription,
  "provider": {
    "@type": "LocalBusiness", 
    "name": "Grema Gebäudeservice GmbH",
    "url": "http://212.227.103.141"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Moers"
    },
    {
      "@type": "City",
      "name": "Duisburg" 
    },
    {
      "@type": "City",
      "name": "Krefeld"
    }
  ],
  "url": serviceUrl,
  "serviceType": "Gebäudereinigung"
});

export const getBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const getFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const getArticleSchema = (article: {
  title: string;
  description: string;
  publishedDate: string;
  modifiedDate?: string;
  authorName: string;
  url: string;
  imageUrl?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "author": {
    "@type": "Organization",
    "name": article.authorName
  },
  "publisher": {
    "@type": "Organization",
    "name": "Grema Gebäudeservice GmbH",
    "logo": {
      "@type": "ImageObject",
      "url": "http://212.227.103.141/assets/logo-grema-high_1753727835385-B4bEaZMk.webp"
    }
  },
  "datePublished": article.publishedDate,
  "dateModified": article.modifiedDate || article.publishedDate,
  "url": article.url,
  "image": article.imageUrl,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url
  }
});