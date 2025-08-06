import { DeepSeekService } from './deepseekService';
import { storage } from '../storage';
import type { InsertBlogIdea } from '@shared/schema';

export class TopicGenerationService {
  private deepseekService: DeepSeekService;

  constructor() {
    this.deepseekService = new DeepSeekService();
  }

  /**
   * Generates new blog topic ideas based on company services and unused topics
   */
  async generateNewTopics(count: number = 5): Promise<InsertBlogIdea[]> {
    console.log(`🧠 Generating ${count} new blog topic ideas...`);

    try {
      // Get used topics to avoid duplicates
      const existingPosts = await storage.getAutoBlogPosts(200);
      const usedTopics = existingPosts.map(post => post.title.toLowerCase());
      const usedCategories = existingPosts.reduce((acc, post) => {
        acc[post.category] = (acc[post.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      console.log(`📊 Existing posts analysis: ${Object.entries(usedCategories).map(([cat, count]) => `${cat}: ${count}`).join(', ')}`);

      const prompt = this.buildTopicGenerationPrompt(usedTopics, usedCategories, count);
      
      const response = await this.deepseekService.generateTopicIdeas(prompt);
      
      // Parse and validate response
      const topics = this.parseTopicResponse(response);
      
      console.log(`✅ Generated ${topics.length} new topic ideas`);
      return topics;

    } catch (error) {
      console.error('❌ Failed to generate new topics:', error);
      throw error;
    }
  }

  private buildTopicGenerationPrompt(usedTopics: string[], usedCategories: Record<string, number>, count: number): string {
    return `
Du bist ein SEO-Experte für eine deutsche Gebäudereinigungsfirma (Grema Gebäudeservice GmbH aus Moers).

FIRMEN-SERVICES:
1. Unterhaltsreinigung (Büro & Praxis)
2. Fensterreinigung (mit Osmose-Technik)
3. Bauabschlussreinigung 
4. Entrümpelung & Haushaltsauflösung

BEREITS VERWENDETE THEMEN (DIESE NICHT WIEDERHOLEN):
${usedTopics.slice(0, 20).map(topic => `- ${topic}`).join('\n')}

KATEGORIEN-VERTEILUNG:
${Object.entries(usedCategories).map(([cat, count]) => `${cat}: ${count} Artikel`).join(', ')}

AUFGABE: Generiere ${count} völlig neue, noch nicht behandelte Blog-Themen.

TITEL-ANFORDERUNGEN:
⚠️ SCHREIBE TITEL WIE MENSCHEN SIE BEI GOOGLE SUCHEN ⚠️

VERWENDE DIESE FORMATE:
✅ "Was kostet [Service]?" 
✅ "Wie [Problem lösen]?"
✅ "[Service] Tipps für [Zielgruppe]"
✅ "Wann sollte man [Service] beauftragen?"
✅ "[Problem] - So geht's richtig"

KONKRETE BEISPIELE:
"Büroreinigung Kosten - Was zahlt man pro Quadratmeter?"
"Fenster putzen ohne Streifen - Welche Methode ist am besten?"
"Baustaub entfernen nach Renovierung - Tipps vom Profi"
"Wohnung entrümpeln lassen - Ablauf und Kosten"
"Praxisreinigung - Wie oft ist Desinfektion nötig?"

❌ VERMEIDE:
- Formale Titel wie "Industriereinigung: Spezialreinigung..."
- Bereits verwendete Themen
- Doppelte Kategorien im Titel

ANTWORT IM JSON-FORMAT:
{
  "topics": [
    {
      "title": "Suchfreundlicher Titel",
      "category": "unterhaltsreinigung|fensterreinigung|bauabschlussreinigung|entrümpelung",
      "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
      "targetAudience": "Zielgruppe beschreibung"
    }
  ]
}

Generiere GENAU ${count} verschiedene Themen für unterschiedliche Kategorien.`;
  }

  private parseTopicResponse(response: string): InsertBlogIdea[] {
    try {
      const parsed = JSON.parse(response);
      
      if (!parsed.topics || !Array.isArray(parsed.topics)) {
        throw new Error('Invalid response format: missing topics array');
      }

      return parsed.topics.map((topic: any) => ({
        topic: topic.title,
        category: topic.category,
        keywords: topic.keywords || [],
        isUsed: false
      }));

    } catch (error) {
      console.error('Failed to parse topic response:', response);
      throw new Error(`Failed to parse topic generation response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Ensures we have enough unused topics available
   */
  async ensureTopicAvailability(minRequired: number = 3): Promise<void> {
    const unusedTopics = await storage.getUnusedBlogIdeas(minRequired);
    
    if (unusedTopics.length < minRequired) {
      const neededTopics = Math.max(5, minRequired * 2); // Generate some extra
      console.log(`📝 Need ${neededTopics} new topics (${unusedTopics.length} unused, ${minRequired} required)`);
      
      const newTopics = await this.generateNewTopics(neededTopics);
      
      // Save to database
      for (const topic of newTopics) {
        await storage.createBlogIdea(topic);
      }
      
      console.log(`✅ Added ${newTopics.length} new topics to database`);
    } else {
      console.log(`✅ Sufficient topics available: ${unusedTopics.length} unused`);
    }
  }
}