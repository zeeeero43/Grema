// SEO-optimierte Alt-Texte für alle Bilder der Website

export const imageAltTexts = {
  // Homepage Hero
  "medium-shot-people-cleaning-building-min_1754484111418.jpg": "Professionelle Gebäudereinigung Moers - Team bei der Büroreinigung mit modernen Geräten",
  
  // Service Images
  "professional-cleaning-service-person-cleaning-office-min_1754484122126.jpg": "Unterhaltsreinigung Moers - Fachkraft bei der professionellen Büroreinigung",
  "person-taking-care-office-cleaning-min_1754484125992.jpg": "Fensterreinigung Moers - Professioneller Glasreiniger bei der Arbeit",
  "professional-cleaner-wearing-protection-uniform-cleaning-floor-production-plant-min_1754484132966.jpg": "Industriereinigung Moers - Sonderreinigung in Schutzausrüstung",
  "working-metal-processing-factory-min_1754484137126.jpg": "Bauabschlussreinigung Moers - Reinigung nach Bauarbeiten in Industrieanlage",
  "couple-sorting-belongings-from-cardboard-boxes-after-moving-new-home-min_1754484141549.jpg": "Entrümpelung Moers - Haushaltsauflösung und professionelle Räumung",
  "man-cleaning-staircase-handrail-gloves-min_1754484146749.jpg": "Treppenhausreinigung Moers - Reinigung von Handläufen und Treppenstufen",
  "view-professional-cleaning-service-person-holding-supplies_1753726946244.jpg": "Grema Gebäudeservice - Professionelle Reinigungskraft mit Ausrüstung",
  
  // Company Logo
  "logo-grema-high_1753727835385.webp": "Grema Gebäudeservice GmbH Logo - Professionelle Reinigung in Moers seit 2014"
};

export function getOptimizedAltText(imagePath: string): string {
  // Extract filename from path
  const filename = imagePath.split('/').pop() || '';
  const cleanFilename = filename.replace(/^.*-/, ''); // Remove hash prefix if exists
  
  return imageAltTexts[cleanFilename as keyof typeof imageAltTexts] || 
         imageAltTexts[filename as keyof typeof imageAltTexts] || 
         "Grema Gebäudeservice - Professionelle Reinigung in Moers";
}