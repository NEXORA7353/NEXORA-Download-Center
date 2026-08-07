export function renderFooter() {
  return `
    <footer style="border-top: 1px solid var(--hairline); padding: 24px; text-align: center; font-size: 13px; color: var(--ink-mute); margin-top: 40px;">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="eyebrow">NEXORA DOWNLOAD CENTER</span>
          <span>&bull; Official Student Distribution Hub</span>
        </div>
        <div>
          &copy; ${new Date().getFullYear()} NEXORA Platform. All releases digitally signed and verified.
        </div>
      </div>
    </footer>
  `;
}
