// GDPR-konformes Google Analytics Management
// Lädt Analytics nur wenn der User explizit zugestimmt hat

const GTAG_ID = 'AW-17444108463';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Prüft ob Analytics-Consent vorliegt
export const hasAnalyticsConsent = (): boolean => {
  try {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) return false;
    
    const preferences = JSON.parse(consent);
    return preferences.analytics === true;
  } catch {
    return false;
  }
};

// Lädt Google Analytics Script nur wenn Consent vorliegt
export const loadGoogleAnalytics = (): void => {
  if (!hasAnalyticsConsent()) {
    console.log('🍪 Google Analytics nicht geladen - kein Consent');
    return;
  }

  // Prüfen ob bereits geladen
  if (typeof window.gtag === 'function') {
    console.log('📊 Google Analytics bereits geladen');
    return;
  }

  console.log('📊 Lade Google Analytics mit Consent...');

  // DataLayer initialisieren
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  // Google Analytics Script laden
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`;
  document.head.appendChild(script);

  // Nach dem Laden konfigurieren
  script.onload = () => {
    window.gtag('js', new Date());
    window.gtag('config', GTAG_ID, {
      anonymize_ip: true, // IP-Anonymisierung für GDPR
      cookie_flags: 'SameSite=None;Secure' // Cookie-Sicherheit
    });
    console.log('✅ Google Analytics geladen und konfiguriert');
  };
};

// Entfernt Google Analytics komplett
export const removeGoogleAnalytics = (): void => {
  console.log('🗑️ Entferne Google Analytics...');
  
  // Alle Google Analytics Cookies löschen
  const gaCookies = document.cookie.split(';').filter(cookie => 
    cookie.trim().startsWith('_ga') || 
    cookie.trim().startsWith('_gid') ||
    cookie.trim().startsWith('_gat')
  );

  gaCookies.forEach(cookie => {
    const cookieName = cookie.split('=')[0].trim();
    // Löschen für verschiedene Domain-Pfade
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname};`;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname};`;
  });

  // DataLayer zurücksetzen
  if (window.dataLayer) {
    window.dataLayer.length = 0;
  }

  // Script-Tag entfernen
  const scripts = document.querySelectorAll(`script[src*="googletagmanager.com/gtag/js"]`);
  scripts.forEach(script => script.remove());

  console.log('✅ Google Analytics vollständig entfernt');
};

// Tracking-Events (nur wenn Consent)
export const trackEvent = (eventName: string, parameters?: object): void => {
  if (!hasAnalyticsConsent() || typeof window.gtag !== 'function') {
    console.log('🍪 Event nicht getracked - kein Analytics Consent:', eventName);
    return;
  }

  window.gtag('event', eventName, parameters);
  console.log('📊 Event getracked:', eventName, parameters);
};

// Pageview tracking (nur wenn Consent)
export const trackPageView = (pagePath: string): void => {
  if (!hasAnalyticsConsent() || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('config', GTAG_ID, {
    page_path: pagePath
  });
  console.log('📊 Pageview getracked:', pagePath);
};

// Initialisiert Analytics basierend auf aktueller Consent-Situation
export const initializeAnalytics = (): void => {
  if (hasAnalyticsConsent()) {
    loadGoogleAnalytics();
  } else {
    removeGoogleAnalytics();
  }
};