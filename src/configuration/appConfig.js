export const APP_CONFIG = {
  appName: 'NEXORA Download Center',
  appVersion: '1.0.0',

  getApiBaseUrl() {
    // Ab relative URL use karo - Cloudflare proxy handle karega
    if (window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1') {
      return 'http://localhost:3000';
    }
    // Production me same domain - no Railway URL needed!
    return '';
  },

  getDownloadsApiUrl() {
    return this.getApiBaseUrl() + '/api/downloads';
  }
};
