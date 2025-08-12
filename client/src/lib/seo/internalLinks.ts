// Internal Link Strategy für bessere SEO

export interface InternalLink {
  text: string;
  href: string;
  title: string;
}

export const internalLinks = {
  // Service-übergreifende Verlinkung
  fromHomePage: [
    {
      text: "professionelle Unterhaltsreinigung",
      href: "/unterhaltsreinigung",
      title: "Büro- und Praxisreinigung in Moers"
    },
    {
      text: "Fensterreinigung",
      href: "/glas-rahmenreinigung", 
      title: "Glas- und Rahmenreinigung für streifenfreie Fenster"
    },
    {
      text: "Bauabschlussreinigung",
      href: "/bauabschlussreinigung",
      title: "Grundreinigung nach Bau- und Renovierungsarbeiten"
    },
    {
      text: "Entrümpelung",
      href: "/entruempelung",
      title: "Haushaltsauflösung und Nachlassräumung"
    }
  ],
  
  // Von Service-Seiten zur Homepage
  toHomePage: [
    {
      text: "alle unsere Reinigungsdienstleistungen",
      href: "/",
      title: "Grema Gebäudeservice - Komplette Übersicht der Leistungen"
    },
    {
      text: "Grema Gebäudeservice",
      href: "/", 
      title: "Startseite - Professionelle Gebäudereinigung in Moers"
    }
  ],
  
  // Service-zu-Service Verlinkung
  relatedServices: {
    unterhaltsreinigung: [
      {
        text: "Fensterreinigung",
        href: "/glas-rahmenreinigung",
        title: "Ergänzende Glasreinigung für Ihr Büro"
      },
      {
        text: "Treppenhausreinigung", 
        href: "/treppenhausreinigung",
        title: "Professionelle Reinigung der Eingangsbereiche"
      }
    ],
    fensterreinigung: [
      {
        text: "Büroreinigung",
        href: "/unterhaltsreinigung", 
        title: "Regelmäßige Unterhaltsreinigung Ihrer Räume"
      }
    ],
    bauabschlussreinigung: [
      {
        text: "Sonderreinigung",
        href: "/sonderreinigung",
        title: "Spezielle Reinigung für hartnäckige Verschmutzungen"
      },
      {
        text: "Entrümpelung",
        href: "/entruempelung", 
        title: "Professionelle Räumung und Entsorgung"
      }
    ]
  }
};

export function getRelatedServiceLinks(currentService: string): InternalLink[] {
  return internalLinks.relatedServices[currentService as keyof typeof internalLinks.relatedServices] || [];
}

export function getContextualLink(context: 'fromHome' | 'toHome'): InternalLink[] {
  switch(context) {
    case 'fromHome':
      return internalLinks.fromHomePage;
    case 'toHome':
      return internalLinks.toHomePage;
    default:
      return [];
  }
}