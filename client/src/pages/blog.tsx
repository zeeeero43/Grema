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
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import logoImage from "@assets/logo-grema-high_1753727835385.webp";

export default function Blog() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "Professionelle Büroreinigung in Moers: Was Sie beachten sollten",
      excerpt: "Erfahren Sie, worauf es bei der Auswahl eines Reinigungsdienstleisters für Ihr Büro ankommt. Von Qualitätsstandards bis zur optimalen Reinigungsfrequenz.",
      date: "15. Januar 2025",
      author: "Grema Team",
      category: "Büroreinigung",
      readTime: "5 Min.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Fensterreinigung mit Osmose-Technik: Streifenfreie Ergebnisse garantiert",
      excerpt: "Die modernste Technik für kristallklare Fenster. Wie die Osmose-Methode funktioniert und warum sie herkömmlichen Methoden überlegen ist.",
      date: "12. Januar 2025",
      author: "Grema Team",
      category: "Fensterreinigung",
      readTime: "4 Min.",
      image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Bauabschlussreinigung: Checkliste für perfekte Abnahme",
      excerpt: "Nach dem Bau ist vor der Übergabe. Mit unserer Checkliste stellen Sie sicher, dass Ihr Bauprojekt abnahmebereit ist und alle Baustaub-Rückstände entfernt sind.",
      date: "8. Januar 2025",
      author: "Grema Team",
      category: "Baureinigung",
      readTime: "6 Min.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Umweltgerechte Entrümpelung: Nachhaltigkeit bei Hausauflösungen",
      excerpt: "Wie wir bei Entrümpelungen auf Nachhaltigkeit achten. Vom Sortieren wiederverwertbarer Gegenstände bis zur fachgerechten Entsorgung.",
      date: "5. Januar 2025",
      author: "Grema Team",
      category: "Entrümpelung",
      readTime: "7 Min.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Hygienestandards in Praxen: Reinigung im Gesundheitswesen",
      excerpt: "Besondere Anforderungen an die Reinigung in Arztpraxen und medizinischen Einrichtungen. Desinfektionsprotokolle und Compliance-Standards.",
      date: "2. Januar 2025",
      author: "Grema Team",
      category: "Praxisreinigung",
      readTime: "8 Min.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Winterreinigung: Besondere Herausforderungen in der kalten Jahreszeit",
      excerpt: "Salz, Schneematsch und erhöhter Reinigungsaufwand. Wie wir Ihre Räume auch im Winter makellos sauber halten.",
      date: "28. Dezember 2024",
      author: "Grema Team",
      category: "Winterservice",
      readTime: "5 Min.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

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
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
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
                      <span>{post.date}</span>
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
                    <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
                      Weiterlesen
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
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
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
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