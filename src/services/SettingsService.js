class SettingsService {
  constructor() {
    // Default settings
    this.settings = {
      theme: 'dark',
      autosaveInterval: 300,
      defaultTransition: 'fade',
    };
    this.listeners = [];
  }

  // Method to get a setting
  get(key) {
    return this.settings[key];
  }

  // Method to set a setting
  set(key, value) {
    this.settings[key] = value;
    this.notifyListeners();
  }

  // Method to toggle the theme
  toggleTheme() {
    const newTheme = this.settings.theme === 'dark' ? 'light' : 'dark';
    this.set('theme', newTheme);
  }

  // Simple event system to notify React components of changes
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      // Unsubscribe function
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}

// Export a single instance (singleton pattern)
const settingsService = new SettingsService();
export default settingsService;
