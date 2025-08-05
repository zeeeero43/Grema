import OpenAI from 'openai';

export class DalleService {
  private openai: OpenAI | null = null;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      this.openai = new OpenAI({ apiKey });
    } else {
      console.warn('OPENAI_API_KEY not set - DALL-E functionality will be disabled');
    }
  }

  async generateImage(prompt: string): Promise<string> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      // Enhance the prompt for better professional results
      const enhancedPrompt = this.enhancePrompt(prompt);

      const response = await this.openai.images.generate({
        model: 'dall-e-3',
        prompt: enhancedPrompt,
        n: 1,
        size: '1792x1024', // Wide format for blog hero images
        quality: 'standard',
        style: 'natural'
      });

      const imageUrl = response.data?.[0]?.url;
      if (!imageUrl) {
        throw new Error('No image URL received from DALL-E');
      }

      return imageUrl;
    } catch (error) {
      console.error('DALL-E API error:', error);
      throw new Error(`Failed to generate image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private enhancePrompt(originalPrompt: string): string {
    // Add professional styling and quality modifiers
    const enhancements = [
      'professional photography style',
      'high quality',
      'clean and modern',
      'business environment',
      'bright lighting',
      'corporate setting'
    ];

    // Check if prompt already contains professional terms
    const hasEnhancements = enhancements.some(enhancement => 
      originalPrompt.toLowerCase().includes(enhancement.toLowerCase())
    );

    if (hasEnhancements) {
      return originalPrompt;
    }

    return `${originalPrompt}, professional photography style, high quality, clean and modern business environment, bright lighting`;
  }

  async generateBlogHeroImage(imagePrompt: string, category: string): Promise<string> {
    // Create category-specific enhancements
    const categoryEnhancements: Record<string, string> = {
      'unterhaltsreinigung': 'modern office space being cleaned, professional cleaning equipment',
      'fensterreinigung': 'glass windows being cleaned, crystal clear results, professional squeegee work',
      'bauabschlussreinigung': 'construction site cleanup, renovation cleaning, before and after',
      'entrümpelung': 'organized space clearing, professional disposal service, clean empty rooms',
      'tipps': 'professional cleaning demonstration, educational setting, expert showing techniques',
      'standards': 'quality control in cleaning, ISO certification symbols, professional standards'
    };

    const categoryPrompt = categoryEnhancements[category] || 'professional cleaning service';
    
    const fullPrompt = `${imagePrompt}, ${categoryPrompt}, representing Grema Gebäudeservice GmbH professional cleaning company`;

    return this.generateImage(fullPrompt);
  }
}