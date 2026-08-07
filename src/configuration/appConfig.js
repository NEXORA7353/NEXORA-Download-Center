export const APP_CONFIG = {
  appName: 'NEXORA Download Center',
  appVersion: '1.0.0',

  // ✅ HARDCODED Railway URL - koi dynamic resolver nahi
  BACKEND_URL: 'https://nexora7.up.railway.app',

  getApiBaseUrl() {
    return 'https://nexora7.up.railway.app';
  },

  getDownloadsApiUrl() {
    return 'https://nexora7.up.railway.app/api/downloads';
  }
};
