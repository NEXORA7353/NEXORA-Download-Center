import { storage } from '../utilities/storage.js';

class AppState {
  constructor() {
    this.listeners = new Set();
    this.state = {
      theme: storage.getTheme(),
      student: storage.getStudentSession(),
      downloadConfig: null,
      loading: true,
      error: null,
      isOffline: !navigator.onLine,
      toasts: []
    };
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  addToast(message, type = 'info') {
    const id = Date.now() + Math.random().toString(36).substr(2, 5);
    const toast = { id, message, type };
    this.setState({ toasts: [...this.state.toasts, toast] });

    setTimeout(() => {
      this.removeToast(id);
    }, 4000);
  }

  removeToast(id) {
    this.setState({
      toasts: this.state.toasts.filter(t => t.id !== id)
    });
  }
}

export const appState = new AppState();
