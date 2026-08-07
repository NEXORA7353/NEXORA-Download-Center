import { Icons } from '../assets/icons.js';
import { loginStudent } from '../services/authService.js';
import { appState } from '../state/appState.js';

export function renderLoginPage() {
  return `
    <div class="content-card" style="max-width: 440px; width: 100%; padding: 32px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: flex; justify-content: center; margin-bottom: 12px;">
          ${Icons.logo(52)}
        </div>
        <h1 style="font-size: 22px; font-weight: 700; color: var(--ink); margin-bottom: 4px;">Student Authentication</h1>
        <div class="eyebrow">VERIFY ACCESS CREDENTIALS</div>
      </div>

      <form id="studentLoginForm" style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <label class="eyebrow" style="display: block; margin-bottom: 6px;">STUDENT ID / ROLL NO.</label>
          <input type="text" id="loginStudentId" placeholder="e.g. STU-99201" required style="width: 100%; height: 46px; background: var(--canvas-soft); border: 1px solid var(--hairline); border-radius: 10px; padding: 0 16px; color: var(--ink); font-size: 14px;">
        </div>

        <div>
          <label class="eyebrow" style="display: block; margin-bottom: 6px;">ACCESS PASSCODE (OPTIONAL)</label>
          <input type="password" id="loginPasscode" placeholder="Enter access key..." style="width: 100%; height: 46px; background: var(--canvas-soft); border: 1px solid var(--hairline); border-radius: 10px; padding: 0 16px; color: var(--ink); font-size: 14px;">
        </div>

        <button type="submit" class="btn-primary" style="height: 48px; width: 100%; font-size: 15px; font-weight: 600; margin-top: 8px;">
          Verify & Enter Download Hub
        </button>
      </form>

      <div style="text-align: center; margin-top: 20px; font-size: 12px; color: var(--ink-mute);">
        Secure SSL Encrypted Channel &bull; NEXORA Student Authentication
      </div>
    </div>
  `;
}

export function bindLoginPageEvents() {
  const form = document.getElementById('studentLoginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const idInput = document.getElementById('loginStudentId');
    const passInput = document.getElementById('loginPasscode');

    try {
      const session = loginStudent(idInput.value, passInput.value);
      appState.setState({ student: session });
      appState.addToast(`Welcome ${session.studentId}! Authenticated successfully.`, 'success');
      window.location.hash = '#/dashboard';
    } catch (err) {
      appState.addToast(err.message, 'error');
    }
  });
}
