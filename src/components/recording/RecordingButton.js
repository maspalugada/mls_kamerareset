import React, { useState, useContext } from 'react';
import recordingService from '../../services/RecordingService';
import { AssetContext } from '../../context/AssetContext';

function RecordingButton({ programCanvasRef }) {
  const [isRecording, setIsRecording] = useState(recordingService.isRecording);
  const { addAssets } = useContext(AssetContext);

  const handleToggleRecord = () => {
    if (isRecording) {
      recordingService.stop();
    } else {
      if (programCanvasRef.current) {
        const stream = programCanvasRef.current.captureStream(30); // 30 FPS

        // You might want to mix in audio here in a real app
        // const audioStream = ...
        // stream.addTrack(audioStream.getAudioTracks()[0]);

        recordingService.start(stream, (blob) => {
          // This callback runs when recording stops
          const url = URL.createObjectURL(blob);
          const file = new File([blob], `recording-${new Date().toISOString()}.webm`, { type: blob.type });
          addAssets([file]);

          // Optional: Auto-download the file
          const a = document.createElement('a');
          a.href = url;
          a.download = file.name;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        });
      }
    }
    setIsRecording(!isRecording);
  };

  const buttonStyle = {
    color: 'white',
    backgroundColor: isRecording ? 'red' : 'var(--panel-bg-color)',
    border: '1px solid var(--border-color)',
    padding: '5px 10px',
    cursor: 'pointer',
  };

  return (
    <button onClick={handleToggleRecord} style={buttonStyle}>
      {isRecording ? '■ Stop' : '● Record'}
    </button>
  );
}

export default RecordingButton;
