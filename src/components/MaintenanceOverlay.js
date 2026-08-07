export function renderMaintenanceOverlay(message = 'The NEXORA Download Center is currently undergoing scheduled system maintenance.') {
  return `
    <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: var(--canvas); z-index: 9999; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; text-align: center;">
      <div style="width: 72px; height: 72px; border-radius: 50%; background: rgba(255, 122, 23, 0.12); border: 1px solid rgba(255, 122, 23, 0.3); color: var(--accent-orange); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
      </div>

      <div class="eyebrow" style="font-size: 12px; letter-spacing: 2px; color: var(--accent-orange); margin-bottom: 8px;">SYSTEM MAINTENANCE MODE</div>
      <h1 style="font-size: 28px; font-weight: 700; color: var(--ink); margin-bottom: 12px;">Under Scheduled Maintenance</h1>
      <p style="font-size: 15px; color: var(--ink-mute); max-width: 480px; line-height: 1.6; margin-bottom: 24px;">
        ${message} Our engineering team is publishing new software updates and security signatures. Please check back shortly.
      </p>

      <button onclick="window.location.reload()" class="btn-outline" style="gap: 8px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
        Refresh Status
      </button>
    </div>
  `;
}
