# Grema Gebäudeservice GmbH Website

## Overview

This project is a premium, conversion-optimized website for Grema Gebäudeservice GmbH, a professional building cleaning company from Moers, Germany. The application is built as a full-stack web solution with a focus on classical/traditional design aesthetics, local SEO optimization, and automated content generation. The system features dedicated service pages, an automated blog system with AI-generated content, and a professional contact management system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with Vite as the build tool and development server
- **Language**: TypeScript for type safety and better developer experience
- **UI Framework**: Shadcn/ui components built on top of Radix UI primitives
- **Styling**: Tailwind CSS with custom theming and Inter font family
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation schemas
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Design Philosophy**: Classical/traditional approach with #0844A9 brand color, grey background, Building2 icon usage, and clean professional layouts

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **API Design**: RESTful endpoints for contact forms, blog management, and Google Reviews integration

### Database Schema
- **Users Table**: Authentication system with username/password
- **Contact Inquiries Table**: Form submissions storage with service categorization
- **Auto Blog Posts Table**: Automated blog content with SEO metadata
- **Blog Ideas Table**: AI-generated topic management system
- **AI Generation Logs Table**: Tracking of automated content generation

### Key System Features
- **Automated Blog System**: AI-powered content generation using DeepSeek for text and Runware for images, scheduled every ~80 hours with topic pool management
- **Service Pages**: Dedicated pages for Unterhaltsreinigung, Fensterreinigung, Bauabschlussreinigung, Entrümpelung, and other services
- **Contact Management**: Centralized form handling with service-specific inquiries
- **SEO Optimization**: Automated sitemap generation, meta tags, and local search optimization
- **Topic Generation Service**: Dynamic blog topic creation with local SEO focus on Moers and surrounding areas

### Deployment Strategy
- **Containerization**: Docker-based deployment with multi-stage builds
- **Orchestration**: Docker Compose with PostgreSQL, Nginx reverse proxy, and application containers
- **Production Setup**: Optimized for VPS deployment with 10-minute setup process
- **Asset Management**: Vite build optimization with proper asset handling for production

## External Dependencies

### Core Services
- **PostgreSQL Database**: Local database instance for data persistence
- **DeepSeek API**: AI text generation service for blog content creation (requires DEEPSEEK_API_KEY)
- **Runware API**: AI image generation service for blog post images (requires RUNWARE_API_KEY)

### Development Tools
- **Vite**: Build tool and development server with React plugin
- **Drizzle Kit**: Database migration and schema management
- **TypeScript Compiler**: Type checking and compilation

### UI Libraries
- **Radix UI**: Accessible component primitives for forms, dialogs, and navigation
- **Lucide React**: Modern icon library for consistent iconography
- **Tailwind CSS**: Utility-first CSS framework with custom configuration

### Optional Integrations
- **Google Places API**: Review fetching capability (optional, falls back to static reviews)
- **Google Analytics**: Cookie-compliant analytics tracking (configurable via cookie consent)