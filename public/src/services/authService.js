import { storage } from '../utilities/storage.js';
import { request } from './apiService.js';

export async function loginStudent(fullName, email) {
  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 3) {
    throw new Error('Please enter your full name (minimum 3 characters). Do not use short abbreviations.');
  }

  const cleanName = fullName.trim();
  const cleanEmail = email ? email.trim().toLowerCase() : '';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    throw new Error('Please enter a valid email address (e.g. student@gmail.com).');
  }

  // Generate Unique Student ID
  const year = new Date().getFullYear();
  const randNum = Math.floor(10000 + Math.random() * 90000);
  const uniqueStudentId = `NEX-${year}-${randNum}`;

  const payload = {
    name: cleanName,
    email: cleanEmail,
    studentId: uniqueStudentId
  };

  // Register with backend server
  try {
    const res = await request('/api/downloads/register-student', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    if (res && res.success && res.data) {
      storage.setStudentSession(res.data);
      return res.data;
    }
  } catch (e) {
    console.warn('Backend student registration warning:', e.message);
  }

  // Local session fallback
  const session = {
    studentId: uniqueStudentId,
    name: cleanName,
    email: cleanEmail,
    registeredAt: new Date().toISOString()
  };
  storage.setStudentSession(session);
  return session;
}

export function getCurrentStudent() {
  return storage.getStudentSession();
}

export function logoutStudent() {
  storage.clearStudentSession();
}
