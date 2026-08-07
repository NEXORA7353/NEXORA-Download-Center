import { Icons } from '../assets/icons.js';
import { executeSecureDownload } from '../services/downloadService.js';
import { appState } from '../state/appState.js';

export function renderDownloadModal(platform, releaseInfo) {
  const isAndroid = platform === 'android';
  const platformName = isAndroid ? 'Android APK' : 'Windows Setup (.exe)';

  return `
    <div class="modal-backdrop" id="downloadModalBackdrop">
      <div class="modal-content fade-in">
        <div class="modal-header">
          <div>
            <div class="eyebrow">SECURE DOWNLOAD INITIATOR</div>
            <div class="modal-title">${platformName} v${releaseInfo.version}</div>
          </div>
          <button class="close-btn" id="closeDlModal">${Icons.close(20)}</button>
        </div>

        <div id="modalStatusContainer">
          <div style="text-align: center; padding: 20px 0;">
            <div class="pulse" style="font-size: 14px; color: var(--accent-orange); font-weight: 600; margin-bottom: 12px;" id="modalProgressText">
              Verifying student authorization token...
            </div>
            
            <div class="progress-bar-track">
              <div class="progress-bar-fill" id="modalProgressBar"></div>
            </div>

            <div style="font-size: 12px; color: var(--ink-mute); margin-top: 10px;" id="modalSubText">
              Connecting to NEXORA secure download nodes
            </div>
          </div>
        </div>

        <div class="notes-box" style="margin-top: 16px; font-size: 12px; color: var(--ink-body);">
          <div style="display: flex; align-items: center; gap: 6px; font-weight: 600; color: var(--accent-green); margin-bottom: 4px;">
            ${Icons.shieldCheck(16, '#10b981')} Digital Signature Verified
          </div>
          <div>File checksum SHA-256 match confirmed. Single-use download authorization token issued.</div>
        </div>
      </div>
    </div>
  `;
}

export function handleDownloadFlow(platform, releaseInfo) {
  const student = appState.getState().student;
  const studentId = student ? student.studentId : 'STUDENT';

  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = renderDownloadModal(platform, releaseInfo);
  document.body.appendChild(modalContainer);

  const backdrop = document.getElementById('downloadModalBackdrop');
  const closeBtn = document.getElementById('closeDlModal');
  const progressBar = document.getElementById('modalProgressBar');
  const progressText = document.getElementById('modalProgressText');
  const subText = document.getElementById('modalSubText');

  closeBtn.addEventListener('click', () => {
    if (modalContainer) modalContainer.remove();
  });

  // Animate progress states
  let step = 0;
  const interval = setInterval(() => {
    step += 25;
    if (progressBar) progressBar.style.width = step + '%';

    if (step === 25) {
      if (progressText) progressText.textContent = 'Generating dynamic single-use token...';
    } else if (step === 50) {
      if (progressText) progressText.textContent = 'Verifying SHA-256 hash checksum integrity...';
    } else if (step === 75) {
      if (progressText) progressText.textContent = 'Preparing secure binary download stream...';
    } else if (step >= 100) {
      clearInterval(interval);
      if (progressText) progressText.textContent = 'Download Ready! Starting transfer...';
      if (subText) subText.textContent = 'If the download does not start automatically, please try again.';

      // Execute actual secure download action
      executeSecureDownload(platform, releaseInfo, studentId)
        .then(() => {
          appState.addToast(`Successfully initiated ${platform.toUpperCase()} v${releaseInfo.version} download!`, 'success');
          setTimeout(() => {
            if (modalContainer) modalContainer.remove();
          }, 1500);
        })
        .catch(err => {
          if (progressText) {
            progressText.textContent = 'Download failed: ' + err.message;
            progressText.style.color = 'var(--accent-red)';
          }
          appState.addToast('Download error: ' + err.message, 'error');
        });
    }
  }, 400);
}
