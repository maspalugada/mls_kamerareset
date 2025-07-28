import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <h2>Settings</h2>
      <div>
        <p>Theme: {theme}</p>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    </div>
  );
}

export default Settings;
