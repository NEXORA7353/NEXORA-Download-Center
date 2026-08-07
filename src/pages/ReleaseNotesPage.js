import { appState } from '../state/appState.js';

export function renderReleaseNotesPage() {
  const { downloadConfig } = appState.getState();
  const android = downloadConfig?.android || {};
  const windows = downloadConfig?.windows || {};

  return `
    <div>
      <div style="margin-bottom: 28px; border-bottom: 1px solid var(--hairline); padding-bottom: 20px;">
        <div class="eyebrow">DETAILED CHANGELOGS</div>
        <h1 style="font-size: 26px; font-weight: 700; color: var(--ink); margin-top: 4px;">Release Notes & Updates</h1>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px;">
        <div class="content-card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <h2 style="font-size: 18px; color: var(--accent-green);">Android Student Edition</h2>
            <span class="eyebrow">v${android.version || '2.4.1'}</span>
          </div>
          <ul class="notes-list">
            ${(android.releaseNotes || []).map(note => `<li>${note}</li>`).join('')}
          </ul>
        </div>

        <div class="content-card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <h2 style="font-size: 18px; color: var(--accent-blue);">Windows Desktop Edition</h2>
            <span class="eyebrow">v${windows.version || '1.8.0'}</span>
          </div>
          <ul class="notes-list">
            ${(windows.releaseNotes || []).map(note => `<li>${note}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
}
