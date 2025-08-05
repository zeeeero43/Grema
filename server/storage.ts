import { users, contactInquiries, autoBlogPosts, blogIdeas, aiGenerationLogs, type User, type InsertUser, type ContactInquiry, type InsertContactInquiry, type AutoBlogPost, type InsertAutoBlogPost, type BlogIdea, type InsertBlogIdea, type AiGenerationLog, type InsertAiGenerationLog } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  getContactInquiries(): Promise<ContactInquiry[]>;
  
  // Auto blog posts methods
  createAutoBlogPost(post: InsertAutoBlogPost): Promise<AutoBlogPost>;
  getAutoBlogPosts(limit?: number): Promise<AutoBlogPost[]>;
  getAutoBlogPostBySlug(slug: string): Promise<AutoBlogPost | undefined>;
  publishAutoBlogPost(id: number): Promise<AutoBlogPost | undefined>;
  
  // Blog ideas methods
  createBlogIdea(idea: InsertBlogIdea): Promise<BlogIdea>;
  getUnusedBlogIdeas(limit?: number): Promise<BlogIdea[]>;
  markBlogIdeaAsUsed(id: number): Promise<void>;
  
  // AI generation logs
  createAiGenerationLog(log: InsertAiGenerationLog): Promise<AiGenerationLog>;
  getAiGenerationLogs(limit?: number): Promise<AiGenerationLog[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const [inquiry] = await db
      .insert(contactInquiries)
      .values(insertInquiry)
      .returning();
    return inquiry;
  }

  async getContactInquiries(): Promise<ContactInquiry[]> {
    return await db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt));
  }

  // Auto blog posts methods
  async createAutoBlogPost(insertPost: InsertAutoBlogPost): Promise<AutoBlogPost> {
    const [post] = await db
      .insert(autoBlogPosts)
      .values(insertPost)
      .returning();
    return post;
  }

  async getAutoBlogPosts(limit: number = 50): Promise<AutoBlogPost[]> {
    return await db
      .select()
      .from(autoBlogPosts)
      .where(eq(autoBlogPosts.isPublished, true))
      .orderBy(desc(autoBlogPosts.publishedAt))
      .limit(limit);
  }

  async getAutoBlogPostBySlug(slug: string): Promise<AutoBlogPost | undefined> {
    const [post] = await db
      .select()
      .from(autoBlogPosts)
      .where(and(eq(autoBlogPosts.slug, slug), eq(autoBlogPosts.isPublished, true)));
    return post || undefined;
  }

  async publishAutoBlogPost(id: number): Promise<AutoBlogPost | undefined> {
    const [post] = await db
      .update(autoBlogPosts)
      .set({ 
        isPublished: true, 
        publishedAt: new Date(),
        updatedAt: new Date()
      })
      .where(eq(autoBlogPosts.id, id))
      .returning();
    return post || undefined;
  }

  // Blog ideas methods
  async createBlogIdea(insertIdea: InsertBlogIdea): Promise<BlogIdea> {
    const [idea] = await db
      .insert(blogIdeas)
      .values(insertIdea)
      .returning();
    return idea;
  }

  async getUnusedBlogIdeas(limit: number = 10): Promise<BlogIdea[]> {
    return await db
      .select()
      .from(blogIdeas)
      .where(eq(blogIdeas.isUsed, false))
      .orderBy(desc(blogIdeas.createdAt))
      .limit(limit);
  }

  async markBlogIdeaAsUsed(id: number): Promise<void> {
    await db
      .update(blogIdeas)
      .set({ isUsed: true })
      .where(eq(blogIdeas.id, id));
  }

  // AI generation logs
  async createAiGenerationLog(insertLog: InsertAiGenerationLog): Promise<AiGenerationLog> {
    const [log] = await db
      .insert(aiGenerationLogs)
      .values(insertLog)
      .returning();
    return log;
  }

  async getAiGenerationLogs(limit: number = 100): Promise<AiGenerationLog[]> {
    return await db
      .select()
      .from(aiGenerationLogs)
      .orderBy(desc(aiGenerationLogs.createdAt))
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();
