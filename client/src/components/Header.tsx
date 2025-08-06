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
    { href: "/unterhaltsreinigung", label: "Büroreinigung" },
    { href: "/fensterreinigung", label: "Fensterreinigung" },
    { href: "/bauabschlussreinigung", label: "Baureinigung" },
    { href: "/entruempelung", label: "Entrümpelung" }
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
              className="h-12 w-auto"
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
            
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className={`flex items-center font-medium ${isServicePage ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
                >
                  Dienstleistungen
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {services.map((service) => (
                  <DropdownMenuItem key={service.href} asChild>
                    <Link 
                      href={service.href}
                      className={`w-full font-medium ${location === service.href ? 'text-primary bg-primary/10' : 'text-gray-700 hover:text-primary'}`}
                    >
                      {service.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link 
              href="/blog" 
              className={`font-medium ${isBlogPage ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
            >
              Blog
            </Link>
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
  );
}