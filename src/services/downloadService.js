import { APP_CONFIG } from '../configuration/appConfig.js';
import { storage } from '../utilities/storage.js';

// ✅ Default config - Railway down hone par fallback
const DEFAULT_CONFIG = {
  published: true,
  globalMaintenance: false,
  android: {
    version: '1.0.0',
    latestVersion: '1.0.0',
    minVersion: '1.0.0',
    minSupportedVersion: '1.0.0',
    fileSize: '6.62 MB',
    downloadUrl: 'https://github.com/NEXORA7353/NEXORA/releases/latest/download/NEXORA.apk',
    apkUrl: 'https://github.com/NEXORA7353/NEXORA/releases/latest/download/NEXORA.apk',
    checksum: 'sha256:b04e2cadb9254fb8274bde4df526b372b2702885ec0ca6ce5b6bdbd81a240780',
    sha256: 'sha256:b04e2cadb9254fb8274bde4df526b372b2702885ec0ca6ce5b6bdbd81a240780',
    releaseDate: '2026-08-07',
    maintenance: false,
    maintenanceMode: false,
    forceUpdate: false,
    releaseNotes: [
      'Initial Official Android Release',
      'Performance Improvements',
      'UI Enhancements',
      'Bug Fixes',
      'Security Improvements'
    ]
  },
  windows: {
    version: '1.0.0',
    latestVersion: '1.0.0',
    minVersion: '1.0.0',
    minSupportedVersion: '1.0.0',
    fileSize: '88.2 MB',
    downloadUrl: 'https://github.com/NEXORA7353/NEXORA/releases/latest/download/NEXORA.Setup.1.0.0.exe',
    exeUrl: 'https://github.com/NEXORA7353/NEXORA/releases/latest/download/NEXORA.Setup.1.0.0.exe',
    checksum: 'sha256:2c5e529c5966e780365e13866067542156f3c5174c4026ca705c5dd957639c5e',
    sha256: 'sha256:2c5e529c5966e780365e13866067542156f3c5174c4026ca705c5dd957639c5e',
    releaseDate: '2026-08-07',
    maintenance: false,
    maintenanceMode: false,
    forceUpdate: false,
    releaseNotes: [
      'Initial Official Windows Release',
      'Performance Improvements',
      'UI Enhancements',
      'Bug Fixes',
      'Security Improvements'
    ]
  }
};

/**
 * ✅ FIXED: Railway se download config fetch karta hai
 * Upstash ko bypass nahi karta
 */
export async function getLiveDownloadConfig() {
  const apiUrl = APP_CONFIG.getApiBaseUrl() + '/api/downloads/config';

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data && data.success && data.data) {
      // Cache in localStorage
      try {
        localStorage.setItem('nexora_cached_config', JSON.stringify(data.data));
        localStorage.setItem('nexora_config_ts', Date.now().toString());
      } catch (e) { }
      return data.data;
    }

    throw new Error('Invalid response format');

  } catch (err) {
    console.warn('Railway config fetch failed:', err.message);

    // Try localStorage cache (5 min valid)
    try {
      const cached = localStorage.getItem('nexora_cached_config');
      const ts = parseInt(localStorage.getItem('nexora_config_ts') || '0');
      if (cached && (Date.now() - ts) < 5 * 60 * 1000) {
        console.info('Using cached config');
        return JSON.parse(cached);
      }
    } catch (e) { }

    // Return hardcoded default
    console.info('Using default config');
    return DEFAULT_CONFIG;
  }
}

/**
 * ✅ Secure Download Flow
 */
export async function executeSecureDownload(platform, releaseInfo, studentId) {
  const session = storage.getStudentSession() || {};
  const sId = studentId || session.studentId || 'NEX-ANONYMOUS';
  const apiBase = APP_CONFIG.getApiBaseUrl();

  // 1. Get download token from Railway
  let token = 'NEX-SEC-' + Math.random().toString(36).substr(2, 10).toUpperCase();
  try {
    const tokenRes = await fetch(`${apiBase}/api/downloads/verify-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        platform,
        version: releaseInfo.version || releaseInfo.latestVersion,
        studentId: sId
      })
    });
    if (tokenRes.ok) {
      const tokenData = await tokenRes.json();
      if (tokenData.success && tokenData.token) {
        token = tokenData.token;
      }
    }
  } catch (e) {
    console.warn('Token endpoint unreachable, using client-side token');
  }

  // 2. Track download telemetry
  try {
    await fetch(`${apiBase}/api/downloads/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        platform,
        version: releaseInfo.version || releaseInfo.latestVersion,
        studentId: sId,
        studentName: session.name || 'Student',
        studentEmail: session.email || ''
      })
    });
  } catch (e) { }

  // 3. Save to local history
  const historyItem = {
    id: token,
    platform,
    version: releaseInfo.version || releaseInfo.latestVersion,
    fileSize: releaseInfo.fileSize,
    downloadUrl: releaseInfo.downloadUrl || releaseInfo.apkUrl || releaseInfo.exeUrl,
    timestamp: new Date().toISOString(),
    status: 'COMPLETED'
  };
  storage.addDownloadHistory(historyItem);

  // 4. Trigger actual file download
  const targetUrl = releaseInfo.downloadUrl
    || releaseInfo.apkUrl
    || releaseInfo.exeUrl;

  if (targetUrl) {
    const link = document.createElement('a');
    link.href = targetUrl;
    link.target = '_blank';
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return historyItem;
}