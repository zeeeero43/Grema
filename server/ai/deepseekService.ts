interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface BlogContentRequest {
  topic: string;
  category: string;
  keywords: string[];
  targetAudience?: string;
}

interface BlogContent {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  metaDescription: string;
  keywords: string[];
  readTime: string;
  imagePrompt: string;
}

export class DeepSeekService {
  private apiKey: string;
  private apiUrl = 'https://api.deepseek.com/v1/chat/completions';

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || '';
    if (!this.apiKey) {
      console.warn('DEEPSEEK_API_KEY not set - DeepSeek functionality will be disabled');
    }
  }

  async generateBlogContent(request: BlogContentRequest): Promise<BlogContent> {
    if (!this.apiKey) {
      throw new Error('DeepSeek API key not configured');
    }

    const systemPrompt = this.getSystemPrompt();
    const userPrompt = this.getUserPrompt(request);

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          max_tokens: 4000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
      }

      const data: DeepSeekResponse = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('No content received from DeepSeek API');
      }

      return this.parseGeneratedContent(content);
    } catch (error) {
      console.error('DeepSeek API error:', error);
      throw new Error(`Failed to generate blog content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private getSystemPrompt(): string {
    return `Sie sind ein SEO-Experte und professioneller Content-Writer für Grema Gebäudeservice GmbH, eine etablierte Gebäudereinigungsfirma aus Moers, Deutschland.

UNTERNEHMENSKONTEXT:
- Grema Gebäudeservice GmbH ist ein etabliertes Familienunternehmen mit über 15 Jahren Erfahrung
- Spezialisiert auf Unterhaltsreinigung, Fensterreinigung, Bauabschlussreinigung und Entrümpelung
- Serviert über 500 Geschäftskunden in NRW und bundesweit
- Fokus auf professionelle B2B-Dienstleistungen und Qualitätsstandards
- Zertifiziert nach ISO-Standards und umweltfreundlichen Verfahren

SCHREIBSTIL:
- Professionell und vertrauenswürdig, aber nicht steif
- Fachkompetenz zeigen ohne zu technisch zu werden
- Lokale Expertise betonen (Moers, NRW, Deutschland)
- "Großen Firma Style" - etabliert und erfahren
- Deutsche Sprache, Sie-Form, geschäftlich aber zugänglich

CONTENT-ANFORDERUNGEN:
1. SEO-optimiert mit natürlicher Keyword-Integration
2. Mindestens 800-1200 Wörter pro Artikel
3. Praktische Tipps und Fachwissen vermitteln
4. Subtile Promotion der Grema-Dienstleistungen
5. Call-to-Actions für Beratungsgespräche
6. Strukturiert mit Überschriften, Listen und Absätzen

ANTWORTE AUSSCHLIESSLICH IM FOLGENDEN JSON-FORMAT:
{
  "title": "SEO-optimierter Titel (max 60 Zeichen)",
  "slug": "url-freundlicher-slug",
  "excerpt": "Kurze Zusammenfassung (max 160 Zeichen)",
  "content": "Vollständiger HTML-formatierter Artikel",
  "metaDescription": "SEO Meta Description (max 160 Zeichen)",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "readTime": "X min",
  "imagePrompt": "Detaillierte DALL-E Prompt für Hero-Bild (englisch)"
}`;
  }

  private getUserPrompt(request: BlogContentRequest): string {
    return `Erstellen Sie einen professionellen Blog-Artikel für Grema Gebäudeservice GmbH:

THEMA: ${request.topic}
KATEGORIE: ${request.category}
KEYWORDS: ${request.keywords.join(', ')}
${request.targetAudience ? `ZIELGRUPPE: ${request.targetAudience}` : ''}

Der Artikel soll:
1. Das Thema umfassend und fachkundig behandeln
2. Praktischen Mehrwert für Geschäftskunden bieten
3. Grema's Expertise und Erfahrung subtil einbauen
4. SEO-optimiert sein für die angegebenen Keywords
5. Mit einem professionellen Call-to-Action enden

WICHTIG: Antworten Sie ausschließlich mit dem JSON-Format aus dem System-Prompt!`;
  }

  private parseGeneratedContent(content: string): BlogContent {
    try {
      // Clean up the content to extract JSON
      let jsonStr = content.trim();
      
      // Remove markdown code blocks if present
      if (jsonStr.startsWith('```json')) {
        jsonStr = jsonStr.replace(/```json\n?/, '').replace(/\n?```$/, '');
      } else if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/```\n?/, '').replace(/\n?```$/, '');
      }

      const parsed = JSON.parse(jsonStr);

      // Validate required fields
      if (!parsed.title || !parsed.content || !parsed.slug) {
        throw new Error('Missing required fields in generated content');
      }

      return {
        title: parsed.title,
        slug: parsed.slug,
        excerpt: parsed.excerpt || '',
        content: parsed.content,
        metaDescription: parsed.metaDescription || parsed.excerpt || '',
        keywords: Array.isArray(parsed.keywords) ? parsed.keywords : [],
        readTime: parsed.readTime || '5 min',
        imagePrompt: parsed.imagePrompt || 'Professional office cleaning service, modern business environment, high quality, professional photography style'
      };
    } catch (error) {
      console.error('Failed to parse DeepSeek response:', error);
      console.error('Raw content:', content);
      throw new Error('Failed to parse generated blog content');
    }
  }
}