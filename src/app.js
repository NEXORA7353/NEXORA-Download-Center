import { appState } from './state/appState.js';
import { getLiveDownloadConfig } from './services/downloadService.js';
import { initOfflineListener } from './hooks/useOfflineStatus.js';
import { renderMainLayout, bindMainLayoutEvents } from './layouts/MainLayout.js';
import { renderAuthLayout, bindAuthLayoutEvents } from './layouts/AuthLayout.js';
import { renderLoginPage, bindLoginPageEvents } from './pages/LoginPage.js';
import { renderDashboardPage, bindDashboardPageEvents } from './pages/DashboardPage.js';
import { renderReleaseNotesPage } from './pages/ReleaseNotesPage.js';
import { renderInstallGuidePage } from './pages/InstallGuidePage.js';
import { renderHistoryPage, bindHistoryPageEvents } from './pages/HistoryPage.js';
import { storage } from './utilities/storage.js';

class DownloadCenterApp {
  constructor() {
    this.appRoot = document.getElementById('root');
  }

  async init() {
    // 1. Theme setup
    const theme = storage.getTheme();
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    // 2. Offline listener
    initOfflineListener();

    // 3. Subscribe to reactive state updates
    appState.subscribe(() => this.render());

    // 4. Handle routing
    window.addEventListener('hashchange', () => this.render());

    // 5. Initial data fetch from live API, with static JSON fallback
    try {
      appState.setState({ loading: true });
      const config = await getLiveDownloadConfig();
      appState.setState({ downloadConfig: config, loading: false, error: null });
    } catch (err) {
      console.warn('Live API unavailable, trying static config fallback:', err.message);
      // Fallback: load static config.json for Cloudflare Pages / static deployments
      try {
        const staticRes = await fetch('./data/config.json');
        if (staticRes.ok) {
          const staticConfig = await staticRes.json();
          appState.setState({ downloadConfig: staticConfig, loading: false, error: null });
        } else {
          throw new Error('Static config not found');
        }
      } catch (fallbackErr) {
        appState.setState({ loading: false, error: 'Could not connect to NEXORA live backend server. Check connection.' });
      }
    }

    this.render();

  }

  getRoute() {
    const hash = window.location.hash.replace(/^#\//, '') || 'dashboard';
    return hash.split('?')[0];
  }

  render() {
    if (!this.appRoot) return;

    const route = this.getRoute();
    const { student } = appState.getState();

    // Guard authenticated routes
    if (!student && route !== 'login') {
      window.location.hash = '#/login';
      return;
    }

    let pageHtml = '';
    let isAuthLayout = false;
    let bindPageEvents = () => {};

    switch (route) {
      case 'login':
        isAuthLayout = true;
        pageHtml = renderLoginPage();
        bindPageEvents = bindLoginPageEvents;
        break;
      case 'dashboard':
        pageHtml = renderDashboardPage();
        bindPageEvents = bindDashboardPageEvents;
        break;
      case 'notes':
        pageHtml = renderReleaseNotesPage();
        break;
      case 'guide':
        pageHtml = renderInstallGuidePage();
        break;
      case 'history':
        pageHtml = renderHistoryPage();
        bindPageEvents = bindHistoryPageEvents;
        break;
      default:
        pageHtml = renderDashboardPage();
        bindPageEvents = bindDashboardPageEvents;
        break;
    }

    if (isAuthLayout) {
      this.appRoot.innerHTML = renderAuthLayout(pageHtml);
      bindAuthLayoutEvents();
    } else {
      this.appRoot.innerHTML = renderMainLayout(pageHtml, route);
      bindMainLayoutEvents();
    }

    bindPageEvents();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new DownloadCenterApp();
  app.init();
});
