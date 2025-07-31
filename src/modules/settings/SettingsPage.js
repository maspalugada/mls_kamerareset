import React from 'react';
import { useSettings } from '../../hooks/useSettings';

function SettingsPage({ onClose }) {
  const { settings, toggleTheme, set } = useSettings();

  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'var(--panel-bg-color)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    zIndex: 1001,
    width: '500px',
    maxWidth: '90%',
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={modalStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '20px' }}>
          <h2>Settings</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', color: 'var(--font-color)', fontSize: '1.5em', cursor: 'pointer' }}>&times;</button>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h4>Theme</h4>
          <span>Current theme: {settings.theme}</span>
          <button onClick={toggleTheme} style={{ marginLeft: '10px' }}>Toggle Theme</button>
        </div>

        <hr style={{ borderColor: 'var(--border-color)', margin: '20px 0' }} />

        <div style={{ marginBottom: '15px' }}>
          <h4>Project Settings</h4>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Autosave Interval (seconds):
            <input
              type="number"
              value={settings.autosaveInterval}
              onChange={(e) => set('autosaveInterval', parseInt(e.target.value, 10))}
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h4>Playback</h4>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Default Transition:
            <select
              value={settings.defaultTransition}
              onChange={(e) => set('defaultTransition', e.target.value)}
              style={{ marginLeft: '10px' }}
            >
              <option value="cut">Cut</option>
              <option value="fade">Fade</option>
            </select>
          </label>
        </div>

        <hr style={{ borderColor: 'var(--border-color)', margin: '20px 0' }} />

        <div style={{ marginBottom: '15px' }}>
          <h4>Video Output</h4>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Resolution:
            <select
              value={settings.outputResolution}
              onChange={(e) => set('outputResolution', e.target.value)}
              style={{ marginLeft: '10px' }}
            >
              <option value="1920x1080">1920x1080 (1080p)</option>
              <option value="1280x720">1280x720 (720p)</option>
              <option value="854x480">854x480 (480p)</option>
            </select>
          </label>
          <label style={{ display: 'block', marginTop: '10px' }}>
            Frame Rate (FPS):
            <select
              value={settings.outputFps}
              onChange={(e) => set('outputFps', parseInt(e.target.value, 10))}
              style={{ marginLeft: '10px' }}
            >
              <option value={30}>30</option>
              <option value={60}>60</option>
            </select>
          </label>
        </div>

      </div>
    </>
  );
}

export default SettingsPage;
