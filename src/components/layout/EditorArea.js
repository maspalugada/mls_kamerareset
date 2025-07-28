import React, { useState } from 'react';
import VideoEditor from '../../modules/content-editor/video-editor/VideoEditor';
import VirtualCamera from '../../modules/virtual-camera/VirtualCamera';

function EditorArea() {
  const [activeTab, setActiveTab] = useState('videoEditor');

  const editorAreaStyle = {
    flex: 1,
    padding: '10px',
    backgroundColor: 'var(--bg-color)',
    display: 'flex',
    flexDirection: 'column',
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
        <button style={tabButtonStyle(activeTab === 'virtualCam')} onClick={() => setActiveTab('virtualCam')}>
          Virtual Camera
        </button>
      </div>

      {activeTab === 'videoEditor' && <VideoEditor />}
      {activeTab === 'virtualCam' && <VirtualCamera />}
    </div>
  );
}

export default EditorArea;
