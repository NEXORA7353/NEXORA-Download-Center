import { storage } from '../utilities/storage.js';

// Relative URL - Cloudflare proxy handle karega
const BACKEND = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000' 
  : '';

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
    const res = await fetch(`${BACKEND}/api/downloads/config`, {
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });

    const ct = res.headers.get('content-type') || '';
    if (ct.includes('text/html')) throw new Error('HTML received');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    if (data?.data) {
      try {
        localStorage.setItem('nexora_config_cache', JSON.stringify(data.data));
        localStorage.setItem('nexora_config_ts', String(Date.now()));
      } catch(e) {}
      return data.data;
    }
    throw new Error('No data');

  } catch (err) {
    console.warn('Config fetch failed:', err.message);

    try {
      const cached = localStorage.getItem('nexora_config_cache');
      const ts = parseInt(localStorage.getItem('nexora_config_ts') || '0');
      if (cached && (Date.now() - ts) < 300000) {
        return JSON.parse(cached);
      }
    } catch(e) {}

    return DEFAULT_CONFIG;
  }
}

export async function executeSecureDownload(platform, releaseInfo, studentId) {
  const session = storage.getStudentSession() || {};
  const sId = studentId || session.studentId || 'NEX-GUEST';

  let token = null;
  try {
    const res = await fetch(`${BACKEND}/api/downloads/request-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        platform,
        studentId: sId
      })
    });
    if (res.ok) {
      const d = await res.json();
      if (d.token) token = d.token;
    }
  } catch(e) {}

  try {
    await fetch(`${BACKEND}/api/downloads/track`, {
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
  } catch(e) {}

  const item = {
    id: token || ('NEX-' + Math.random().toString(36).substr(2,10).toUpperCase()),
    platform,
    version: releaseInfo.version || '1.0.0',
    fileSize: releaseInfo.fileSize,
    downloadUrl: token ? `${BACKEND}/api/downloads/secure/${token}` : '#',
    timestamp: new Date().toISOString(),
    status: 'COMPLETED'
  };
  storage.addDownloadHistory(item);

  // Trigger secure stream download (No GitHub URL exposed!)
  if (token) {
    window.location.href = `${BACKEND}/api/downloads/secure/${token}`;
  } else {
    const fallbackUrl = releaseInfo.downloadUrl || releaseInfo.apkUrl || releaseInfo.exeUrl;
    if (fallbackUrl) {
      const a = document.createElement('a');
      a.href = fallbackUrl;
      a.target = '_blank';
      a.setAttribute('download', '');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  return item;
}
