import { APP_CONFIG } from '../configuration/appConfig.js';
import { storage } from '../utilities/storage.js';

/**
 * Register/Login student via Railway backend
 * Returns student session object
 */
export async function loginStudent(name, email) {
  // Validate inputs
  if (!name || name.trim().length < 3) {
    throw new Error('Please enter your full name (minimum 3 characters).');
  }
  if (!email || !isValidEmail(email.trim())) {
    throw new Error('Please enter a valid email address.');
  }

  const apiBase = APP_CONFIG.getApiBaseUrl().replace('/api/downloads', '');

  try {
    const response = await fetch(`${apiBase}/api/downloads/register-student`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim().toLowerCase()
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Registration failed. Please try again.');
    }

    const data = await response.json();

    if (!data.success || !data.data) {
      throw new Error('Invalid server response. Please try again.');
    }

    const session = {
      studentId: data.data.studentId,
      name: data.data.name,
      email: data.data.email,
      registeredAt: data.data.registeredAt || new Date().toISOString(),
      lastActive: new Date().toISOString()
    };

    // Save session to localStorage
    storage.setStudentSession(session);
    return session;

  } catch (err) {
    // Network error - generate offline session
    if (err.name === 'TypeError' || err.message.includes('fetch')) {
      console.warn('Backend unreachable, generating offline session');
      const offlineSession = generateOfflineSession(name.trim(), email.trim());
      storage.setStudentSession(offlineSession);
      return offlineSession;
    }
    throw err;
  }
}

export function logoutStudent() {
  storage.clearStudentSession();
}

export function getCurrentStudent() {
  return storage.getStudentSession();
}

function generateOfflineSession(name, email) {
  const year = new Date().getFullYear();
  const randId = `NEX-${year}-${Math.floor(10000 + Math.random() * 90000)}`;
  return {
    studentId: randId,
    name,
    email: email.toLowerCase(),
    registeredAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    offlineGenerated: true
  };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
