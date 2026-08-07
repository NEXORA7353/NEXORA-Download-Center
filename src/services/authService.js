import { storage } from '../utilities/storage.js';

export function loginStudent(studentId, accessCode) {
  if (!studentId || !studentId.trim()) {
    throw new Error('Student ID is required');
  }

  const session = {
    studentId: studentId.trim().toUpperCase(),
    loginTime: new Date().toISOString(),
    token: 'NEX-STU-' + Math.random().toString(36).substr(2, 9).toUpperCase()
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
