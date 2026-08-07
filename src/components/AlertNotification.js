import { appState } from '../state/appState.js';

export function renderToastContainer() {
  const { toasts } = appState.getState();
  if (!toasts || toasts.length === 0) return '<div class="toast-container" id="toastContainer"></div>';

  return `
    <div class="toast-container" id="toastContainer">
      ${toasts.map(t => `
        <div class="toast-item ${t.type}">
          <div>${t.message}</div>
        </div>
      `).join('')}
    </div>
  `;
}
