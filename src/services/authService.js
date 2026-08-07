import { storage } from '../utilities/storage.js';

const BACKEND = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : '';

export async function loginStudent(name, email) {
  if (!name || name.trim().length < 3) {
    throw new Error('Please enter your full name (minimum 3 characters).');
  }
  if (!email || !isValidEmail(email.trim())) {
    throw new Error('Please enter a valid email address.');
  }

  try {
    const res = await fetch(`${BACKEND}/api/downloads/register-student`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim().toLowerCase()
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Registration failed.');
    }

    const data = await res.json();
    if (!data.success || !data.data) throw new Error('Invalid response.');

    const session = {
      studentId: data.data.studentId,
      name: data.data.name,
      email: data.data.email,
      registeredAt: data.data.registeredAt || new Date().toISOString(),
      lastActive: new Date().toISOString()
    };

    storage.setStudentSession(session);
    return session;

  } catch (err) {
    if (err.name === 'TypeError') {
      const session = makeOfflineSession(name.trim(), email.trim());
      storage.setStudentSession(session);
      return session;
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

function makeOfflineSession(name, email) {
  const year = new Date().getFullYear();
  return {
    studentId: `NEX-${year}-${Math.floor(10000 + Math.random() * 90000)}`,
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
