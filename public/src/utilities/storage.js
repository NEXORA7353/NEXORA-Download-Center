/**
 * LocalStorage wrapper with error resilience
 */

const STORAGE_KEYS = {
  THEME: 'nexora_dl_theme',
  STUDENT_SESSION: 'nexora_student_session',
  DOWNLOAD_HISTORY: 'nexora_download_history'
};

export const storage = {
  getTheme() {
    try { return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark'; } catch (e) { return 'dark'; }
  },
  setTheme(theme) {
    try { localStorage.setItem(STORAGE_KEYS.THEME, theme); } catch (e) {}
  },
  getStudentSession() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STUDENT_SESSION);
      return data ? JSON.parse(data) : null;
    } catch (e) { return null; }
  },
  setStudentSession(session) {
    try { localStorage.setItem(STORAGE_KEYS.STUDENT_SESSION, JSON.stringify(session)); } catch (e) {}
  },
  clearStudentSession() {
    try { localStorage.removeItem(STORAGE_KEYS.STUDENT_SESSION); } catch (e) {}
  },
  getDownloadHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DOWNLOAD_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) { return []; }
  },
  addDownloadHistory(item) {
    try {
      const history = this.getDownloadHistory();
      const updated = [item, ...history].slice(0, 50);
      localStorage.setItem(STORAGE_KEYS.DOWNLOAD_HISTORY, JSON.stringify(updated));
      return updated;
    } catch (e) { return []; }
  },
  clearDownloadHistory() {
    try { localStorage.removeItem(STORAGE_KEYS.DOWNLOAD_HISTORY); } catch (e) {}
  }
};
