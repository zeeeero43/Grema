import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { useState, useEffect } from "react";
import { 
  Building2, 
  Phone, 
  Calendar,
  User,
  Menu,
  X,
  ArrowLeft,
  MapPin,
  Clock,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import logoImage from "@assets/logo-grema-high_1753727835385.webp";

interface AutoBlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  author: string;
  readTime: string;
  image: string;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
}

export default function AutoBlogPost() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { slug } = useParams<{ slug: string }>();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/blog', slug],
    queryFn: async (): Promise<{ success: boolean; post: AutoBlogPost }> => {
      const response = await fetch(`/api/blog/${slug}`);
      if (!response.ok) {
        throw new Error('Blog post not found');
      }
      return response.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header Skeleton */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between h-20">
              <Skeleton className="h-12 w-32" />
              <div className="hidden md:flex items-center space-x-8">
                {Array(5).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-20" />
                ))}
              </div>
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </header>

        {/* Content Skeleton */}
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-64 w-full mb-8" />
          <div className="space-y-4">
            {Array(8).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Artikel nicht gefunden</h1>
          <p className="text-gray-600 mb-8">Der angeforderte Blog-Artikel konnte nicht gefunden werden.</p>
          <Link href="/blog">
            <Button>Zurück zum Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const post = data.post;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-3">
              <img 
                src={logoImage}
                alt="Grema Gebäudeservice GmbH Logo" 
                className="h-12 w-auto"
              />
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary font-medium">Startseite</Link>
              <Link href="/unterhaltsreinigung" className="text-gray-700 hover:text-primary font-medium">Büroreinigung</Link>
              <Link href="/fensterreinigung" className="text-gray-700 hover:text-primary font-medium">Fensterreinigung</Link>
              <Link href="/bauabschlussreinigung" className="text-gray-700 hover:text-primary font-medium">Baureinigung</Link>
              <Link href="/entruempelung" className="text-gray-700 hover:text-primary font-medium">Entrümpelung</Link>
              <Link href="/blog" className="text-primary font-medium">Blog</Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Button asChild className="bg-primary text-white hover:bg-primary/90">
                <a href="tel:017634446399" className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  0176 34446399
                </a>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t bg-white py-4">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="text-gray-700 hover:text-primary font-medium" onClick={() => setMobileMenuOpen(false)}>Startseite</Link>
                <Link href="/unterhaltsreinigung" className="text-gray-700 hover:text-primary font-medium" onClick={() => setMobileMenuOpen(false)}>Büroreinigung</Link>
                <Link href="/fensterreinigung" className="text-gray-700 hover:text-primary font-medium" onClick={() => setMobileMenuOpen(false)}>Fensterreinigung</Link>
                <Link href="/bauabschlussreinigung" className="text-gray-700 hover:text-primary font-medium" onClick={() => setMobileMenuOpen(false)}>Baureinigung</Link>
                <Link href="/entruempelung" className="text-gray-700 hover:text-primary font-medium" onClick={() => setMobileMenuOpen(false)}>Entrümpelung</Link>
                <Link href="/blog" className="text-primary font-medium" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
                
                <div className="pt-4 border-t">
                  <Button asChild className="w-full bg-primary text-white hover:bg-primary/90" onClick={() => setMobileMenuOpen(false)}>
                    <a href="tel:017634446399" className="flex items-center justify-center">
                      <Phone className="w-4 h-4 mr-2" />
                      0176 34446399
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Blog Post Content */}
      <article className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
        {/* Back to Blog Button */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Zurück zum Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="text-sm">
              {post.category}
            </Badge>
            <Badge variant="default" className="text-sm">
              KI-Generiert
            </Badge>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(post.createdAt).toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
          </div>

          {/* Keywords */}
          {post.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.keywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  {keyword}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* Hero Image */}
        {post.image && (
          <div className="mb-8">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        )}

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Call to Action */}
        <div className="mt-12 p-8 bg-primary/5 rounded-lg border border-primary/10">
          <div className="text-center">
            <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Professionelle Gebäudereinigung gesucht?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Mit über 15 Jahren Erfahrung und mehr als 500 zufriedenen Geschäftskunden 
              in NRW sind wir Ihr zuverlässiger Partner für alle Reinigungsdienstleistungen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
                <a href="tel:017634446399" className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Jetzt kostenlos anrufen
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="/#contact" className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Kostenloses Angebot
                </a>
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Grema Gebäudeservice GmbH</h3>
              <p className="text-gray-300 mb-4">
                Ihr professioneller Partner für Gebäudereinigung in Moers und ganz NRW. 
                Mit über 15 Jahren Erfahrung sorgen wir für Sauberkeit in höchster Qualität.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Unsere Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Unterhaltsreinigung</li>
                <li>Fensterreinigung</li>
                <li>Bauabschlussreinigung</li>
                <li>Entrümpelung</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Kontakt</h4>
              <div className="space-y-2 text-gray-300">
                <a href="tel:017634446399" className="flex items-center hover:text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  0176/3444 6399
                </a>
                <p className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Moers, NRW
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Grema Gebäudeservice GmbH. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}