import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactInquirySchema } from "@shared/schema";
import { z } from "zod";
import { blogScheduler } from "./ai/blogScheduler";
import { getGoogleReviews } from "./googlePlaces";
export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);
      
      res.json({ 
        success: true, 
        message: "Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns in Kürze bei Ihnen.",
        id: inquiry.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Ungültige Eingabedaten",
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." 
        });
      }
    }
  });

  // Get all contact inquiries (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const inquiries = await storage.getContactInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error("Get inquiries error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Fehler beim Laden der Anfragen" 
      });
    }
  });

  // Google Reviews API endpoint
  app.get("/api/google-reviews", getGoogleReviews);

  // ========== AUTOMATED BLOG SYSTEM ROUTES ==========
  
  // Get all published blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const posts = await storage.getAutoBlogPosts(limit);
      res.json({ success: true, posts });
    } catch (error) {
      console.error("Get blog posts error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Fehler beim Laden der Blog-Artikel" 
      });
    }
  });

  // Get single blog post by slug
  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getAutoBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ 
          success: false, 
          message: "Blog-Artikel nicht gefunden" 
        });
      }
      
      res.json({ success: true, post });
    } catch (error) {
      console.error("Get blog post error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Fehler beim Laden des Blog-Artikels" 
      });
    }
  });

  // Manual blog generation trigger (admin only)
  app.post("/api/admin/generate-blog", async (req, res) => {
    try {
      console.log("📝 Manual blog generation requested via API");
      const result = await blogScheduler.triggerManualGeneration();
      
      if (result.success) {
        res.json({ 
          success: true, 
          message: "Blog-Artikel erfolgreich generiert",
          postId: result.postId 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: result.error || "Fehler bei der Blog-Generierung" 
        });
      }
    } catch (error) {
      console.error("Manual blog generation error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Fehler bei der manuellen Blog-Generierung" 
      });
    }
  });

  // Get blog automation status and stats
  app.get("/api/admin/blog-status", async (req, res) => {
    try {
      const status = await blogScheduler.getStatus();
      res.json({ success: true, ...status });
    } catch (error) {
      console.error("Get blog status error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Fehler beim Laden des Blog-Status" 
      });
    }
  });

  // Start the blog automation scheduler
  console.log("🚀 Initializing automated blog system...");
  try {
    await blogScheduler.start();
    console.log("✅ Blog automation scheduler started successfully");
  } catch (error) {
    console.error("❌ Failed to start blog scheduler:", error);
  }

  const httpServer = createServer(app);
  return httpServer;
}
