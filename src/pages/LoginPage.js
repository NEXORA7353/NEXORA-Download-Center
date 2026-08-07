import { Icons } from '../assets/icons.js';
import { loginStudent } from '../services/authService.js';
import { appState } from '../state/appState.js';

export function renderLoginPage() {
  return `
    <div class="content-card fade-in" style="max-width: 480px; width: 100%; padding: 36px; border-radius: 24px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);">
      <div style="text-align: center; margin-bottom: 28px;">
        <div style="display: flex; justify-content: center; margin-bottom: 14px;">
          ${Icons.logo(56)}
        </div>
        <h1 style="font-size: 24px; font-weight: 700; color: var(--ink); margin-bottom: 4px;">Student Access Portal</h1>
        <div class="eyebrow" style="color: var(--accent-orange); letter-spacing: 1.5px;">GENERATE UNIQUE STUDENT ID</div>
      </div>

      <form id="studentLoginForm" style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <label class="eyebrow" style="display: block; margin-bottom: 8px; color: var(--ink-body);">
            STUDENT FULL NAME
          </label>
          <div style="position: relative;">
            <input type="text" id="studentFullName" placeholder="e.g. Arjit Sharma" required minlength="3" autocomplete="name" style="width: 100%; height: 50px; background: var(--canvas-soft); border: 1px solid var(--hairline); border-radius: 12px; padding: 0 16px 0 44px; color: var(--ink); font-size: 15px; font-weight: 500; transition: all 0.2s ease;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ink-mute)" stroke-width="2" style="position: absolute; left: 14px; top: 15px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div style="font-size: 11px; color: var(--ink-mute); margin-top: 4px;">Enter complete name. Abbreviations are not accepted.</div>
        </div>

        <div>
          <label class="eyebrow" style="display: block; margin-bottom: 8px; color: var(--ink-body);">
            EMAIL ADDRESS
          </label>
          <div style="position: relative;">
            <input type="email" id="studentEmail" placeholder="e.g. student@gmail.com" required autocomplete="email" style="width: 100%; height: 50px; background: var(--canvas-soft); border: 1px solid var(--hairline); border-radius: 12px; padding: 0 16px 0 44px; color: var(--ink); font-size: 15px; font-weight: 500; transition: all 0.2s ease;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ink-mute)" stroke-width="2" style="position: absolute; left: 14px; top: 15px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div style="font-size: 11px; color: var(--ink-mute); margin-top: 4px;">Unique Student ID will be linked with your email.</div>
        </div>

        <button type="submit" class="btn-primary" style="height: 52px; width: 100%; font-size: 16px; font-weight: 600; margin-top: 8px; border-radius: 14px;">
          Generate Unique ID & Continue
        </button>
      </form>

      <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--hairline); font-size: 12px; color: var(--ink-mute);">
        Secure SSL Verified Channel &bull; NEXORA Distribution Platform
      </div>
    </div>
  `;
}

export function bindLoginPageEvents() {
  const form = document.getElementById('studentLoginForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('studentFullName');
    const emailInput = document.getElementById('studentEmail');

    try {
      const session = await loginStudent(nameInput.value, emailInput.value);
      appState.setState({ student: session });
      appState.addToast(`Welcome ${session.name}! Assigned Unique ID: ${session.studentId}`, 'success');
      window.location.hash = '#/dashboard';
    } catch (err) {
      appState.addToast(err.message, 'error');
    }
  });
}
