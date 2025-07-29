import React, { useState } from 'react';
import ProgramPreview from '../program-preview/ProgramPreview';
import InputManager from '../../modules/input-manager/InputManager';

function EditorArea() {
  const [activeTab, setActiveTab] = useState('videoEditor');

  const editorAreaStyle = {
    flexGrow: 1,
    padding: '10px',
    backgroundColor: 'var(--bg-color)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0, // Prevent flex items from overflowing
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
      </div>

      {activeTab === 'videoEditor' && <ProgramPreview />}
      {activeTab === 'inputManager' && <InputManager />}
    </div>
  );
}

export default EditorArea;
