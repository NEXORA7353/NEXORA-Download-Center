const UPSTASH_URL = 'https://legible-loon-84378.upstash.io';
const UPSTASH_TOKEN = 'gQAAAAAAAUmaAAIgcDE5M2IwMjM4MTczZjA0ZWQ5YWUwYzYzNTU1YzIyYTQ3Mg';

export async function fetchDownloadConfig() {
  try {
    const res = await fetch(`${UPSTASH_URL}/get/nexora_download_config`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
    });
    const data = await res.json();
    if (data && data.result) {
      const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
      return { success: true, data: parsed };
    }
  } catch (e) {}

  return {
    success: true,
    data: {
      android: {
        version: "1.0.0",
        latestVersion: "1.0.0",
        minVersion: "1.0.0",
        minSupportedVersion: "1.0.0",
        fileSize: "6.62 MB",
        downloadUrl: "https://github.com/NEXORA7353/NEXORA/releases/latest/download/NEXORA.apk",
        apkUrl: "https://github.com/NEXORA7353/NEXORA/releases/latest/download/NEXORA.apk",
        checksum: "sha256:b04e2cadb9254fb8274bde4df526b372b2702885ec0ca6ce5b6bdbd81a240780",
        sha256: "sha256:b04e2cadb9254fb8274bde4df526b372b2702885ec0ca6ce5b6bdbd81a240780",
        releaseNotes: [
          "Initial Official Android Release",
          "Performance Improvements",
          "UI Enhancements",
          "Bug Fixes",
          "Security Improvements"
        ],
        maintenanceMode: false,
        forceUpdate: false
      },
      windows: {
        version: "1.8.0",
        latestVersion: "1.8.0",
        minVersion: "1.0.0",
        minSupportedVersion: "1.0.0",
        fileSize: "88.2 MB",
        downloadUrl: "https://github.com/NEXORA7353/NEXORA/releases/latest/download/NEXORA.Setup.1.0.0.exe",
        exeUrl: "https://github.com/NEXORA7353/NEXORA/releases/latest/download/NEXORA.Setup.1.0.0.exe",
        checksum: "sha256:2c5e529c5966e780365e13866067542156f3c5174c4026ca705c5dd957639c5e",
        sha256: "sha256:2c5e529c5966e780365e13866067542156f3c5174c4026ca705c5dd957639c5e",
        releaseNotes: [
          "Initial Official Android Release",
          "Performance Improvements",
          "UI Enhancements",
          "Bug Fixes",
          "Security Improvements"
        ],
        maintenanceMode: false,
        forceUpdate: false
      }
    }
  };
}

export async function verifyDownloadToken(payload) {
  return {
    success: true,
    token: 'NEX-SEC-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString()
  };
}

export async function trackDownloadEvent(payload) {
  return { success: true };
}
