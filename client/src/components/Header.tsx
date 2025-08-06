import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoImage from "@assets/logo-grema-high_1753727835385.webp";

interface HeaderProps {
  currentPage?: string;
}

export function Header({ currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const services = [
    { href: "/unterhaltsreinigung", label: "Unterhaltsreinigung" },
    { href: "/glas-rahmenreinigung", label: "Glas- & Rahmenreinigung" },
    { href: "/sonderreinigung", label: "Sonderreinigung" },
    { href: "/bauabschlussreinigung", label: "Bauabschlussreinigung" },
    { href: "/entruempelung", label: "Entrümpelung" },
    { href: "/treppenhausreinigung", label: "Treppenhausreinigung" }
  ];

  const isServicePage = services.some(service => location === service.href);
  const isBlogPage = location.startsWith('/blog');

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src={logoImage}
              alt="Grema Gebäudeservice GmbH Logo" 
              className="h-14 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`font-medium ${location === '/' ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
            >
              Startseite
            </Link>
            
            {/* Services Dropdown - Hover Based */}
            <div className="relative group">
              <button 
                className={`flex items-center font-medium ${isServicePage ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
              >
                Dienstleistungen
                <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {services.map((service) => (
                    <Link 
                      key={service.href}
                      href={service.href}
                      className={`block px-4 py-3 text-sm font-medium transition-colors ${
                        location === service.href 
                          ? 'text-primary bg-primary/10' 
                          : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                      }`}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <Link 
              href="/blog" 
              className={`font-medium ${isBlogPage ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
            >
              Blog
            </Link>
            
            {currentPage === "home" ? (
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-medium text-gray-700 hover:text-primary transition-colors cursor-pointer"
              >
                Kontakt
              </a>
            ) : (
              <Link href="/#contact" className="font-medium text-gray-700 hover:text-primary transition-colors">
                Kontakt
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button asChild className="bg-primary text-white hover:bg-primary/90">
              <a href="tel:017634446399" className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Kostenloses Angebot anfordern
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
              <Link 
                href="/" 
                className={`font-medium ${location === '/' ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Startseite
              </Link>
              
              {/* Mobile Services */}
              <div className="pl-4">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Dienstleistungen</span>
                <div className="mt-2 space-y-2">
                  {services.map((service) => (
                    <Link 
                      key={service.href}
                      href={service.href} 
                      className={`block font-medium ${location === service.href ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link 
                href="/blog" 
                className={`font-medium ${isBlogPage ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              
              {currentPage === "home" ? (
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                  className="font-medium text-gray-700 hover:text-primary transition-colors cursor-pointer"
                >
                  Kontakt
                </a>
              ) : (
                <Link 
                  href="/#contact" 
                  className="font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Kontakt
                </Link>
              )}
              
              <Button asChild className="bg-primary text-white hover:bg-primary/90 w-full">
                <a href="tel:017634446399" className="flex items-center justify-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Kostenloses Angebot anfordern
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}