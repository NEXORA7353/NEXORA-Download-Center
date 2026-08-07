import { storage } from '../utilities/storage.js';

const BACKEND_URL = 'https://nexora7.up.railway.app';

const DEFAULT_CONFIG = {
  published: true,
  globalMaintenance: false,
  android: {
    version: '1.0.0',
    latestVersion: '1.0.0',
    minVersion: '1.0.0',
    fileSize: '6.62 MB',
    downloadUrl: 'https://github.com/NEXORA7353/NEXORA/releases/latest/download/NEXORA.apk',
    apkUrl: 'https://github.com/NEXORA7353/NEXORA/releases/latest/download/NEXORA.apk',
    checksum: 'sha256:b04e2cadb9254fb8274bde4df526b372b2702885ec0ca6ce5b6bdbd81a240780',
    releaseDate: '2026-08-07',
    maintenance: false,
    forceUpdate: false,
    releaseNotes: [
      'Initial Official Android Release',
      'Performance Improvements',
      'Bug Fixes'
    ]
  },
  windows: {
    version: '1.0.0',
    latestVersion: '1.0.0',
    minVersion: '1.0.0',
    fileSize: '88.2 MB',
    downloadUrl: 'https://github.com/NEXORA7353/NEXORA/releases/latest/download/NEXORA.Setup.1.0.0.exe',
    exeUrl: 'https://github.com/NEXORA7353/NEXORA/releases/latest/download/NEXORA.Setup.1.0.0.exe',
    checksum: 'sha256:2c5e529c5966e780365e13866067542156f3c5174c4026ca705c5dd957639c5e',
    releaseDate: '2026-08-07',
    maintenance: false,
    forceUpdate: false,
    releaseNotes: [
      'Initial Official Windows Release',
      'Performance Improvements',
      'Bug Fixes'
    ]
  }
};

export async function getLiveDownloadConfig() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/downloads/config`, {
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });

    // ✅ HTML check - agar HTML aaya to Railway down hai
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      throw new Error('Railway returned HTML');
    }

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    if (data && data.data) {
      // Cache karo
      try {
        localStorage.setItem('nexora_config_cache', JSON.stringify(data.data));
        localStorage.setItem('nexora_config_ts', String(Date.now()));
      } catch (e) {}
      return data.data;
    }
    throw new Error('No data in response');

  } catch (err) {
    console.warn('Railway config failed:', err.message);

    // LocalStorage cache check (5 min valid)
    try {
      const cached = localStorage.getItem('nexora_config_cache');
      const ts = parseInt(localStorage.getItem('nexora_config_ts') || '0');
      if (cached && (Date.now() - ts) < 5 * 60 * 1000) {
        console.info('Using cached config');
        return JSON.parse(cached);
      }
    } catch (e) {}

    // Static fallback
    console.info('Using default config');
    return DEFAULT_CONFIG;
  }
}

export async function executeSecureDownload(platform, releaseInfo, studentId) {
  const session = storage.getStudentSession() || {};
  const sId = studentId || session.studentId || 'NEX-GUEST';

  // Token generate karo
  let token = 'NEX-' + Math.random().toString(36).substr(2, 10).toUpperCase();
  try {
    const tokenRes = await fetch(`${BACKEND_URL}/api/downloads/verify-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform, version: releaseInfo.version, studentId: sId })
    });
    if (tokenRes.ok) {
      const tokenData = await tokenRes.json();
      if (tokenData.token) token = tokenData.token;
    }
  } catch (e) {}

  // Track karo
  try {
    await fetch(`${BACKEND_URL}/api/downloads/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        platform,
        version: releaseInfo.version || '1.0.0',
        studentId: sId,
        studentName: session.name || 'Student',
        studentEmail: session.email || ''
      })
    });
  } catch (e) {}

  // History save karo
  const historyItem = {
    id: token,
    platform,
    version: releaseInfo.version || '1.0.0',
    fileSize: releaseInfo.fileSize,
    downloadUrl: releaseInfo.downloadUrl || releaseInfo.apkUrl || releaseInfo.exeUrl,
    timestamp: new Date().toISOString(),
    status: 'COMPLETED'
  };
  storage.addDownloadHistory(historyItem);

  // File download trigger karo
  const url = releaseInfo.downloadUrl || releaseInfo.apkUrl || releaseInfo.exeUrl;
  if (url) {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return historyItem;
}
