# Grema Gebäudeservice GmbH Website

## Overview

This project is a premium, conversion-optimized website for Grema Gebäudeservice GmbH, a professional building cleaning company from Moers, Germany. It is designed as a full-stack web application with a React frontend and Express.js backend. The primary purpose is to present a professional, established, and locally rooted image, distinct from generic service provider templates, aiming for a high-end appearance akin to a law firm's website.

## User Preferences

Preferred communication style: Simple, everyday language.
Design aesthetic: CLASSICAL/TRADITIONAL APPROACH ONLY - Customer explicitly rejected modern premium design
Brand color: Use #0844A9 (logo blue) throughout website design
Typography: Inter font family for consistency
Avoid generic service provider templates; emphasize established, trustworthy appearance
Keep services section unchanged; simplify all other sections for better overview

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **UI Framework**: Shadcn/ui components built on Radix UI
- **Styling**: Tailwind CSS with custom theming
- **Routing**: Wouter
- **State Management**: TanStack Query
- **Form Handling**: React Hook Form with Zod validation
- **UI/UX Decisions**: Classical/traditional design, grey background, Building2 icon, clean 4-card grid for services, simple numbered circles for process, professional two-column contact layout, clean accordion FAQ. Emphasis on white cards with subtle shadows. All complex animations, motion effects, and glassmorphism have been eliminated.
- **Color Scheme**: Primary brand color #0844A9 (logo blue) is consistently applied.
- **Typography**: Inter font family is used universally.

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ES modules)
- **Database**: PostgreSQL with Drizzle ORM
- **Session Storage**: PostgreSQL-based session store

### Key Features and Implementations
- **Service Subpages**: Dedicated pages for "Unterhaltsreinigung", "Fensterreinigung", "Bauabschlussreinigung", and "Entrümpelung", each with replicated contact forms and consistent branding.
- **Blog Section**: Professional, SEO-optimized blog with dynamic post template system and 6 detailed articles. Content management allows adding new posts via data files.
- **Static Reviews**: Google reviews are hardcoded into a `StaticReviews` component, replacing external API calls for performance and maintenance simplicity.
- **Image Generation**: Automated image generation for blog posts is handled via Runware.ai, generating professional images and German SEO tags.

### Core System Design
- **Database Schema**: Includes `Users` table (id, username, password) and `Contact Inquiries` table (name, email, phone, service, message, timestamp).
- **API Routes**: `POST /api/contact` for contact form submissions, `GET /api/contact` for retrieving inquiries (admin).
- **Deployment Strategy**: Docker-based deployment with Docker Compose orchestration. Containerized PostgreSQL, Nginx reverse proxy, automated GitHub deployments, and simplified 10-minute setup process. Domain and SSL configuration optional.

## External Dependencies

### Database
- **Replit PostgreSQL**: Local, cost-free PostgreSQL database.
- **ORM**: Drizzle with `node-postgres` driver.

### UI/Styling
- **Radix UI**: Headless UI components.
- **Tailwind CSS**: Utility-first CSS framework.
- **Lucide React**: Icon library.

### Development Tools
- **Vite Plugins**: For frontend build and development.
- **ESBuild**: For backend bundling.
- **PostCSS**: CSS processing.

### Other Integrations
- **Runware.ai**: For image generation and SEO tag creation for blog posts.

## Recent Changes (August 2025)

### Docker Deployment Migration (COMPLETED - August 12, 2025)
✓ **Docker modernization**: Complete migration from traditional VPS to Docker-based deployment
✓ **Simplified setup**: Deployment reduced from 2+ hours to under 10 minutes
✓ **Container architecture**: Docker + Docker Compose with app, PostgreSQL, and Nginx services
✓ **Domain-optional deployment**: Works initially via IP address, domain/SSL setup moved to optional section
✓ **GitHub integration**: Public repository support with automated deployment scripts
✓ **Zero-configuration database**: PostgreSQL runs in container with automatic setup
✓ **Containerized reverse proxy**: Nginx automatically configured for the application
✓ **Automated backups**: Docker-based backup and restore scripts with volume management
✓ **Enhanced monitoring**: Docker stats, logs, and container health checks
✓ **Production-ready**: Multi-stage builds, security optimizations, and resource management
✓ **Deployment files**: Dockerfile, docker-compose.yml, nginx.conf, and automated scripts created