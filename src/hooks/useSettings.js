import { useState, useEffect } from 'react';
import settingsService from '../services/SettingsService';

export function useSettings() {
  // Use a simple state to trigger re-renders
  const [, setVersion] = useState(0);

  useEffect(() => {
    // Subscribe to changes in the service
    const unsubscribe = settingsService.subscribe(() => {
      // When notified, update the state to force a re-render
      setVersion(v => v + 1);
    });

    // Clean up the subscription on unmount
    return unsubscribe;
  }, []);

  return {
    settings: settingsService.settings,
    toggleTheme: () => settingsService.toggleTheme(),
    set: (key, value) => settingsService.set(key, value),
  };
}
