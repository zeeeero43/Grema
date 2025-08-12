import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { SEOHead } from "../components/seo/SEOHead";
import { CookiePreferencesComponent } from "@/components/CookiePreferences";
import type { CookiePreferences } from "@/utils/cookies";

function CookieEinstellungen() {
  const [showSuccess, setShowSuccess] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSavePreferences = (preferences: CookiePreferences) => {
    // Save preferences
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    
    // Apply cookie settings
    applyCookieSettings(preferences);
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const applyCookieSettings = (prefs: CookiePreferences) => {
    // Set necessary cookies (always allowed)
    document.cookie = "site-preferences=accepted; path=/; max-age=" + (365 * 24 * 60 * 60) + "; SameSite=Strict";
    
    if (prefs.analytics) {
      document.cookie = "analytics-enabled=true; path=/; max-age=" + (365 * 24 * 60 * 60) + "; SameSite=Strict";
    } else {
      document.cookie = "analytics-enabled=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    if (prefs.functional) {
      document.cookie = "functional-enabled=true; path=/; max-age=" + (365 * 24 * 60 * 60) + "; SameSite=Strict";
    } else {
      document.cookie = "functional-enabled=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    if (prefs.marketing) {
      document.cookie = "marketing-enabled=true; path=/; max-age=" + (365 * 24 * 60 * 60) + "; SameSite=Strict";
    } else {
      document.cookie = "marketing-enabled=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Cookie-Einstellungen | Grema Gebäudeservice GmbH - Moers"
        description="Verwalten Sie Ihre Cookie-Präferenzen für die Website von Grema Gebäudeservice GmbH. DSGVO-konforme Cookie-Einstellungen für Analyse, Funktionalität und Marketing."
        keywords="Cookie-Einstellungen, DSGVO, Cookie-Verwaltung, Grema Gebäudeservice, Moers, Datenschutz"
        canonicalUrl="/cookie-einstellungen"
        ogType="website"
      />
      
      {/* Header */}
      <Header currentPage="" />

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
          ✅ Cookie-Einstellungen erfolgreich gespeichert!
        </div>
      )}

      <main className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <CookiePreferencesComponent onSave={handleSavePreferences} />
        </div>
      </main>
    </div>
  );
}

export default CookieEinstellungen;