import { useState, useEffect } from "react";
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
  BookOpen,
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Header } from "../components/Header";
import { SEOHead } from "../components/seo/SEOHead";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Query for auto-generated blog posts from API
  const { data: blogData, isLoading } = useQuery({
    queryKey: ['/api/blog'],
    queryFn: async () => {
      const response = await fetch('/api/blog');
      const data = await response.json();
      return data;
    }
  });

  const allPosts = blogData?.posts || [];
  
  // Filter and search posts
  const filteredPosts = allPosts.filter((post: any) => {
    const matchesSearch = searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = Array.from(new Set(allPosts.map((post: any) => post.category as string))) as string[];
  const blogPosts = filteredPosts;

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Reinigungsblog - Fachbeiträge & Tipps | Grema Gebäudeservice Moers"
        description="✓ Professionelle Reinigungstipps ✓ Branchenwissen ✓ Expertenratgeber für Gebäudereinigung in Moers und Umgebung. Täglich neue Fachbeiträge."
        keywords="Reinigungsblog, Reinigungstipps, Gebäudereinigung Ratgeber, Moers Reinigung, Reinigungsexperten Blog"
        canonicalUrl="/blog"
        ogType="website"

      />
      {/* Header */}
      <Header currentPage="blog" />

      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              <span>Fachbeiträge & Reinigungstipps</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Grema <span className="text-primary">Reinigungsblog</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Professionelle Tipps, Branchenwissen und Einblicke in die Welt der Gebäudereinigung. 
              Von Experten für Experten und alle, die Wert auf Sauberkeit legen.
            </p>
            
            {/* Blog Stats */}
            {!isLoading && allPosts.length > 0 && (
              <div className="flex items-center justify-center gap-8 text-sm text-gray-500 mb-8">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{allPosts.length} Fachbeiträge</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Täglich neue Inhalte</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Artikel durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-gray-600" />
              <button
                onClick={() => setSelectedCategory("")}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === "" 
                    ? "bg-primary text-white" 
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                Alle
              </button>
              {categories.map((category: string) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedCategory === category 
                      ? "bg-primary text-white" 
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Counter */}
          {(searchTerm || selectedCategory) && (
            <div className="mt-4 text-sm text-gray-600">
              {blogPosts.length} {blogPosts.length === 1 ? 'Artikel gefunden' : 'Artikel gefunden'}
              {searchTerm && ` für "${searchTerm}"`}
              {selectedCategory && ` in "${selectedCategory}"`}
            </div>
          )}
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {isLoading ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border">
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-3"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                    <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
              {blogPosts.map((post: any) => (
              <article key={post.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('de-DE')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{post.author}</span>
                    </div>
                    <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
                      <Link href={`/blog/${post.slug}`} className="flex items-center">
                        Weiterlesen
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
            </div>
          )}
          
          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Weitere Artikel laden
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Haben Sie Fragen zu unseren Reinigungsdienstleistungen?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Unsere Experten beraten Sie gerne persönlich und erstellen Ihnen ein 
            maßgeschneidertes Angebot für Ihre Reinigungsanforderungen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <a href="tel:017634446399" className="flex items-center justify-center">
                <Phone className="w-5 h-5 mr-2" />
                Jetzt anrufen
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white bg-transparent text-white hover:bg-white hover:text-primary">
              <Link href="/#angebot" className="flex items-center justify-center">
                Angebot anfordern
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-primary flex items-center justify-center rounded">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Grema Gebäudeservice GmbH</h3>
            </div>
            
            <p className="text-gray-400 mb-6">
              Professionelle Gebäudereinigung in Moers seit 2014
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-8 text-gray-400 text-sm mb-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:017634446399" className="hover:text-white">0176/3444 6399</a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Moers, NRW</span>
              </div>
            </div>
            
            <div className="text-gray-500 text-sm">
              <p>&copy; 2025 Grema Gebäudeservice GmbH. Alle Rechte vorbehalten.</p>
              <div className="flex justify-center space-x-6 mt-3">
                <Link href="/" className="hover:text-white">Startseite</Link>
                <Link href="/blog" className="hover:text-white">Blog</Link>
                <a href="/impressum" className="hover:text-white">Impressum</a>
                <a href="/datenschutz" className="hover:text-white">Datenschutz</a>

              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Simple Phone Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="tel:017634446399"
          className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}