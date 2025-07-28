import React from 'react';
import VideoEditor from '../../modules/content-editor/video-editor/VideoEditor';

function EditorArea() {
  return (
    <div style={{ flex: 1, padding: '10px' }}>
      Editor Area
      <VideoEditor />
    </div>
  );
}

export default EditorArea;
