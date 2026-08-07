import { Icons } from '../assets/icons.js';
import { appState } from '../state/appState.js';
import { logoutStudent } from '../services/authService.js';
import { storage } from '../utilities/storage.js';

export function renderHeader(activeRoute = 'dashboard') {
  const { student, theme } = appState.getState();
  const isLight = theme === 'light';

  return `
    <header class="app-header glass-panel">
      <div class="brand-container">
        <a href="#/dashboard" style="display: flex; align-items: center; gap: 12px;">
          ${Icons.logo(38)}
          <div>
            <div class="brand-title">NEXORA</div>
            <div class="eyebrow" style="font-size: 10px; margin-top: 1px;">DOWNLOAD CENTER</div>
          </div>
        </a>
      </div>

      <nav class="nav-links">
        ${student ? `
          <a href="#/dashboard" class="nav-link ${activeRoute === 'dashboard' ? 'active' : ''}">Downloads</a>
          <a href="#/notes" class="nav-link ${activeRoute === 'notes' ? 'active' : ''}">Release Notes</a>
          <a href="#/guide" class="nav-link ${activeRoute === 'guide' ? 'active' : ''}">Installation Guide</a>
          <a href="#/history" class="nav-link ${activeRoute === 'history' ? 'active' : ''}">History</a>
        ` : ''}
      </nav>

      <div style="display: flex; align-items: center; gap: 12px;">
        <button id="themeToggleBtn" class="btn-outline btn-sm" title="Toggle Light/Dark Theme">
          ${isLight ? Icons.sun(16) : Icons.moon(16)}
        </button>

        ${student ? `
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="text-align: right;">
              <div style="font-size: 13px; font-weight: 600; color: var(--ink);">${student.name || 'Student'}</div>
              <div class="eyebrow" style="font-size: 10px; color: var(--accent-orange); font-family: 'JetBrains Mono', monospace;">
                ${student.studentId || 'ID: UNKNOWN'}
              </div>
            </div>
            <button id="logoutBtn" class="btn-outline btn-sm" style="padding: 6px 12px;">Logout</button>
          </div>
        ` : `
          <a href="#/login" class="btn-primary btn-sm">Student Access</a>
        `}
      </div>
    </header>
  `;
}

export function bindHeaderEvents() {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = appState.getState().theme;
      const next = current === 'light' ? 'dark' : 'light';
      storage.setTheme(next);
      document.documentElement.setAttribute('data-theme', next === 'light' ? 'light' : '');
      if (next === 'dark') document.documentElement.removeAttribute('data-theme');
      appState.setState({ theme: next });
    });
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logoutStudent();
      appState.setState({ student: null });
      window.location.hash = '#/login';
    });
  }
}
