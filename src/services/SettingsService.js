const SETTINGS_STORAGE_KEY = 'multimedia-studio-settings';

class SettingsService {
  constructor() {
    this.listeners = [];
    this.settings = this._loadSettings();
  }

  _loadSettings() {
    const defaults = {
      theme: 'dark',
      autosaveInterval: 300,
      defaultTransition: 'fade',
      outputResolution: '1920x1080',
      outputFps: 30,
    };

    try {
      const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (storedSettings) {
        return { ...defaults, ...JSON.parse(storedSettings) };
      }
    } catch (error) {
      console.error('Error loading settings from localStorage:', error);
    }
    return defaults;
  }

  _saveSettings() {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(this.settings));
    } catch (error) {
      console.error('Error saving settings to localStorage:', error);
    }
  }

  get(key) {
    return this.settings[key];
  }

  set(key, value) {
    // Basic validation
    if (key === 'autosaveInterval' && (isNaN(value) || value < 0)) {
      return; // Ignore invalid value
    }
    if (key === 'outputFps' && ![30, 60].includes(value)) {
      return; // Ignore invalid value
    }

    this.settings[key] = value;
    this._saveSettings();
    this.notifyListeners();
  }

  toggleTheme() {
    const newTheme = this.settings.theme === 'dark' ? 'light' : 'dark';
    this.set('theme', newTheme);
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}

const settingsService = new SettingsService();
export default settingsService;
