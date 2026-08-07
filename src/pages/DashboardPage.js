import { renderReleaseCard } from '../components/ReleaseCard.js';
import { renderSkeletonLoader } from '../components/SkeletonLoader.js';
import { renderMaintenanceOverlay } from '../components/MaintenanceOverlay.js';
import { renderForceUpdateModal } from '../components/ForceUpdateModal.js';
import { handleDownloadFlow } from '../components/DownloadModal.js';
import { showInstallGuideModal } from '../components/InstallGuideModal.js';
import { appState } from '../state/appState.js';
import { isForceUpdateRequired } from '../utilities/validators.js';

export function renderDashboardPage() {
  const { downloadConfig, loading, error } = appState.getState();

  if (loading) {
    return `
      <div>
        <div style="margin-bottom: 24px;">
          <div class="eyebrow">OFFICIAL DISTRIBUTION HUB</div>
          <h1 style="font-size: 28px; font-weight: 700; color: var(--ink);">NEXORA Official Downloads</h1>
        </div>
        ${renderSkeletonLoader()}
      </div>
    `;
  }

  if (error) {
    return `
      <div style="text-align: center; padding: 60px 20px;">
        <div style="font-size: 20px; font-weight: 700; color: var(--accent-red); margin-bottom: 8px;">Failed to Load Download Center</div>
        <div style="font-size: 14px; color: var(--ink-mute); margin-bottom: 20px;">${error}</div>
        <button onclick="window.location.reload()" class="btn-primary">Retry Connection</button>
      </div>
    `;
  }

  // Check Maintenance Modes
  if (downloadConfig?.globalMaintenance) {
    return renderMaintenanceOverlay('Global maintenance mode is currently active.');
  }

  const android = downloadConfig?.android || {};
  const windows = downloadConfig?.windows || {};

  // Check Force Update triggers
  const forceAndroid = isForceUpdateRequired('1.0.0', android.minVersion, android.forceUpdate);
  const forceWindows = isForceUpdateRequired('1.0.0', windows.minVersion, windows.forceUpdate);

  return `
    <div>
      <div style="display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px; margin-bottom: 32px; border-bottom: 1px solid var(--hairline); padding-bottom: 24px;">
        <div>
          <div class="eyebrow">VERIFIED OFFICIAL RELEASES</div>
          <h1 style="font-size: 28px; font-weight: 700; color: var(--ink); margin-top: 4px;">NEXORA Software Center</h1>
          <p style="font-size: 14px; color: var(--ink-mute); margin-top: 4px;">
            Download verified high-performance learning software built for Android & Windows desktop devices.
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="status-pill stable">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; display: inline-block;"></span>
            LIVE API SYNCED
          </span>
        </div>
      </div>

      <div class="release-grid">
        ${android.maintenance ? `
          <div class="release-card android" style="opacity: 0.7;">
            <div style="text-align: center; padding: 40px 0;">
              <div class="eyebrow" style="color: var(--accent-orange);">ANDROID MAINTENANCE</div>
              <h3 style="color: var(--ink); margin-top: 8px;">Android Release Under Maintenance</h3>
            </div>
          </div>
        ` : renderReleaseCard('android', android)}

        ${windows.maintenance ? `
          <div class="release-card windows" style="opacity: 0.7;">
            <div style="text-align: center; padding: 40px 0;">
              <div class="eyebrow" style="color: var(--accent-orange);">WINDOWS MAINTENANCE</div>
              <h3 style="color: var(--ink); margin-top: 8px;">Windows Release Under Maintenance</h3>
            </div>
          </div>
        ` : renderReleaseCard('windows', windows)}
      </div>

      ${forceAndroid ? renderForceUpdateModal('android', android) : ''}
      ${forceWindows && !forceAndroid ? renderForceUpdateModal('windows', windows) : ''}
    </div>
  `;
}

export function bindDashboardPageEvents() {
  const { downloadConfig } = appState.getState();
  if (!downloadConfig) return;

  // Handle Download Buttons
  document.querySelectorAll('.start-download-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = btn.getAttribute('data-platform');
      const releaseInfo = downloadConfig[platform];
      if (releaseInfo) {
        handleDownloadFlow(platform, releaseInfo);
      }
    });
  });

  // Handle Guide Buttons
  document.querySelectorAll('.view-guide-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = btn.getAttribute('data-platform');
      showInstallGuideModal(platform);
    });
  });

  // Handle Checksum Copy Buttons
  document.querySelectorAll('.copy-checksum-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const hash = btn.getAttribute('data-hash');
      if (hash) {
        navigator.clipboard.writeText(hash).then(() => {
          appState.addToast('SHA-256 Checksum copied to clipboard!', 'success');
        }).catch(() => {
          appState.addToast('Failed to copy checksum', 'error');
        });
      }
    });
  });
}
