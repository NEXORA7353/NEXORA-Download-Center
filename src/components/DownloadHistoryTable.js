import { formatDateTime } from '../utilities/formatters.js';

export function renderDownloadHistoryTable(historyList = []) {
  if (!Array.isArray(historyList) || historyList.length === 0) {
    return `
      <div style="text-align: center; padding: 40px; background: var(--canvas-card); border-radius: 16px; border: 1px solid var(--hairline); color: var(--ink-mute);">
        <div style="font-size: 16px; font-weight: 600; margin-bottom: 4px; color: var(--ink);">No Download History Found</div>
        <div style="font-size: 13px;">Your recent app downloads will automatically be recorded here.</div>
      </div>
    `;
  }

  return `
    <div class="content-card" style="padding: 0; overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <thead>
          <tr style="border-bottom: 1px solid var(--hairline); text-align: left; background: var(--canvas-soft);">
            <th style="padding: 12px 16px; color: var(--ink-mute);">PLATFORM</th>
            <th style="padding: 12px 16px; color: var(--ink-mute);">VERSION</th>
            <th style="padding: 12px 16px; color: var(--ink-mute);">FILE SIZE</th>
            <th style="padding: 12px 16px; color: var(--ink-mute);">TOKEN / SESSION</th>
            <th style="padding: 12px 16px; color: var(--ink-mute);">DATE & TIME</th>
            <th style="padding: 12px 16px; color: var(--ink-mute);">STATUS</th>
          </tr>
        </thead>
        <tbody>
          ${historyList.map(item => {
            const isAndroid = (item.platform || '').toLowerCase() === 'android';
            const badgeColor = isAndroid ? 'var(--accent-green)' : 'var(--accent-blue)';
            return `
              <tr style="border-bottom: 1px solid var(--hairline);">
                <td style="padding: 14px 16px; font-weight: 600; color: ${badgeColor}; text-transform: uppercase;">
                  ${item.platform}
                </td>
                <td style="padding: 14px 16px; font-family: 'JetBrains Mono', monospace; font-weight: 600;">v${item.version}</td>
                <td style="padding: 14px 16px; color: var(--ink-body);">${item.fileSize || 'N/A'}</td>
                <td style="padding: 14px 16px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--ink-mute);">${item.id || 'N/A'}</td>
                <td style="padding: 14px 16px; color: var(--ink-mute);">${formatDateTime(item.timestamp)}</td>
                <td style="padding: 14px 16px;">
                  <span class="status-pill stable">COMPLETED</span>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}
