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
- **PostgreSQL**: Local PostgreSQL database.
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

### Domain & SSL Integration (READY - August 12, 2025)
✓ **Automatic domain setup script**: Created `setup-domain.sh` for 5-minute domain configuration
✓ **SSL automation**: Let's Encrypt integration with automatic certificate renewal
✓ **Nginx HTTPS configuration**: HTTP/2, security headers, automatic HTTP→HTTPS redirect
✓ **Docker SSL support**: Extended docker-compose.yml with certbot container
✓ **Complete documentation**: Step-by-step guide in `DOMAIN-SETUP.md`
✓ **Production ready**: Website fully prepared for professional domain deployment

### Replit References Cleanup (COMPLETED - August 12, 2025)
✓ **HTML files cleaned**: Removed replit development scripts from both public/index.html and client/index.html
✓ **VPS configuration cleaned**: Updated vite.config.vps.ts to remove all replit plugin imports
✓ **Documentation renamed**: Changed replit.md to project.md to remove branding references
✓ **Database references updated**: Changed "Replit PostgreSQL" to "PostgreSQL" throughout documentation
✓ **Source code verified**: No replit references remain in React/TypeScript components or server logic
✓ **System limitation**: Main vite.config.ts remains protected and contains required build dependencies

### Legal Pages Implementation (COMPLETED - August 12, 2025)
✓ **Impressum page created**: Complete legal disclosure with company details and management information
✓ **Datenschutz page created**: Comprehensive GDPR-compliant privacy policy tailored to website content
✓ **AGB removed from all footers**: Removed from home, all 6 service pages, blog pages, and about page
✓ **Footer navigation updated**: All pages now link to /impressum and /datenschutz properly
✓ **SEO optimization**: Both legal pages include full SEO tags and canonical URLs
✓ **Routing implemented**: Added /impressum and /datenschutz routes in App.tsx
✓ **Sitemap updated**: XML sitemap includes new legal pages for search engine indexing
✓ **German law compliance**: Website now meets German legal requirements for commercial websites
✓ **Legal updates**: TMG references updated to DDG (Digitale-Dienste-Gesetz) as per current law
✓ **Management corrected**: Only Ivana Grejic listed as Geschäftsführung (Tanja Scheurenberg removed)
✓ **Footer additions**: Both legal pages now have complete footers matching site design
✓ **Extended privacy policy**: Added comprehensive GDPR sections including SSL, cookies, complaint procedures
✓ **Favicon implementation**: Custom cleaning-themed favicon (spray bottle) in brand colors
✓ **Cookie system**: Full DSGVO-compliant cookie consent system with categorization and preferences
✓ **Cookie management**: Banner, settings modal, and comprehensive privacy policy updates

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

### Production Deployment Success (COMPLETED - August 12, 2025)
✓ **Critical routing bug fixed**: React Router base path corrected from "/Grema" to "/" for VPS deployment
✓ **White page issue resolved**: Router now properly matches root URL routes instead of "/Grema/" prefix
✓ **Asset serving working**: JavaScript (759KB) and CSS (86KB) load correctly with proper paths
✓ **Vite import problem resolved**: Fixed ESM bundling issues with dynamic imports in production
✓ **Database schema migration**: All required tables (blog_ideas, ai_generation_logs, auto_blog_posts) created
✓ **Live website deployed**: Successfully running at http://212.227.103.141
✓ **Blog automation active**: Topic generation and automated article creation operational
✓ **API integration verified**: DeepSeek and Runware APIs configured and working
✓ **100% functional system**: All features tested and confirmed working in production environment

### Comprehensive SEO System Implementation (COMPLETED - August 12, 2025)
✓ **Complete "Endlevel SEO" system**: Full technical SEO implementation for maximum search visibility
✓ **Homepage SEO optimization**: Title tags, meta descriptions, structured data with local business schema
✓ **All service pages optimized**: SEO for Unterhaltsreinigung, Fensterreinigung, Sonderreinigung, Bauabschlussreinigung, Entrümpelung, Treppenhausreinigung
✓ **Technical SEO infrastructure**: XML sitemap (working), robots.txt, security.txt, canonical URLs
✓ **Advanced schema markup**: Local business, service, and breadcrumb structured data for all pages
✓ **Local SEO optimization**: Moers-focused keywords, geographic targeting, local business information
✓ **Image optimization**: Alt text optimization system with SEO-focused descriptions
✓ **Internal linking strategy**: Strategic cross-linking between services and pages
✓ **SEO testing suite**: Comprehensive automated testing for title tags, meta descriptions, structured data
✓ **React Helmet integration**: Dynamic meta tag management throughout the application
✓ **Search engine optimization**: 100% Google-compliant SEO implementation for maximum visibility