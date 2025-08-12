import type { Express } from "express";

export function registerSEORoutes(app: Express) {
  // XML Sitemap mit Blog-Posts
  app.get("/sitemap.xml", async (req, res) => {
    const baseUrl = "http://212.227.103.141";
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Fetch blog posts for sitemap
    let blogPostUrls = [];
    try {
      // You could fetch from database here, but for now we'll add basic blog entry
      blogPostUrls = [
        `      <loc>${baseUrl}/blog</loc>`,
        `      <lastmod>${currentDate}</lastmod>`,
        `      <changefreq>weekly</changefreq>`,
        `      <priority>0.8</priority>`
      ];
    } catch (error) {
      console.log('Could not fetch blog posts for sitemap');
    }

    const urls = [
      { loc: `${baseUrl}/`, changefreq: "monthly", priority: "1.0", lastmod: currentDate },
      { loc: `${baseUrl}/unterhaltsreinigung`, changefreq: "monthly", priority: "0.9", lastmod: currentDate },
      { loc: `${baseUrl}/glas-rahmenreinigung`, changefreq: "monthly", priority: "0.9", lastmod: currentDate },
      { loc: `${baseUrl}/sonderreinigung`, changefreq: "monthly", priority: "0.9", lastmod: currentDate },
      { loc: `${baseUrl}/bauabschlussreinigung`, changefreq: "monthly", priority: "0.9", lastmod: currentDate },
      { loc: `${baseUrl}/entruempelung`, changefreq: "monthly", priority: "0.9", lastmod: currentDate },
      { loc: `${baseUrl}/treppenhausreinigung`, changefreq: "monthly", priority: "0.9", lastmod: currentDate },
      { loc: `${baseUrl}/ueber-uns`, changefreq: "monthly", priority: "0.8", lastmod: currentDate },
      { loc: `${baseUrl}/blog`, changefreq: "weekly", priority: "0.8", lastmod: currentDate },
      { loc: `${baseUrl}/impressum`, changefreq: "yearly", priority: "0.4", lastmod: currentDate },
      { loc: `${baseUrl}/datenschutz`, changefreq: "yearly", priority: "0.4", lastmod: currentDate },
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    res.set('Content-Type', 'text/xml');
    res.send(sitemap);
  });

  // Robots.txt
  app.get("/robots.txt", (req, res) => {
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /*.json$

Sitemap: http://212.227.103.141/sitemap.xml

# Crawl-delay für respektvolles Crawling
Crawl-delay: 1

# Spezifische Anweisungen für wichtige Crawler
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1`;

    res.set('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });

  // Security.txt für Sicherheitsforscher
  app.get("/.well-known/security.txt", (req, res) => {
    const securityTxt = `Contact: mailto:security@grema-service.de
Expires: 2025-12-31T23:59:59.000Z
Preferred-Languages: de, en
Canonical: http://212.227.103.141/.well-known/security.txt`;

    res.set('Content-Type', 'text/plain');
    res.send(securityTxt);
  });
}