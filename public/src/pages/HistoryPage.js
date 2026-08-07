import { renderDownloadHistoryTable } from '../components/DownloadHistoryTable.js';
import { storage } from '../utilities/storage.js';
import { appState } from '../state/appState.js';

export function renderHistoryPage() {
  const history = storage.getDownloadHistory();

  return `
    <div>
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 28px; border-bottom: 1px solid var(--hairline); padding-bottom: 20px;">
        <div>
          <div class="eyebrow">DOWNLOAD LOGS</div>
          <h1 style="font-size: 26px; font-weight: 700; color: var(--ink); margin-top: 4px;">My Download History</h1>
        </div>

        ${history.length > 0 ? `
          <button id="clearHistoryBtn" class="btn-outline btn-sm" style="color: var(--accent-red); border-color: rgba(239,68,68,0.3);">
            Clear History Log
          </button>
        ` : ''}
      </div>

      ${renderDownloadHistoryTable(history)}
    </div>
  `;
}

export function bindHistoryPageEvents() {
  const clearBtn = document.getElementById('clearHistoryBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      storage.clearDownloadHistory();
      appState.addToast('Download history log cleared.', 'info');
      // Re-render history page
      window.location.reload();
    });
  }
}
