import { BlogAutomationService } from './blogAutomationService';

export class BlogScheduler {
  private automationService: BlogAutomationService;
  private intervalId: NodeJS.Timeout | null = null;
  private isRunning = false;

  // Schedule: Every 12 hours (2 posts per day)
  private readonly SCHEDULE_INTERVAL = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
  
  constructor() {
    this.automationService = new BlogAutomationService();
  }

  async start(): Promise<void> {
    if (this.isRunning) {
      console.log('⚠️ Blog scheduler is already running');
      return;
    }

    console.log('🚀 Starting automated blog scheduler...');
    console.log(`⏰ Will generate blog posts every ${this.SCHEDULE_INTERVAL / (60 * 60 * 1000)} hours`);

    // Initialize blog topics on startup
    try {
      await this.automationService.initializeBlogIdeas();
      console.log('✅ Blog topic database initialized');
    } catch (error) {
      console.error('❌ Failed to initialize blog topics:', error);
    }

    // Generate first post immediately (optional - remove if you don't want immediate generation)
    this.generatePostSafely();

    // Set up recurring generation
    this.intervalId = setInterval(() => {
      this.generatePostSafely();
    }, this.SCHEDULE_INTERVAL);

    this.isRunning = true;
    console.log('✅ Blog scheduler started successfully');
  }

  stop(): void {
    if (!this.isRunning) {
      console.log('⚠️ Blog scheduler is not running');
      return;
    }

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.isRunning = false;
    console.log('🛑 Blog scheduler stopped');
  }

  private async generatePostSafely(): Promise<void> {
    try {
      console.log('🔄 Scheduled blog generation starting...');
      const result = await this.automationService.generateBlogPost();
      
      if (result.success) {
        console.log(`✅ Scheduled generation successful - Post ID: ${result.postId}`);
        
        // Get and log current stats
        const stats = await this.automationService.getGenerationStats();
        console.log(`📊 Generation Stats:`);
        console.log(`   Total Generated: ${stats.totalGenerated}`);
        console.log(`   Total Published: ${stats.totalPublished}`);
        console.log(`   Today Generated: ${stats.todayGenerated}`);
        console.log(`   Unused Topics: ${stats.unusedTopics}`);
      } else {
        console.error(`❌ Scheduled generation failed: ${result.error}`);
      }
    } catch (error) {
      console.error('❌ Critical error in scheduled generation:', error);
    }
  }

  async getStatus(): Promise<{
    isRunning: boolean;
    nextGeneration?: Date;
    stats: any;
  }> {
    const stats = await this.automationService.getGenerationStats();
    
    let nextGeneration: Date | undefined;
    if (this.isRunning && this.intervalId) {
      // Calculate next generation time (approximate)
      nextGeneration = new Date(Date.now() + this.SCHEDULE_INTERVAL);
    }

    return {
      isRunning: this.isRunning,
      nextGeneration,
      stats
    };
  }

  async triggerManualGeneration(): Promise<{ success: boolean; postId?: number; error?: string }> {
    console.log('🎯 Manual blog generation triggered...');
    return await this.automationService.generateBlogPost();
  }
}

// Global scheduler instance
export const blogScheduler = new BlogScheduler();