// Comprehensive SEO Test Suite für Grema Website

export interface SEOTestResult {
  testName: string;
  passed: boolean;
  details: string;
  score: number;
}

export interface PageSEOResults {
  url: string;
  title: string;
  totalScore: number;
  tests: SEOTestResult[];
}

export class SEOTestSuite {
  private results: PageSEOResults[] = [];

  // Test einzelne Seite
  async testPageSEO(url: string, dom: Document): Promise<PageSEOResults> {
    const tests: SEOTestResult[] = [];
    let totalScore = 0;
    
    // Title Tag Test
    const titleTest = this.testTitle(dom);
    tests.push(titleTest);
    
    // Meta Description Test
    const descriptionTest = this.testMetaDescription(dom);
    tests.push(descriptionTest);
    
    // H1 Tag Test
    const h1Test = this.testH1Tag(dom);
    tests.push(h1Test);
    
    // Structured Data Test
    const structuredDataTest = this.testStructuredData(dom);
    tests.push(structuredDataTest);
    
    // Image Alt Tags Test
    const imageAltTest = this.testImageAltTags(dom);
    tests.push(imageAltTest);
    
    // Internal Links Test
    const internalLinksTest = this.testInternalLinks(dom);
    tests.push(internalLinksTest);
    
    // Canonical URL Test
    const canonicalTest = this.testCanonicalURL(dom);
    tests.push(canonicalTest);
    
    // Open Graph Test
    const ogTest = this.testOpenGraph(dom);
    tests.push(ogTest);

    // Local SEO Test (nur für lokale Seiten)
    const localSeoTest = this.testLocalSEO(dom, url);
    tests.push(localSeoTest);

    // Calculate total score
    totalScore = Math.round(tests.reduce((sum, test) => sum + test.score, 0) / tests.length);

    const result: PageSEOResults = {
      url,
      title: dom.title,
      totalScore,
      tests
    };

    this.results.push(result);
    return result;
  }

  private testTitle(dom: Document): SEOTestResult {
    const titleElement = dom.querySelector('title');
    const title = titleElement?.textContent || '';
    
    let score = 0;
    let details = '';
    let passed = false;

    if (!title) {
      details = 'Kein Title Tag gefunden';
    } else if (title.length < 30) {
      details = `Title zu kurz (${title.length} Zeichen). Mindestens 30 empfohlen.`;
      score = 30;
    } else if (title.length > 60) {
      details = `Title zu lang (${title.length} Zeichen). Maximal 60 empfohlen.`;
      score = 60;
    } else if (!title.includes('Moers')) {
      details = 'Title enthält keinen lokalen Bezug (Moers)';
      score = 70;
    } else {
      details = `Title optimal (${title.length} Zeichen, enthält lokalen Bezug)`;
      score = 100;
      passed = true;
    }

    return {
      testName: 'Title Tag',
      passed,
      details,
      score
    };
  }

  private testMetaDescription(dom: Document): SEOTestResult {
    const metaDesc = dom.querySelector('meta[name="description"]');
    const description = metaDesc?.getAttribute('content') || '';
    
    let score = 0;
    let details = '';
    let passed = false;

    if (!description) {
      details = 'Keine Meta Description gefunden';
    } else if (description.length < 120) {
      details = `Meta Description zu kurz (${description.length} Zeichen). Mindestens 120 empfohlen.`;
      score = 40;
    } else if (description.length > 160) {
      details = `Meta Description zu lang (${description.length} Zeichen). Maximal 160 empfohlen.`;
      score = 70;
    } else if (!description.includes('✓')) {
      details = 'Meta Description ohne Aufzählungszeichen (✓) für bessere CTR';
      score = 80;
    } else {
      details = `Meta Description optimal (${description.length} Zeichen, enthält Call-to-Action)`;
      score = 100;
      passed = true;
    }

    return {
      testName: 'Meta Description',
      passed,
      details,
      score
    };
  }

  private testH1Tag(dom: Document): SEOTestResult {
    const h1Tags = dom.querySelectorAll('h1');
    
    let score = 0;
    let details = '';
    let passed = false;

    if (h1Tags.length === 0) {
      details = 'Keine H1-Überschrift gefunden';
    } else if (h1Tags.length > 1) {
      details = `Mehrere H1-Tags gefunden (${h1Tags.length}). Nur eine H1 pro Seite empfohlen.`;
      score = 60;
    } else {
      const h1Text = h1Tags[0].textContent || '';
      if (h1Text.length < 20) {
        details = 'H1-Tag zu kurz für SEO-Optimierung';
        score = 70;
      } else {
        details = 'H1-Tag optimal vorhanden und aussagekräftig';
        score = 100;
        passed = true;
      }
    }

    return {
      testName: 'H1 Heading',
      passed,
      details,
      score
    };
  }

  private testStructuredData(dom: Document): SEOTestResult {
    const jsonLdScripts = dom.querySelectorAll('script[type="application/ld+json"]');
    
    let score = 0;
    let details = '';
    let passed = false;

    if (jsonLdScripts.length === 0) {
      details = 'Keine strukturierten Daten (JSON-LD) gefunden';
    } else {
      let validSchemas = 0;
      jsonLdScripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent || '');
          if (data['@context'] === 'https://schema.org') {
            validSchemas++;
          }
        } catch (e) {
          // Ignore parsing errors
        }
      });

      if (validSchemas === 0) {
        details = 'Strukturierte Daten vorhanden, aber nicht Schema.org konform';
        score = 40;
      } else {
        details = `${validSchemas} Schema.org konforme strukturierte Daten gefunden`;
        score = 100;
        passed = true;
      }
    }

    return {
      testName: 'Structured Data',
      passed,
      details,
      score
    };
  }

  private testImageAltTags(dom: Document): SEOTestResult {
    const images = dom.querySelectorAll('img');
    let imagesWithAlt = 0;
    let totalImages = images.length;

    images.forEach(img => {
      if (img.getAttribute('alt') && img.getAttribute('alt')!.trim() !== '') {
        imagesWithAlt++;
      }
    });

    let score = 0;
    let details = '';
    let passed = false;

    if (totalImages === 0) {
      details = 'Keine Bilder auf der Seite gefunden';
      score = 100;
      passed = true;
    } else {
      const percentage = Math.round((imagesWithAlt / totalImages) * 100);
      if (percentage === 100) {
        details = `Alle ${totalImages} Bilder haben Alt-Texte`;
        score = 100;
        passed = true;
      } else {
        details = `${imagesWithAlt}/${totalImages} Bilder haben Alt-Texte (${percentage}%)`;
        score = percentage;
      }
    }

    return {
      testName: 'Image Alt Tags',
      passed,
      details,
      score
    };
  }

  private testInternalLinks(dom: Document): SEOTestResult {
    const allLinks = dom.querySelectorAll('a[href]');
    let internalLinks = 0;

    allLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('/') || (typeof window !== 'undefined' && href.includes(window.location.hostname))) {
        internalLinks++;
      }
    });

    let score = 0;
    let details = '';
    let passed = false;

    if (internalLinks === 0) {
      details = 'Keine internen Links gefunden';
    } else if (internalLinks < 3) {
      details = `Wenige interne Links (${internalLinks}). Mindestens 3-5 empfohlen.`;
      score = 60;
    } else {
      details = `Gute interne Verlinkung mit ${internalLinks} Links`;
      score = 100;
      passed = true;
    }

    return {
      testName: 'Internal Links',
      passed,
      details,
      score
    };
  }

  private testCanonicalURL(dom: Document): SEOTestResult {
    const canonicalLink = dom.querySelector('link[rel="canonical"]');
    
    let score = 0;
    let details = '';
    let passed = false;

    if (!canonicalLink) {
      details = 'Keine Canonical URL gefunden';
    } else {
      const href = canonicalLink.getAttribute('href');
      if (!href) {
        details = 'Canonical Link ohne href-Attribut';
        score = 30;
      } else {
        details = 'Canonical URL korrekt gesetzt';
        score = 100;
        passed = true;
      }
    }

    return {
      testName: 'Canonical URL',
      passed,
      details,
      score
    };
  }

  private testOpenGraph(dom: Document): SEOTestResult {
    const ogTags = ['og:title', 'og:description', 'og:type', 'og:url'];
    let foundTags = 0;

    ogTags.forEach(tag => {
      if (dom.querySelector(`meta[property="${tag}"]`)) {
        foundTags++;
      }
    });

    let score = 0;
    let details = '';
    let passed = false;

    const percentage = Math.round((foundTags / ogTags.length) * 100);
    
    if (foundTags === 0) {
      details = 'Keine Open Graph Tags gefunden';
    } else if (foundTags === ogTags.length) {
      details = 'Alle wichtigen Open Graph Tags vorhanden';
      score = 100;
      passed = true;
    } else {
      details = `${foundTags}/${ogTags.length} Open Graph Tags vorhanden (${percentage}%)`;
      score = percentage;
    }

    return {
      testName: 'Open Graph',
      passed,
      details,
      score
    };
  }

  private testLocalSEO(dom: Document, url: string): SEOTestResult {
    // Check for local business structured data
    const hasLocalBusiness = this.hasLocalBusinessSchema(dom);
    const hasLocalKeywords = this.hasLocalKeywords(dom);
    const hasContactInfo = this.hasContactInfo(dom);
    
    let score = 0;
    let details = '';
    let passed = false;

    let localFeatures = 0;
    if (hasLocalBusiness) localFeatures++;
    if (hasLocalKeywords) localFeatures++;
    if (hasContactInfo) localFeatures++;

    const percentage = Math.round((localFeatures / 3) * 100);

    if (localFeatures === 3) {
      details = 'Vollständige lokale SEO-Optimierung (Schema, Keywords, Kontakt)';
      score = 100;
      passed = true;
    } else if (localFeatures >= 2) {
      details = `Gute lokale SEO-Optimierung (${localFeatures}/3 Features)`;
      score = 80;
    } else if (localFeatures === 1) {
      details = `Grundlegende lokale SEO vorhanden (${localFeatures}/3 Features)`;
      score = 50;
    } else {
      details = 'Keine lokale SEO-Optimierung erkannt';
    }

    return {
      testName: 'Local SEO',
      passed,
      details,
      score
    };
  }

  private hasLocalBusinessSchema(dom: Document): boolean {
    const jsonLdScripts = dom.querySelectorAll('script[type="application/ld+json"]');
    for (let i = 0; i < jsonLdScripts.length; i++) {
      const script = jsonLdScripts[i];
      try {
        const data = JSON.parse(script.textContent || '');
        if (data['@type'] === 'LocalBusiness' || 
            (data['@graph'] && data['@graph'].some((item: any) => item['@type'] === 'LocalBusiness'))) {
          return true;
        }
      } catch (e) {
        // Ignore parsing errors
      }
    }
    return false;
  }

  private hasLocalKeywords(dom: Document): boolean {
    const textContent = dom.body.textContent?.toLowerCase() || '';
    const localKeywords = ['moers', 'duisburg', 'krefeld', 'niederrhein'];
    return localKeywords.some(keyword => textContent.includes(keyword));
  }

  private hasContactInfo(dom: Document): boolean {
    const textContent = dom.body.textContent || '';
    const hasPhone = /\+49|0\d{2,4}[\s\-]?\d+/.test(textContent);
    const hasEmail = /@.+\..+/.test(textContent);
    return hasPhone || hasEmail;
  }

  // Generate comprehensive report
  generateReport(): string {
    let report = '=== SEO AUDIT REPORT ===\n\n';
    
    this.results.forEach(result => {
      report += `URL: ${result.url}\n`;
      report += `Title: ${result.title}\n`;
      report += `Overall Score: ${result.totalScore}/100\n\n`;
      
      result.tests.forEach(test => {
        const status = test.passed ? '✅' : '❌';
        report += `${status} ${test.testName}: ${test.score}/100\n`;
        report += `   ${test.details}\n\n`;
      });
      
      report += '---\n\n';
    });
    
    return report;
  }

  // Get overall website SEO score
  getOverallScore(): number {
    if (this.results.length === 0) return 0;
    
    const totalScore = this.results.reduce((sum, result) => sum + result.totalScore, 0);
    return Math.round(totalScore / this.results.length);
  }
}