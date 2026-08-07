/**
 * Global application environment configuration for NEXORA Download Center
 * Supports separate domain deployment on Vercel & Netlify
 */

export const APP_CONFIG = {
  appName: 'NEXORA Download Center',
  appVersion: '1.0.0',
  tokenExpiryMinutes: 15,
  supportEmail: 'support@nexora.edu',
  telegramChannel: 'https://t.me/telegram',
  
  // Dynamic API host resolver for multi-domain deployment
  getApiBaseUrl() {
    // 1. Check custom runtime window config
    if (window.NEXORA_BACKEND_URL) {
      return window.NEXORA_BACKEND_URL.replace(/\/$/, '') + '/api/downloads';
    }
    // 2. Check localStorage override
    try {
      const stored = localStorage.getItem('nexora_backend_url');
      if (stored) return stored.replace(/\/$/, '') + '/api/downloads';
    } catch (e) {}

    // 3. Railway backend fallback
    return 'https://nexora7.up.railway.app/api/downloads';
  }
};
