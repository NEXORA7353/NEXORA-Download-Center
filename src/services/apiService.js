import { APP_CONFIG } from '../configuration/appConfig.js';

export async function request(path, options = {}) {
  const baseUrl = APP_CONFIG.getApiBaseUrl();
  const cleanPath = path.startsWith('/api/downloads') ? path.replace('/api/downloads', '') : path;
  const endpoint = `${baseUrl}${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}`;

  const defaults = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  const config = { ...defaults, ...options };
  
  try {
    const response = await fetch(endpoint, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API request error on ${endpoint}:`, error);
    throw error;
  }
}
