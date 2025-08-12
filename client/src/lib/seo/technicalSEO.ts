// Technical SEO optimizations and utilities

export interface PageSpeed {
  loadTime: number;
  firstPaint: number;
  largestContentfulPaint: number;
}

export interface SEOAudit {
  title: {
    length: number;
    hasKeyword: boolean;
    isTruncated: boolean;
  };
  description: {
    length: number;
    hasKeyword: boolean;
    isTruncated: boolean;
  };
  headings: {
    h1Count: number;
    hasH1: boolean;
    hasHierarchy: boolean;
  };
  images: {
    totalImages: number;
    missingAlt: number;
    oversized: number;
  };
}

// Critical Keywords für lokale SEO
export const localKeywords = {
  primary: [
    "Gebäudereinigung Moers",
    "Reinigungsservice Moers",
    "Büroreinigung Moers",
    "Unterhaltsreinigung Moers",
    "Fensterreinigung Moers"
  ],
  secondary: [
    "Reinigungsfirma Moers",
    "Objektreinigung Moers", 
    "Glasreinigung Moers",
    "Treppenhausreinigung Moers",
    "Bauabschlussreinigung Moers",
    "Entrümpelung Moers"
  ],
  geographic: [
    "Moers",
    "Duisburg", 
    "Krefeld",
    "Düsseldorf",
    "Niederrhein",
    "NRW"
  ],
  longTail: [
    "professionelle Gebäudereinigung Moers",
    "günstige Büroreinigung Moers",
    "zuverlässige Reinigungsfirma Moers",
    "Fensterreinigung Moers Preise",
    "Unterhaltsreinigung Moers Kosten"
  ]
};

// Core Web Vitals Optimierung
export const coreWebVitals = {
  largestContentfulPaint: {
    good: 2500,
    needsImprovement: 4000
  },
  firstInputDelay: {
    good: 100,
    needsImprovement: 300
  },
  cumulativeLayoutShift: {
    good: 0.1,
    needsImprovement: 0.25
  }
};

// SEO Title Templates
export const titleTemplates = {
  homepage: "{serviceName} in {city} - {company} | Professionelle Reinigung seit 2014",
  service: "{serviceName} {city} - {company} | Kostenlose Beratung & Angebot", 
  blog: "{articleTitle} - {company} Blog | Expertentipps Gebäudereinigung",
  contact: "Kontakt - {company} | Reinigungsservice {city} & Umgebung"
};

// Meta Description Templates
export const descriptionTemplates = {
  homepage: "Professionelle {services} in {city} & Umgebung. ✓ {experience}+ Jahre Erfahrung ✓ Zuverlässig ✓ Kostenlose Beratung. Jetzt anfragen!",
  service: "{serviceDescription} ✓ Professionelle {serviceName} in {city} ✓ Kostenlose Beratung ✓ Zuverlässig seit {year}",
  blog: "{excerpt} Expertentipps von {company} - Ihrem professionellen Reinigungsservice in {city}.",
  contact: "Kontaktieren Sie {company} für professionelle Reinigungsdienstleistungen in {city}. ✓ Kostenlose Beratung ✓ Schnelle Antwort ✓ Zuverlässiger Service"
};

// Internal Linking Score Calculation
export function calculateInternalLinkingScore(pageLinks: number, totalPages: number): number {
  const optimalRatio = 0.1; // 10% der Seiten verlinkt
  const actualRatio = pageLinks / totalPages;
  return Math.min(100, (actualRatio / optimalRatio) * 100);
}

// Keyword Density Calculation  
export function calculateKeywordDensity(content: string, keyword: string): number {
  const words = content.toLowerCase().split(/\s+/);
  const keywordWords = keyword.toLowerCase().split(/\s+/);
  const keywordLength = keywordWords.length;
  let matches = 0;
  
  for (let i = 0; i <= words.length - keywordLength; i++) {
    const phrase = words.slice(i, i + keywordLength).join(' ');
    if (phrase === keyword.toLowerCase()) {
      matches++;
    }
  }
  
  return (matches / words.length) * 100;
}

// SEO Score Calculation
export function calculateSEOScore(audit: SEOAudit): number {
  let score = 100;
  
  // Title Score
  if (!audit.title.hasKeyword) score -= 15;
  if (audit.title.isTruncated) score -= 10;
  if (audit.title.length < 30) score -= 5;
  
  // Description Score  
  if (!audit.description.hasKeyword) score -= 10;
  if (audit.description.isTruncated) score -= 8;
  if (audit.description.length < 120) score -= 5;
  
  // Headings Score
  if (!audit.headings.hasH1) score -= 15;
  if (audit.headings.h1Count > 1) score -= 10;
  if (!audit.headings.hasHierarchy) score -= 8;
  
  // Images Score
  if (audit.images.missingAlt > 0) {
    score -= (audit.images.missingAlt / audit.images.totalImages) * 20;
  }
  if (audit.images.oversized > 0) {
    score -= (audit.images.oversized / audit.images.totalImages) * 10;
  }
  
  return Math.max(0, Math.round(score));
}