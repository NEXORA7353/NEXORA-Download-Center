import { APP_CONFIG } from '../configuration/appConfig.js';

export async function request(path, options = {}) {
  const backendHost = 'https://nexora7.up.railway.app';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const endpoint = `${backendHost}${cleanPath}`;

  console.log(`[API REQUEST DEBUG] Fetching: ${endpoint}`, options);

  const defaults = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  const config = { ...defaults, ...options };
  
  try {
    const response = await fetch(endpoint, config);
    console.log(`[API RESPONSE DEBUG] Status: ${response.status} from ${endpoint}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`[API ERROR DEBUG] Request failed on ${endpoint}:`, error);
    throw error;
  }
}
