import { renderHeader, bindHeaderEvents } from '../components/Header.js';
import { renderFooter } from '../components/Footer.js';
import { renderToastContainer } from '../components/AlertNotification.js';

export function renderAuthLayout(contentHtml) {
  return `
    <div class="app-container">
      ${renderHeader('login')}
      <main class="main-content fade-in" style="display: flex; align-items: center; justify-content: center; min-height: 70vh;">
        ${contentHtml}
      </main>
      ${renderFooter()}
      ${renderToastContainer()}
    </div>
  `;
}

export function bindAuthLayoutEvents() {
  bindHeaderEvents();
}
