import { renderHeader, bindHeaderEvents } from '../components/Header.js';
import { renderFooter } from '../components/Footer.js';
import { renderToastContainer } from '../components/AlertNotification.js';

export function renderMainLayout(contentHtml, activeRoute = 'dashboard') {
  return `
    <div class="app-container">
      ${renderHeader(activeRoute)}
      <main class="main-content fade-in">
        ${contentHtml}
      </main>
      ${renderFooter()}
      ${renderToastContainer()}
    </div>
  `;
}

export function bindMainLayoutEvents() {
  bindHeaderEvents();
}
