import { request } from '../services/apiService.js';

export async function fetchDownloadConfig() {
  return request('/api/downloads/config');
}

export async function verifyDownloadToken(payload) {
  return request('/api/downloads/verify-token', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function trackDownloadEvent(payload) {
  return request('/api/downloads/track', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}
