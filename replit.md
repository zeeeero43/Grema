# Grema Gebäudeservice GmbH Website

## Overview

This is a premium, conversion-optimized website for Grema Gebäudeservice GmbH, a professional building cleaning company from Moers, Germany. The project is built as a full-stack web application with a React frontend and Express.js backend, designed to look like an individually designed law firm website - premium, established, and locally rooted rather than a generic service provider template.

## User Preferences

Preferred communication style: Simple, everyday language.
Design aesthetic: Premium, law firm-style with local focus
Avoid generic service provider templates; emphasize established, trustworthy appearance

## Recent Changes (January 2025)

**MAJOR DESIGN OVERHAUL - Classic Style (January 28, 2025)**
✓ Complete website redesign from modern to classic/traditional style per customer feedback
✓ Brand color implemented: Customer's main color #0844A9 as primary blue throughout website
✓ Traditional layout: Clean header with clear navigation, large hero sections, structured content blocks
✓ Classic business website aesthetic: Inspired by professional cleaning company references
✓ Typography maintained: Crimson Text (serif) + Work Sans (sans-serif) for readability
✓ Text readability issues fixed: All white text now properly visible on backgrounds
✓ Services section redesigned: Simplified 4-column grid layout without images, traditional business style
✓ Classic contact section with split layout (info + form)
✓ Traditional footer with company information and service overview
✓ Authentic Google Reviews integration maintained (15 real reviews, 5.0⭐)
✓ Mobile responsiveness preserved with classic styling
✓ Hero section: Classic two-column layout with white text on brand gradient background
✓ Services: Clean icon-based grid layout with brand blue accent color
✓ About section: Traditional company presentation with USPs in structured boxes
✓ All text color issues resolved: Hero, contact boxes, and footer now properly readable
✓ Brand consistency: #0844A9 blue used throughout as main color with orange accents

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