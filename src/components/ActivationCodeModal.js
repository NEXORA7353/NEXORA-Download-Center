import { Icons } from '../assets/icons.js';

export function renderActivationCodeModal(codeData) {
  return `
    <div class="modal-backdrop" id="activationModalBackdrop">
      <div class="modal-content fade-in" style="max-width: 480px; text-align: center;">
        <div class="modal-header">
          <div>
            <div class="eyebrow" style="color: var(--accent-green);">SECURE ACTIVATION CODE ISSUED</div>
            <div class="modal-title">App Device Activation Code</div>
          </div>
          <button class="close-btn" id="closeActivationModal">${Icons.close(20)}</button>
        </div>

        <div style="padding: 20px 0;">
          <div style="font-size: 13px; color: var(--ink-mute); margin-bottom: 16px;">
            Enter this code on your device when you launch the app for the first time:
          </div>

          <div style="background: var(--canvas-soft); border: 2px dashed var(--accent-orange); border-radius: 12px; padding: 20px; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 12px;">
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 32px; font-weight: 800; letter-spacing: 3px; color: var(--accent-orange);" id="activationCodeText">${codeData.code}</span>
            <button type="button" id="copyCodeBtn" class="btn-outline" style="padding: 8px 12px; font-size: 12px;">
              ${Icons.copy(16)} Copy
            </button>
          </div>

          <div class="notes-box" style="text-align: left; font-size: 12px; color: var(--ink-body);">
            <div style="font-weight: 700; color: var(--accent-green); margin-bottom: 6px;">Important Instructions:</div>
            <ul style="margin: 0; padding-left: 18px; line-height: 1.6;">
              <li>Save this code! You will need it to activate the app after installation.</li>
              <li>This code is linked exclusively to your Student ID (<strong>${codeData.studentId}</strong>).</li>
              <li>Valid for single device activation. Do not share with others.</li>
            </ul>
          </div>
        </div>

        <div style="margin-top: 16px;">
          <button class="btn-primary" id="confirmDownloadBtn" style="width: 100%;">
            Start Download
          </button>
        </div>
      </div>
    </div>
  `;
}
