import { Icons } from '../assets/icons.js';

export function renderInstallGuideModal(platform = 'android') {
  const isAndroid = platform === 'android';

  const androidSteps = [
    { title: 'Download APK File', desc: 'Tap the Download APK button on the NEXORA Download Center to obtain the official student app.' },
    { title: 'Allow Unknown Sources', desc: 'If prompted by Android, go to Settings &rarr; Security &rarr; Enable "Install Unknown Apps" for your web browser.' },
    { title: 'Open & Install', desc: 'Locate the downloaded nexora-student-v2.4.1.apk in your Downloads folder and tap Install.' },
    { title: 'Log In & Start Learning', desc: 'Open NEXORA Student App and log in using your registered Student Credentials.' }
  ];

  const windowsSteps = [
    { title: 'Download Installer EXE', desc: 'Click Download Installer to download nexora-desktop-setup.exe.' },
    { title: 'Run Setup Package', desc: 'Double-click the downloaded setup file to launch the NEXORA Desktop installer.' },
    { title: 'Bypass SmartScreen (If Prompted)', desc: 'If Windows Defender SmartScreen appears, click "More info" and then select "Run anyway".' },
    { title: 'Complete Setup & Launch', desc: 'Follow on-screen installation wizard steps. Launch NEXORA Desktop from your Start Menu or Desktop shortcut.' }
  ];

  const steps = isAndroid ? androidSteps : windowsSteps;

  return `
    <div class="modal-backdrop" id="guideModalBackdrop">
      <div class="modal-content fade-in" style="max-width: 600px;">
        <div class="modal-header">
          <div>
            <div class="eyebrow">STEP-BY-STEP SETUP GUIDE</div>
            <div class="modal-title">${isAndroid ? 'Android APK Sideload Guide' : 'Windows Setup Guide'}</div>
          </div>
          <button class="close-btn" id="closeGuideModal">${Icons.close(20)}</button>
        </div>

        <div style="margin-top: 16px;">
          ${steps.map((step, idx) => `
            <div class="guide-step">
              <div class="step-num">${idx + 1}</div>
              <div class="step-text">
                <div class="step-title">${step.title}</div>
                <div class="step-desc">${step.desc}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="text-align: right; margin-top: 20px;">
          <button class="btn-primary" id="dismissGuideBtn">Got it, thanks!</button>
        </div>
      </div>
    </div>
  `;
}

export function showInstallGuideModal(platform) {
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = renderInstallGuideModal(platform);
  document.body.appendChild(modalContainer);

  const closeBtn = document.getElementById('closeGuideModal');
  const dismissBtn = document.getElementById('dismissGuideBtn');

  const close = () => {
    if (modalContainer) modalContainer.remove();
  };

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (dismissBtn) dismissBtn.addEventListener('click', close);
}
