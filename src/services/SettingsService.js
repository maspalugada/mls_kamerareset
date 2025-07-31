const SETTINGS_STORAGE_KEY = 'multimedia-studio-settings';

/**
 * A singleton class to manage application settings.
 * It handles loading, saving, and validating settings,
 * and provides a simple subscription model for UI components to listen for changes.
 */
class SettingsService {
  constructor() {
    this.listeners = [];
    this.settings = this._loadSettings();
  }

  /**
   * Loads settings from localStorage, falling back to defaults if none are found or if parsing fails.
   * @private
   * @returns {object} The loaded settings object.
   */
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

  /**
   * Saves the current settings object to localStorage.
   * @private
   */
  _saveSettings() {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(this.settings));
    } catch (error) {
      console.error('Error saving settings to localStorage:', error);
    }
  }

  /**
   * Retrieves a setting value by its key.
   * @param {string} key - The key of the setting to retrieve.
   * @returns {*} The value of the setting.
   */
  get(key) {
    return this.settings[key];
  }

  /**
   * Sets a new value for a setting and persists it.
   * Includes basic validation for certain keys.
   * @param {string} key - The key of the setting to set.
   * @param {*} value - The new value for the setting.
   */
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

  /**
   * Toggles the theme between 'dark' and 'light'.
   */
  toggleTheme() {
    const newTheme = this.settings.theme === 'dark' ? 'light' : 'dark';
    this.set('theme', newTheme);
  }

  /**
   * Subscribes a listener function to be called when settings change.
   * @param {function} listener - The callback function to execute on change.
   * @returns {function} An unsubscribe function.
   */
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      // Unsubscribe function
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Notifies all subscribed listeners that a change has occurred.
   * @private
   */
  notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}

// Export a single instance (singleton pattern) to ensure all parts of the app share the same settings.
const settingsService = new SettingsService();
export default settingsService;
