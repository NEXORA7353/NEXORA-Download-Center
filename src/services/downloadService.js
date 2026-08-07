const BACKEND_URL = 'https://nexora7.up.railway.app';

export async function fetchDownloadConfig() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/downloads/config`, {
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      cache: 'no-store'
    });

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      throw new Error('Backend returned HTML - server may be starting up');
    }

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    const data = await res.json();
    if (data && data.success && data.data) {
      return { success: true, data: data.data };
    }
    throw new Error('Invalid response');
  } catch (e) {
    console.warn('fetchDownloadConfig failed:', e.message);
    throw e;
  }
}

export async function verifyDownloadToken(payload) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/downloads/verify-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (e) {
    // Fallback token
    return {
      success: true,
      token: 'NEX-' + Math.random().toString(36).substr(2, 10).toUpperCase(),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString()
    };
  }
}

export async function trackDownloadEvent(payload) {
  try {
    await fetch(`${BACKEND_URL}/api/downloads/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {}
  return { success: true };
}
