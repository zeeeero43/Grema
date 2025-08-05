import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Building2, 
  Phone, 
  Calendar,
  User,
  Menu,
  X,
  ArrowRight,
  MapPin,
  Clock,
  Tag,
  Zap,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import logoImage from "@assets/logo-grema-high_1753727835385.webp";
import { getAllBlogPosts } from "@/data/blogPosts";

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

interface ManualBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  readTime: string;
  date: string;
  category: string;
  image: string;
  keywords: string[];
}

interface CombinedBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  date: string;
  category: string;
  image: string;
  keywords: string[];
  isAI: boolean;
}

export default function CombinedBlog() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Query for automated blog posts
  const { data: autoData, isLoading: autoLoading } = useQuery({
    queryKey: ['/api/blog'],
    queryFn: async (): Promise<{ success: boolean; posts: AutoBlogPost[] }> => {
      const response = await fetch('/api/blog?limit=10');
      if (!response.ok) throw new Error('Failed to fetch auto blog posts');
      return response.json();
    },
  });

  // Get manual blog posts
  const manualPosts = getAllBlogPosts();

  // Combine and sort all posts
  const allPosts: CombinedBlogPost[] = [
    // Automated posts
    ...(autoData?.posts || []).map((post): CombinedBlogPost => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      readTime: post.readTime,
      date: post.publishedAt || post.createdAt,
      category: post.category,
      image: post.image,
      keywords: post.keywords,
      isAI: true
    })),
    // Manual posts
    ...manualPosts.map((post): CombinedBlogPost => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      readTime: post.readTime,
      date: post.date,
      category: post.category,
      image: post.image,
      keywords: post.keywords,
      isAI: false
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getCategoryBadgeColor = (category: string) => {
    const colors: Record<string, string> = {
      'unterhaltsreinigung': 'bg-blue-100 text-blue-800',
      'fensterreinigung': 'bg-green-100 text-green-800',
      'bauabschlussreinigung': 'bg-orange-100 text-orange-800',
      'entrümpelung': 'bg-purple-100 text-purple-800',
      'tipps': 'bg-yellow-100 text-yellow-800',
      'standards': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

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
              <Link href="/admin/auto-blog">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  KI-System
                </Button>
              </Link>
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
                
                <div className="pt-4 border-t space-y-2">
                  <Link href="/admin/auto-blog">
                    <Button variant="outline" size="sm" className="w-full flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                      <Zap className="h-4 w-4" />
                      KI-System
                    </Button>
                  </Link>
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

      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <Building2 className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Grema Gebäudeservice Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Expertenwissen, Tipps und Neuigkeiten rund um professionelle Gebäudereinigung. 
            Von Fachexperten und KI-gestützter Recherche für Sie zusammengestellt.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {manualPosts.length} Expertenartikel
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              {autoData?.posts?.length || 0} KI-Artikel
            </Badge>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {autoLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : allPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPosts.map((post, index) => (
                <Card key={`${post.isAI ? 'ai' : 'manual'}-${post.slug}`} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={getCategoryBadgeColor(post.category)}>
                        {post.category === 'unterhaltsreinigung' && 'Büroreinigung'}
                        {post.category === 'fensterreinigung' && 'Fensterreinigung'}
                        {post.category === 'bauabschlussreinigung' && 'Baureinigung'}
                        {post.category === 'entrümpelung' && 'Entrümpelung'}
                        {post.category === 'tipps' && 'Tipps'}
                        {post.category === 'standards' && 'Standards'}
                      </Badge>
                      {post.isAI && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          KI
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString('de-DE')}
                      </div>
                    </div>

                    {post.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.keywords.slice(0, 3).map((keyword, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                        {post.keywords.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.keywords.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    <Link href={`/blog/${post.slug}`}>
                      <Button className="w-full group/btn">
                        Artikel lesen
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Keine Artikel verfügbar</h3>
              <p className="text-gray-600">
                Derzeit sind keine Blog-Artikel verfügbar. Schauen Sie bald wieder vorbei!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <Building2 className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Professionelle Gebäudereinigung gesucht?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Mit über 15 Jahren Erfahrung und mehr als 500 zufriedenen Geschäftskunden 
            sind wir Ihr zuverlässiger Partner für alle Reinigungsdienstleistungen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <a href="tel:017634446399" className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Jetzt kostenlos anrufen
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <a href="/#contact" className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Kostenloses Angebot
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Grema Gebäudeservice GmbH</h3>
              <p className="text-gray-300 mb-4">
                Ihr professioneller Partner für Gebäudereinigung in Moers und ganz NRW. 
                Seit über 15 Jahren sorgen wir für Sauberkeit in höchster Qualität.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Unsere Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/unterhaltsreinigung" className="hover:text-white transition-colors">Unterhaltsreinigung</Link></li>
                <li><Link href="/fensterreinigung" className="hover:text-white transition-colors">Fensterreinigung</Link></li>
                <li><Link href="/bauabschlussreinigung" className="hover:text-white transition-colors">Bauabschlussreinigung</Link></li>
                <li><Link href="/entruempelung" className="hover:text-white transition-colors">Entrümpelung</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Kontakt</h4>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  0176 34446399
                </p>
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