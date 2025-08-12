import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  schemaMarkup?: object;
  locale?: string;
}

export function SEOHead({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = "/assets/logo-grema-high_1753727835385-B4bEaZMk.webp",
  ogType = "website",
  schemaMarkup,
  locale = "de_DE"
}: SEOHeadProps) {
  const fullTitle = title.includes("Grema") ? title : `${title} | Grema Gebäudeservice GmbH - Professionelle Reinigung in Moers`;
  const baseUrl = "http://212.227.103.141";
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Grema Gebäudeservice GmbH" />
      <meta name="language" content="de" />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Grema Gebäudeservice GmbH" />
      <meta property="og:locale" content={locale} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Geographic Meta Tags */}
      <meta name="geo.region" content="DE-NW" />
      <meta name="geo.placename" content="Moers" />
      <meta name="geo.position" content="51.4508;6.6261" />
      <meta name="ICBM" content="51.4508, 6.6261" />

      {/* Business Meta Tags */}
      <meta name="contact" content="info@grema-service.de" />
      <meta name="distribution" content="local" />
      <meta name="coverage" content="Moers, Duisburg, Krefeld, Düsseldorf" />

      {/* Schema.org Markup */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </Helmet>
  );
}