import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Cookie, Settings, Info, CheckCircle, X } from "lucide-react";
import { getCookiePreferences, type CookiePreferences } from "@/utils/cookies";

interface CookiePreferencesComponentProps {
  onSave: (preferences: CookiePreferences) => void;
  initialPreferences?: CookiePreferences | null;
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

export function CookiePreferencesComponent({ 
  onSave, 
  initialPreferences = null 
}: CookiePreferencesComponentProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>(
    initialPreferences || getCookiePreferences() || defaultPreferences
  );

  const handlePreferenceChange = (key: keyof CookiePreferences, value: boolean) => {
    if (key === 'necessary') return; // Can't change necessary cookies
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(preferences);
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(allAccepted);
    onSave(allAccepted);
  };

  const acceptNecessaryOnly = () => {
    setPreferences(defaultPreferences);
    onSave(defaultPreferences);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Cookie className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900">Cookie-Einstellungen</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Verwalten Sie Ihre Cookie-Präferenzen. Diese Einstellungen bestimmen, 
          welche Cookies auf Ihrem Gerät gespeichert werden dürfen.
        </p>
      </div>

      {/* Cookie Categories */}
      <div className="space-y-6">
        {/* Necessary Cookies */}
        <Card className="border-2 border-green-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <CardTitle className="text-xl">Notwendige Cookies</CardTitle>
              </div>
              <Switch 
                checked={true} 
                disabled={true}
                className="opacity-50"
              />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">
              Diese Cookies sind für das ordnungsgemäße Funktionieren der Website erforderlich 
              und können nicht deaktiviert werden. Ohne diese Cookies können grundlegende 
              Funktionen der Website nicht bereitgestellt werden.
            </p>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-green-800 mb-1">Beispiele:</p>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Sitzungsdaten und Authentifizierung</li>
                <li>• Sicherheits-Token (CSRF-Schutz)</li>
                <li>• Website-Funktionalität und Navigation</li>
                <li>• Cookie-Einwilligung speichern</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Cookies */}
        <Card className={`border-2 ${preferences.analytics ? 'border-blue-200' : 'border-gray-200'}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Info className="w-6 h-6 text-blue-600" />
                <CardTitle className="text-xl">Analyse-Cookies</CardTitle>
              </div>
              <Switch 
                checked={preferences.analytics}
                onCheckedChange={(checked) => handlePreferenceChange('analytics', checked)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">
              Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, 
              indem Informationen anonym gesammelt und analysiert werden. Dies hilft uns, 
              die Website zu verbessern.
            </p>
            <div className={`p-3 rounded-lg ${preferences.analytics ? 'bg-blue-50' : 'bg-gray-50'}`}>
              <p className={`text-sm font-medium mb-1 ${preferences.analytics ? 'text-blue-800' : 'text-gray-700'}`}>
                Beispiele:
              </p>
              <ul className={`text-sm space-y-1 ${preferences.analytics ? 'text-blue-700' : 'text-gray-600'}`}>
                <li>• Seitenaufrufe und Verweildauer</li>
                <li>• Beliebte Inhalte und Navigation</li>
                <li>• Anonyme Nutzungsstatistiken</li>
                <li>• Performance-Überwachung</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Functional Cookies */}
        <Card className={`border-2 ${preferences.functional ? 'border-purple-200' : 'border-gray-200'}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-purple-600" />
                <CardTitle className="text-xl">Funktionale Cookies</CardTitle>
              </div>
              <Switch 
                checked={preferences.functional}
                onCheckedChange={(checked) => handlePreferenceChange('functional', checked)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">
              Diese Cookies ermöglichen erweiterte Funktionen und Personalisierung der Website. 
              Sie verbessern Ihr Nutzungserlebnis durch individuelle Anpassungen.
            </p>
            <div className={`p-3 rounded-lg ${preferences.functional ? 'bg-purple-50' : 'bg-gray-50'}`}>
              <p className={`text-sm font-medium mb-1 ${preferences.functional ? 'text-purple-800' : 'text-gray-700'}`}>
                Beispiele:
              </p>
              <ul className={`text-sm space-y-1 ${preferences.functional ? 'text-purple-700' : 'text-gray-600'}`}>
                <li>• Spracheinstellungen merken</li>
                <li>• Personalisierte Inhalte</li>
                <li>• Chat-Funktionen und Support</li>
                <li>• Formular-Daten zwischenspeichern</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Marketing Cookies */}
        <Card className={`border-2 ${preferences.marketing ? 'border-red-200' : 'border-gray-200'}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <X className="w-6 h-6 text-red-600" />
                <CardTitle className="text-xl">Marketing-Cookies</CardTitle>
              </div>
              <Switch 
                checked={preferences.marketing}
                onCheckedChange={(checked) => handlePreferenceChange('marketing', checked)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">
              Diese Cookies werden verwendet, um Ihnen relevante Werbung zu zeigen und 
              die Wirksamkeit unserer Marketingkampagnen zu messen. Sie können zur 
              Profilbildung verwendet werden.
            </p>
            <div className={`p-3 rounded-lg ${preferences.marketing ? 'bg-red-50' : 'bg-gray-50'}`}>
              <p className={`text-sm font-medium mb-1 ${preferences.marketing ? 'text-red-800' : 'text-gray-700'}`}>
                Beispiele:
              </p>
              <ul className={`text-sm space-y-1 ${preferences.marketing ? 'text-red-700' : 'text-gray-600'}`}>
                <li>• Personalisierte Werbung</li>
                <li>• Retargeting und Remarketing</li>
                <li>• Social Media Integration</li>
                <li>• Conversion-Tracking</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t">
        <Button
          variant="outline"
          size="lg"
          onClick={acceptNecessaryOnly}
          className="flex-1"
        >
          Nur Notwendige akzeptieren
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={handleSave}
          className="flex-1"
        >
          Einstellungen speichern
        </Button>
        <Button
          size="lg"
          onClick={acceptAll}
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          Alle akzeptieren
        </Button>
      </div>

      {/* Additional Information */}
      <div className="text-center text-sm text-gray-500 pt-4">
        <p>
          Ihre Einstellungen werden für 13 Monate gespeichert. Weitere Informationen finden Sie in unserer{" "}
          <a href="/datenschutz" className="text-primary hover:underline">
            Datenschutzerklärung
          </a>.
        </p>
      </div>
    </div>
  );
}