export function renderInstallGuidePage() {
  return `
    <div>
      <div style="margin-bottom: 28px; border-bottom: 1px solid var(--hairline); padding-bottom: 20px;">
        <div class="eyebrow">HELP & INSTALLATION</div>
        <h1 style="font-size: 26px; font-weight: 700; color: var(--ink); margin-top: 4px;">Software Installation Guides</h1>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px;">
        <div class="content-card">
          <div class="eyebrow" style="color: var(--accent-green); margin-bottom: 12px;">ANDROID INSTALLATION</div>
          <div class="guide-step">
            <div class="step-num">1</div>
            <div class="step-text">
              <div class="step-title">Download APK File</div>
              <div class="step-desc">Click "Download APK" to obtain the latest signed student release package.</div>
            </div>
          </div>
          <div class="guide-step">
            <div class="step-num">2</div>
            <div class="step-text">
              <div class="step-title">Enable Unknown Apps</div>
              <div class="step-desc">When prompted by Android Security, toggle "Allow from this source" for your browser.</div>
            </div>
          </div>
          <div class="guide-step">
            <div class="step-num">3</div>
            <div class="step-text">
              <div class="step-title">Launch & Authenticate</div>
              <div class="step-desc">Tap the APK in your downloads folder to install and log in with your Student Credentials.</div>
            </div>
          </div>
        </div>

        <div class="content-card">
          <div class="eyebrow" style="color: var(--accent-blue); margin-bottom: 12px;">WINDOWS DESKTOP INSTALLATION</div>
          <div class="guide-step">
            <div class="step-num">1</div>
            <div class="step-text">
              <div class="step-title">Download Setup EXE</div>
              <div class="step-desc">Download nexora-desktop-setup.exe from the official Download Center.</div>
            </div>
          </div>
          <div class="guide-step">
            <div class="step-num">2</div>
            <div class="step-text">
              <div class="step-title">Run Setup Installer</div>
              <div class="step-desc">Double-click the installer. If SmartScreen appears, click "More info" &rarr; "Run anyway".</div>
            </div>
          </div>
          <div class="guide-step">
            <div class="step-num">3</div>
            <div class="step-text">
              <div class="step-title">Complete Setup</div>
              <div class="step-desc">Follow the wizard steps to complete installation and launch NEXORA Desktop.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
