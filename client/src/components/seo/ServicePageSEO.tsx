import { SEOHead } from "./SEOHead";
import { getServiceSchema, getBreadcrumbSchema } from "../../lib/seo/schemas";

interface ServicePageSEOProps {
  serviceName: string;
  serviceDescription: string;
  serviceKeywords: string;
  canonicalUrl: string;
  serviceDetails: {
    price?: string;
    duration?: string;
    coverage?: string[];
  };
}

export function ServicePageSEO({
  serviceName,
  serviceDescription,
  serviceKeywords,
  canonicalUrl,
  serviceDetails
}: ServicePageSEOProps) {
  const fullTitle = `${serviceName} in Moers - Grema Gebäudeservice GmbH`;
  const fullDescription = `${serviceDescription} ✓ Professionelle ${serviceName.toLowerCase()} in Moers & Umgebung ✓ Kostenlose Beratung ✓ Zuverlässig seit 2014`;
  
  const serviceSchema = getServiceSchema(
    serviceName,
    serviceDescription,
    `http://212.227.103.141${canonicalUrl}`
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Startseite", url: "http://212.227.103.141/" },
    { name: "Leistungen", url: "http://212.227.103.141/#services" },
    { name: serviceName, url: `http://212.227.103.141${canonicalUrl}` }
  ]);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [serviceSchema, breadcrumbSchema]
  };

  return (
    <SEOHead
      title={fullTitle}
      description={fullDescription}
      keywords={serviceKeywords}
      canonicalUrl={canonicalUrl}
      schemaMarkup={schemaMarkup}
      ogType="article"
    />
  );
}