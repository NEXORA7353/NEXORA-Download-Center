import { Icons } from '../assets/icons.js';
import { formatDate, truncateHash } from '../utilities/formatters.js';

export function renderReleaseCard(platform, releaseInfo) {
  const isAndroid = platform === 'android';
  const platformTitle = isAndroid ? 'Android Student Edition' : 'Windows Desktop Edition';
  const cardClass = isAndroid ? 'android' : 'windows';
  const badgeClass = isAndroid ? 'android' : 'windows';
  const icon = isAndroid ? Icons.android(22, '#10b981') : Icons.windows(22, '#3b82f6');

  const notes = Array.isArray(releaseInfo?.releaseNotes) ? releaseInfo.releaseNotes : [];

  return `
    <div class="release-card ${cardClass}">
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <span class="platform-badge ${badgeClass}">
            ${icon}
            ${isAndroid ? 'Android APK' : 'Windows Setup'}
          </span>
          <span class="status-pill stable">OFFICIAL RELEASE</span>
        </div>

        <h2 style="font-size: 20px; font-weight: 700; color: var(--ink); margin-bottom: 2px;">${platformTitle}</h2>
        <div class="version-tag">v${releaseInfo?.version || '1.0.0'}</div>

        <div class="release-meta">
          <span>Date: <strong>${formatDate(releaseInfo?.releaseDate)}</strong></span>
          <span>&bull;</span>
          <span>Size: <strong>${releaseInfo?.fileSize || 'N/A'}</strong></span>
        </div>

        ${releaseInfo?.checksum ? `
          <div class="checksum-box" title="${releaseInfo.checksum}">
            <span>SHA-256: ${truncateHash(releaseInfo.checksum)}</span>
            <button type="button" class="copy-checksum-btn" data-hash="${releaseInfo.checksum}" style="background: none; border: none; color: var(--accent-orange); cursor: pointer;">
              ${Icons.copy(14)}
            </button>
          </div>
        ` : ''}

        <div class="notes-box">
          <div class="eyebrow" style="margin-bottom: 8px;">RELEASE HIGHLIGHTS</div>
          <ul class="notes-list">
            ${notes.length > 0 ? notes.map(n => `<li>${n}</li>`).join('') : '<li>General stability and performance improvements.</li>'}
          </ul>
        </div>
      </div>

      <div style="display: flex; gap: 10px; margin-top: 16px;">
        <button class="btn-primary start-download-btn" data-platform="${platform}" style="flex: 1;">
          ${Icons.download(16, '#fff')}
          Download ${isAndroid ? 'APK' : 'Installer'}
        </button>
        <button class="btn-outline view-guide-btn" data-platform="${platform}">
          ${Icons.guide(16)}
          Guide
        </button>
      </div>
    </div>
  `;
}
