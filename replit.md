# Grema Gebäudeservice GmbH Website

## Overview

This is a premium, conversion-optimized website for Grema Gebäudeservice GmbH, a professional building cleaning company from Moers, Germany. The project is built as a full-stack web application with a React frontend and Express.js backend, designed to look like an individually designed law firm website - premium, established, and locally rooted rather than a generic service provider template.

## User Preferences

Preferred communication style: Simple, everyday language.
Design aesthetic: Premium, law firm-style with local focus
Avoid generic service provider templates; emphasize established, trustworthy appearance

## Recent Changes (January 2025)

✓ Complete homepage redesign with premium aesthetic transformation
✓ New color scheme: Anthracite (#2d3748) + Gold (#c17f3e) replacing blue
✓ Typography upgrade: Crimson Text serif + Work Sans sans-serif  
✓ Removed personal names from hero section per user feedback
✓ Strengthened header CTA to "Jetzt kostenlos anrufen!" 
✓ Premium carousel services section with real cleaning photos
✓ Professional image overlays with gradient effects and hover animations
✓ Framer Motion animations for smooth interactions
✓ Authentic Google reviews from real customers
✓ Single CTA approach: "Persönliches Gespräch vereinbaren"
✓ Enhanced local Moers identity throughout content
✓ Consistent gold/anthracite color scheme throughout carousel
✓ Authentic Google Reviews integration with Places API
✓ Professional carousel with Google branding and trust elements
✓ Real-time reviews fetching with proper error handling
✓ Animated 3-step process section with premium brand styling
✓ Infinite carousel with all 15 authentic Google reviews
✓ German localization for review content and timestamps
✓ Comprehensive FAQ section with 6 professional questions and answers
✓ Interactive accordion design with hover animations and gold accents
✓ Comprehensive 2025-style movement effects with useInView animations
✓ Hero section simplified to single professional image on right side
✓ Complete navigation overhaul with smooth scrolling to all sections
✓ Professional header with all important sections: Services, About, Process, Reviews, Contact
✓ Mobile navigation with auto-close functionality
✓ All section IDs properly linked to navigation elements
✓ Header simplified - removed right navigation area, kept only logo

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with Vite as the build tool
- **Language**: TypeScript for type safety
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom theming
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript (ES modules)
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Storage**: PostgreSQL-based session store

### Development Setup
- **Build Tool**: Vite for frontend, esbuild for backend
- **Dev Server**: Hot module replacement with Vite
- **Package Manager**: npm
- **TypeScript**: Strict mode enabled with path mapping

## Key Components

### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Contact Inquiries Table**: Lead capture form submissions (name, email, phone, service, message, timestamp)

### API Routes
- `POST /api/contact`: Submit contact form inquiries
- `GET /api/contact`: Retrieve all contact inquiries (admin)

### Frontend Pages
- **Home Page**: Main landing page with hero section, services, and contact form
- **404 Page**: Not found error page

### UI Components
- Complete Shadcn/ui component library (50+ components)
- Custom branded color scheme with CSS variables
- Responsive design with mobile-first approach
- Form components with validation
- Toast notifications for user feedback

## Data Flow

1. **Contact Form Submission**:
   - User fills out contact form on homepage
   - Form data validated with Zod schema
   - Frontend sends POST request to `/api/contact`
   - Backend validates and stores in database
   - Success/error feedback via toast notifications

2. **Data Persistence**:
   - Contact inquiries stored in PostgreSQL
   - Drizzle ORM handles database operations
   - Type-safe database queries with TypeScript

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL provider
- **Connection**: Uses DATABASE_URL environment variable
- **ORM**: Drizzle with PostgreSQL dialect

### UI/Styling
- **Radix UI**: Headless UI components for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **CSS Variables**: Theme customization support

### Development Tools
- **Vite Plugins**: Runtime error overlay, cartographer for Replit
- **ESBuild**: Backend bundling for production
- **PostCSS**: CSS processing with Tailwind

## Deployment Strategy

### Development
- `npm run dev`: Starts development server with hot reload
- Frontend served by Vite dev server
- Backend runs with tsx for TypeScript execution
- Database migrations with `npm run db:push`

### Production Build
- `npm run build`: 
  - Builds frontend with Vite (outputs to dist/public)
  - Bundles backend with esbuild (outputs to dist/index.js)
- `npm start`: Runs production server
- Static files served from dist/public
- Backend serves both API and static assets

### Environment Configuration
- **NODE_ENV**: Development/production mode switching
- **DATABASE_URL**: PostgreSQL connection string (required)
- **REPL_ID**: Replit-specific development features

The application follows modern web development practices with TypeScript throughout, comprehensive form validation, responsive design, and a clean separation between frontend and backend concerns. The architecture supports both development and production environments with appropriate tooling for each.