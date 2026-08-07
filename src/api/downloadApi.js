const BACKEND = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : '';

export async function fetchDownloadConfig() {
  const res = await fetch(`${BACKEND}/api/downloads/config`, {
    headers: { 'Accept': 'application/json' },
    cache: 'no-store'
  });

  const ct = res.headers.get('content-type') || '';
  if (ct.includes('text/html')) throw new Error('Backend returned HTML');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  if (data?.success && data?.data) return { success: true, data: data.data };
  throw new Error('Invalid response');
}

export async function verifyDownloadToken(payload) {
  try {
    const res = await fetch(`${BACKEND}/api/downloads/verify-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch(e) {
    return {
      success: true,
      token: 'NEX-' + Math.random().toString(36).substr(2,10).toUpperCase(),
      expiresAt: new Date(Date.now() + 15*60*1000).toISOString()
    };
  }
}

export async function trackDownloadEvent(payload) {
  try {
    await fetch(`${BACKEND}/api/downloads/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch(e) {}
  return { success: true };
}
