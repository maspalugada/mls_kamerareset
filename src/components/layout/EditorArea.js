import React, { useState } from 'react';
import ProgramPreview from '../program-preview/ProgramPreview';
import InputManager from '../../modules/input-manager/InputManager';
import AudioMixer from '../audio-mixer/AudioMixer';

function EditorArea() {
  const [activeTab, setActiveTab] = useState('videoEditor');

  const editorAreaStyle = {
    flexGrow: 1,
    padding: '10px',
    backgroundColor: 'var(--bg-color)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  };

  const tabContainerStyle = {
    marginBottom: '10px',
    borderBottom: '1px solid var(--border-color)',
  };

  const tabButtonStyle = (isActive) => ({
    padding: '10px 15px',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: isActive ? 'var(--panel-bg-color)' : 'transparent',
    color: 'var(--font-color)',
    borderBottom: isActive ? '3px solid var(--accent-color)' : '3px solid transparent',
  });

  return (
    <div style={editorAreaStyle}>
      <div style={tabContainerStyle}>
        <button style={tabButtonStyle(activeTab === 'videoEditor')} onClick={() => setActiveTab('videoEditor')}>
          Video Editor
        </button>
        <button style={tabButtonStyle(activeTab === 'inputManager')} onClick={() => setActiveTab('inputManager')}>
          Input Manager
        </button>
        <button style={tabButtonStyle(activeTab === 'audioMixer')} onClick={() => setActiveTab('audioMixer')}>
          Audio Mixer
        </button>
      </div>

      {activeTab === 'videoEditor' && <ProgramPreview />}
      {activeTab === 'inputManager' && <InputManager />}
      {activeTab === 'audioMixer' && <AudioMixer />}
    </div>
  );
}

export default EditorArea;
