import { appState } from '../state/appState.js';

export function initOfflineListener() {
  window.addEventListener('online', () => {
    appState.setState({ isOffline: false });
    appState.addToast('Connection restored. You are online.', 'success');
  });

  window.addEventListener('offline', () => {
    appState.setState({ isOffline: true });
    appState.addToast('You are currently offline. Check your connection.', 'error');
  });
}
