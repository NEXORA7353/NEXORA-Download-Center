import { Icons } from '../assets/icons.js';

export function renderForceUpdateModal(platform, releaseInfo) {
  const isAndroid = platform === 'android';
  const platformTitle = isAndroid ? 'Android Student App' : 'Windows Desktop App';

  return `
    <div class="modal-backdrop" style="z-index: 5000;">
      <div class="modal-content fade-in" style="border: 2px solid var(--accent-red); text-align: center; max-width: 480px;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(239, 68, 68, 0.15); color: var(--accent-red); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>

        <div class="eyebrow" style="color: var(--accent-red); font-size: 12px; margin-bottom: 4px;">MANDATORY UPDATE REQUIRED</div>
        <h2 style="font-size: 22px; font-weight: 700; color: var(--ink); margin-bottom: 8px;">Critical Update for ${platformTitle}</h2>
        
        <p style="font-size: 14px; color: var(--ink-body); line-height: 1.5; margin-bottom: 20px;">
          Your current version of the ${platformTitle} is below the minimum required version <strong>v${releaseInfo.minVersion}</strong>. Please update to version <strong>v${releaseInfo.version}</strong> immediately to continue accessing live lectures and courses.
        </p>

        <div class="notes-box" style="margin-bottom: 24px; text-align: left;">
          <div class="eyebrow" style="margin-bottom: 6px;">LATEST STABLE RELEASE</div>
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 15px; font-weight: 700; color: var(--accent-green);">
            v${releaseInfo.version} (${releaseInfo.fileSize || 'N/A'})
          </div>
        </div>

        <button class="btn-primary start-download-btn" data-platform="${platform}" style="width: 100%; height: 46px; font-size: 15px;">
          ${Icons.download(18, '#fff')}
          Update Now (v${releaseInfo.version})
        </button>
      </div>
    </div>
  `;
}
