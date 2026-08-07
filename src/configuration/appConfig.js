export const APP_CONFIG = {
  appName: 'NEXORA Download Center',
  appVersion: '1.0.0',
  tokenExpiryMinutes: 15,

  // ✅ Railway Backend URL - Yahan apna URL dalo
  RAILWAY_URL: 'https://nexora7.up.railway.app',

  getApiBaseUrl() {
    // 1. Runtime override (index.html me set kar sakte ho)
    if (window.NEXORA_BACKEND_URL) {
      return window.NEXORA_BACKEND_URL.replace(/\/$/, '');
    }
    // 2. localStorage override (debugging ke liye)
    try {
      const stored = localStorage.getItem('nexora_backend_url');
      if (stored && stored.startsWith('http')) {
        return stored.replace(/\/$/, '');
      }
    } catch (e) { }

    // 3. Same origin check (agar Cloudflare Pages pe deploy hai)
    if (window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1') {
      return 'https://nexora7.up.railway.app';
    }

    // 4. Local development
    return 'http://localhost:3000';
  },

  getDownloadsApiUrl() {
    return this.getApiBaseUrl() + '/api/downloads';
  }
};