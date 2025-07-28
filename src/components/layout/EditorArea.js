import React from 'react';
import VideoEditor from '../../modules/content-editor/video-editor/VideoEditor';

function EditorArea() {
  const editorAreaStyle = {
    flex: 1,
    padding: '10px',
    backgroundColor: 'var(--bg-color)',
  };
  return (
    <div style={editorAreaStyle}>
      <h3>Editor Area</h3>
      <VideoEditor />
    </div>
  );
}

export default EditorArea;
