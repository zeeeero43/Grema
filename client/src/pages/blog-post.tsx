import { useState, useEffect } from "react";
import { useRoute } from "wouter";
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
  Share2,
  Mail,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import logoImage from "@assets/logo-grema-high_1753727835385.webp";
import { getBlogPostBySlug, getAllBlogPosts, type BlogPost } from "@/data/blogPosts";

export default function BlogPost() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [match, params] = useRoute("/blog/:slug");
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const post = params?.slug ? getBlogPostBySlug(params.slug) : null;
  const otherPosts = getAllBlogPosts().filter(p => p.slug !== params?.slug).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Artikel nicht gefunden</h1>
          <p className="text-gray-600 mb-8">Der gewünschte Blog-Artikel existiert nicht.</p>
          <Button asChild className="bg-primary text-white hover:bg-primary/90">
            <Link href="/blog">Zurück zum Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Simple markdown-to-HTML converter for content
  const formatContent = (content: string) => {
    return content
      .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-gray-900 mb-6 mt-8">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mb-4 mt-6">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-gray-900 mb-3 mt-5">$1</h3>')
      .replace(/^\*\*(.+):\*\*$/gm, '<h4 class="text-lg font-semibold text-gray-900 mb-2 mt-4">$1:</h4>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/^- (.+)$/gm, '<li class="mb-1">$1</li>')
      .replace(/(<li.*<\/li>)/g, '<ul class="list-disc ml-6 mb-4 space-y-1 text-gray-700">$1</ul>')
      .replace(/^- \[ \] (.+)$/gm, '<li class="flex items-center mb-2"><span class="w-4 h-4 border border-gray-300 rounded mr-3"></span>$1</li>')
      .replace(/^- \[x\] (.+)$/gm, '<li class="flex items-center mb-2"><span class="w-4 h-4 bg-primary rounded mr-3 flex items-center justify-center"><svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></span>$1</li>')
      .replace(/\n\n/g, '</p><p class="text-gray-700 leading-relaxed mb-4">')
      .replace(/^(.+)$/gm, (match, content) => {
        if (content.startsWith('<h') || content.startsWith('<ul') || content.startsWith('<li') || content.startsWith('</')) {
          return content;
        }
        return `<p class="text-gray-700 leading-relaxed mb-4">${content}</p>`;
      });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags would go in head */}
      
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
                <Button asChild className="bg-primary text-white hover:bg-primary/90 w-full">
                  <a href="tel:017634446399" className="flex items-center justify-center">
                    <Phone className="w-4 h-4 mr-2" />
                    0176 34446399
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Breadcrumb & Back Navigation */}
      <section className="py-6 bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" className="text-gray-600 hover:text-primary">
              <Link href="/blog" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück zum Blog
              </Link>
            </Button>
            
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-primary">Startseite</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-primary">Blog</Link>
              <span>/</span>
              <span className="text-gray-900">{post.category}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} Lesezeit</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mb-12">
            <img 
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="prose prose-lg max-w-none">
            <div 
              dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
              className="article-content"
            />
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Benötigen Sie professionelle Reinigungsdienstleistungen?
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Lassen Sie sich von unseren Experten beraten. Wir erstellen Ihnen 
              ein maßgeschneidertes Angebot für Ihre spezifischen Anforderungen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
                <a href="tel:017634446399" className="flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Jetzt anrufen
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                <Link href="/#angebot" className="flex items-center justify-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Angebot anfordern
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {otherPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Weitere interessante Artikel
              </h2>
              <p className="text-gray-600">
                Entdecken Sie mehr Expertentipps und Fachwissen
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300">
                  <div className="relative">
                    <img 
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        {relatedPost.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{relatedPost.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                    
                    <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
                      <Link href={`/blog/${relatedPost.slug}`} className="flex items-center">
                        Weiterlesen
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

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
            
            <div className="flex justify-center items-center space-x-8 text-gray-400 text-sm mb-6">
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
                <a href="#" className="hover:text-white">Impressum</a>
                <a href="#" className="hover:text-white">Datenschutz</a>
                <a href="#" className="hover:text-white">AGB</a>
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