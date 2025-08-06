import { pgTable, serial, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Existing contact inquiries table
export const contactInquiries = pgTable("contact_inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  service: text("service").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Users table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
});

// Automated blog posts table
export const autoBlogPosts = pgTable("auto_blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  metaDescription: text("meta_description").notNull(),
  keywords: jsonb("keywords").$type<string[]>().notNull(),
  tags: jsonb("tags").$type<string[]>().default([]).notNull(),
  category: text("category").notNull(),
  author: text("author").default("Grema Team").notNull(),
  readTime: text("read_time").notNull(),
  image: text("image").notNull(),
  imageAlt: text("image_alt").notNull(),
  imagePrompt: text("image_prompt").notNull(),
  faqData: jsonb("faq_data").$type<Array<{question: string, answer: string}>>().default([]).notNull(),
  isPublished: boolean("is_published").default(false).notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Blog ideas and topics tracking
export const blogIdeas = pgTable("blog_ideas", {
  id: serial("id").primaryKey(),
  topic: text("topic").notNull(),
  category: text("category").notNull(),
  keywords: jsonb("keywords").$type<string[]>().notNull(),
  isUsed: boolean("is_used").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// AI generation logs
export const aiGenerationLogs = pgTable("ai_generation_logs", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'content' or 'image'
  prompt: text("prompt").notNull(),
  response: text("response").notNull(),
  model: text("model").notNull(), // 'deepseek' or 'dall-e'
  success: boolean("success").notNull(),
  error: text("error"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Create Zod schemas
export const insertContactInquirySchema = createInsertSchema(contactInquiries);
export const selectContactInquirySchema = createSelectSchema(contactInquiries);

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const insertAutoBlogPostSchema = createInsertSchema(autoBlogPosts);
export const selectAutoBlogPostSchema = createSelectSchema(autoBlogPosts);

export const insertBlogIdeaSchema = createInsertSchema(blogIdeas);
export const selectBlogIdeaSchema = createSelectSchema(blogIdeas);

export const insertAiGenerationLogSchema = createInsertSchema(aiGenerationLogs);
export const selectAiGenerationLogSchema = createSelectSchema(aiGenerationLogs);

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type InsertContactInquiry = typeof contactInquiries.$inferInsert;

export type AutoBlogPost = typeof autoBlogPosts.$inferSelect;
export type InsertAutoBlogPost = typeof autoBlogPosts.$inferInsert;

export type BlogIdea = typeof blogIdeas.$inferSelect;
export type InsertBlogIdea = typeof blogIdeas.$inferInsert;

export type AiGenerationLog = typeof aiGenerationLogs.$inferSelect;
export type InsertAiGenerationLog = typeof aiGenerationLogs.$inferInsert;