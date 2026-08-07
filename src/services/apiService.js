const BACKEND_URL = 'https://nexora7.up.railway.app';

export async function request(path, options = {}) {
  // Clean path banao
  let cleanPath = path;
  if (!path.startsWith('http')) {
    // Relative path hai - Railway URL prefix karo
    cleanPath = BACKEND_URL + (path.startsWith('/') ? path : '/' + path);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    ...options
  };

  try {
    const response = await fetch(cleanPath, config);
    
    // Check karo response HTML to nahi (means Railway down hai)
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      throw new Error('Server returned HTML instead of JSON - backend may be down');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request error on ${cleanPath}:`, error.message);
    throw error;
  }
}
