// Cookie utility functions for GDPR compliance

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export const getCookieValue = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

export const setCookie = (name: string, value: string, days: number = 365) => {
  if (typeof document === 'undefined') return;
  
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Strict; Secure`;
};

export const deleteCookie = (name: string) => {
  if (typeof document === 'undefined') return;
  
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict`;
};

export const getCookiePreferences = (): CookiePreferences | null => {
  if (typeof window === 'undefined') return null;
  
  const consent = localStorage.getItem('cookie-consent');
  if (!consent) return null;
  
  try {
    return JSON.parse(consent);
  } catch {
    return null;
  }
};

export const hasConsent = (type: keyof CookiePreferences): boolean => {
  const preferences = getCookiePreferences();
  if (!preferences) return false;
  
  return preferences[type];
};

export const isAnalyticsAllowed = (): boolean => {
  return hasConsent('analytics');
};

export const isFunctionalAllowed = (): boolean => {
  return hasConsent('functional');
};

export const isMarketingAllowed = (): boolean => {
  return hasConsent('marketing');
};

export const getConsentDate = (): Date | null => {
  if (typeof window === 'undefined') return null;
  
  const date = localStorage.getItem('cookie-consent-date');
  if (!date) return null;
  
  return new Date(date);
};

export const isConsentExpired = (): boolean => {
  const consentDate = getConsentDate();
  if (!consentDate) return true;
  
  // Consent expires after 13 months (GDPR recommendation)
  const expirationDate = new Date(consentDate.getTime() + 13 * 30 * 24 * 60 * 60 * 1000);
  return new Date() > expirationDate;
};

// Cookie categories with descriptions
export const cookieCategories = {
  necessary: {
    name: 'Notwendige Cookies',
    description: 'Diese Cookies sind für das ordnungsgemäße Funktionieren der Website erforderlich.',
    examples: ['Sitzungsdaten', 'Sicherheits-Token', 'Website-Funktionalität'],
    canDisable: false,
  },
  analytics: {
    name: 'Analyse Cookies',
    description: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren.',
    examples: ['Seitenaufrufe', 'Verweildauer', 'beliebte Inhalte'],
    canDisable: true,
  },
  functional: {
    name: 'Funktionale Cookies',
    description: 'Diese Cookies ermöglichen erweiterte Funktionen und Personalisierung.',
    examples: ['Spracheinstellungen', 'personalisierte Inhalte', 'Chat-Funktionen'],
    canDisable: true,
  },
  marketing: {
    name: 'Marketing Cookies',
    description: 'Diese Cookies werden für personalisierte Werbung verwendet.',
    examples: ['Werbung', 'Retargeting', 'Social Media Integration'],
    canDisable: true,
  },
};

// Specific cookie management functions
export const setNecessaryCookies = () => {
  setCookie('site-preferences', 'accepted');
  setCookie('csrf-token', generateCSRFToken());
};

export const setAnalyticsCookies = () => {
  if (isAnalyticsAllowed()) {
    setCookie('analytics-enabled', 'true');
    // Initialize analytics tracking here
  }
};

export const setFunctionalCookies = () => {
  if (isFunctionalAllowed()) {
    setCookie('functional-enabled', 'true');
    // Initialize functional features here
  }
};

export const setMarketingCookies = () => {
  if (isMarketingAllowed()) {
    setCookie('marketing-enabled', 'true');
    // Initialize marketing tracking here
  }
};

const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Clean up cookies when consent is withdrawn
export const cleanupCookies = (preferences: CookiePreferences) => {
  if (!preferences.analytics) {
    deleteCookie('analytics-enabled');
    deleteCookie('_ga');
    deleteCookie('_ga_*');
    deleteCookie('_gid');
  }
  
  if (!preferences.functional) {
    deleteCookie('functional-enabled');
    deleteCookie('user-preferences');
  }
  
  if (!preferences.marketing) {
    deleteCookie('marketing-enabled');
    deleteCookie('_fbp');
    deleteCookie('_fbc');
  }
};