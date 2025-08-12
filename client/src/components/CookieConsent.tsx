import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Cookie, Settings, X, CheckCircle, Info } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always true, can't be disabled
  analytics: false,
  marketing: false,
  functional: false,
};

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const saved = JSON.parse(consent);
      setPreferences(saved);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);
    
    // Apply cookie settings
    applyCookieSettings(prefs);
  };

  const applyCookieSettings = (prefs: CookiePreferences) => {
    // Set necessary cookies (always allowed)
    document.cookie = "site-preferences=accepted; path=/; max-age=" + (365 * 24 * 60 * 60) + "; SameSite=Strict";
    
    if (prefs.analytics) {
      // Enable analytics cookies here
      document.cookie = "analytics-enabled=true; path=/; max-age=" + (365 * 24 * 60 * 60) + "; SameSite=Strict";
    } else {
      // Remove analytics cookies
      document.cookie = "analytics-enabled=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    if (prefs.functional) {
      // Enable functional cookies
      document.cookie = "functional-enabled=true; path=/; max-age=" + (365 * 24 * 60 * 60) + "; SameSite=Strict";
    } else {
      // Remove functional cookies
      document.cookie = "functional-enabled=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    if (prefs.marketing) {
      // Enable marketing cookies
      document.cookie = "marketing-enabled=true; path=/; max-age=" + (365 * 24 * 60 * 60) + "; SameSite=Strict";
    } else {
      // Remove marketing cookies
      document.cookie = "marketing-enabled=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    savePreferences(allAccepted);
  };

  const acceptNecessary = () => {
    savePreferences(defaultPreferences);
  };

  const handlePreferenceChange = (key: keyof CookiePreferences, value: boolean) => {
    if (key === 'necessary') return; // Can't change necessary cookies
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  if (!showBanner && !showSettings) return null;

  return (
    <>
      {/* Cookie Consent Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t-2 border-primary shadow-lg">
          <div className="max-w-7xl mx-auto">
            <Card className="border-0 shadow-none">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <Cookie className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Wir verwenden Cookies
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Wir nutzen Cookies, um Ihnen die bestmögliche Nutzung unserer Website zu ermöglichen. 
                        Einige Cookies sind für das Funktionieren der Website erforderlich, während andere uns helfen, 
                        die Website zu verbessern. Sie können Ihre Einstellungen jederzeit anpassen.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSettings(true)}
                      className="flex items-center gap-2 whitespace-nowrap"
                    >
                      <Settings className="w-4 h-4" />
                      Einstellungen
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={acceptNecessary}
                      className="whitespace-nowrap"
                    >
                      Nur Notwendige
                    </Button>
                    <Button
                      size="sm"
                      onClick={acceptAll}
                      className="bg-primary hover:bg-primary/90 whitespace-nowrap"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Alle Akzeptieren
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Cookie Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cookie className="w-5 h-5 text-primary" />
              Cookie-Einstellungen
            </DialogTitle>
            <DialogDescription>
              Verwalten Sie Ihre Cookie-Präferenzen. Sie können diese Einstellungen jederzeit ändern.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Necessary Cookies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Notwendige Cookies
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Diese Cookies sind für das ordnungsgemäße Funktionieren der Website erforderlich 
                    und können nicht deaktiviert werden.
                  </p>
                </div>
                <Switch 
                  checked={true} 
                  disabled={true}
                  className="opacity-50"
                />
              </div>
              <div className="text-xs text-gray-500 ml-6">
                Beispiele: Sitzungsdaten, Sicherheits-Token, Website-Funktionalität
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="space-y-3 border-t pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    Analyse Cookies
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, 
                    damit wir sie verbessern können.
                  </p>
                </div>
                <Switch 
                  checked={preferences.analytics}
                  onCheckedChange={(checked) => handlePreferenceChange('analytics', checked)}
                />
              </div>
              <div className="text-xs text-gray-500 ml-6">
                Beispiele: Seitenaufrufe, Verweildauer, beliebte Inhalte
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="space-y-3 border-t pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Settings className="w-4 h-4 text-purple-600" />
                    Funktionale Cookies
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Diese Cookies ermöglichen erweiterte Funktionen und Personalisierung der Website.
                  </p>
                </div>
                <Switch 
                  checked={preferences.functional}
                  onCheckedChange={(checked) => handlePreferenceChange('functional', checked)}
                />
              </div>
              <div className="text-xs text-gray-500 ml-6">
                Beispiele: Spracheinstellungen, personalisierte Inhalte, Chat-Funktionen
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="space-y-3 border-t pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-600" />
                    Marketing Cookies
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Diese Cookies werden verwendet, um Ihnen relevante Werbung zu zeigen 
                    und die Wirksamkeit unserer Kampagnen zu messen.
                  </p>
                </div>
                <Switch 
                  checked={preferences.marketing}
                  onCheckedChange={(checked) => handlePreferenceChange('marketing', checked)}
                />
              </div>
              <div className="text-xs text-gray-500 ml-6">
                Beispiele: Werbung, Retargeting, Social Media Integration
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => savePreferences(defaultPreferences)}
              className="flex-1"
            >
              Nur Notwendige
            </Button>
            <Button
              onClick={() => savePreferences(preferences)}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Einstellungen Speichern
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Weitere Informationen finden Sie in unserer{" "}
            <a href="/datenschutz" className="text-primary hover:underline">
              Datenschutzerklärung
            </a>
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}