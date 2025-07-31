import React, { useState, useContext } from 'react';
import recordingService from '../../services/RecordingService';
import { AssetContext } from '../../context/AssetContext';

/**
 * A UI component for a record button that controls the RecordingService.
 * @param {{ programCanvasRef: React.RefObject<HTMLCanvasElement> }} props
 */
function RecordingButton({ programCanvasRef }) {
  const [isRecording, setIsRecording] = useState(recordingService.isRecording);
  const { addAssets } = useContext(AssetContext);

  const handleToggleRecord = () => {
    if (isRecording) {
      recordingService.stop();
    } else {
      if (programCanvasRef.current) {
        // Capture the stream from the program canvas at a specific frame rate.
        const stream = programCanvasRef.current.captureStream(30);

        // In a real application, you would also get the mixed audio stream
        // from the audio mixer and add it to the recording.
        // const audioStream = audioMixerService.getMixedStream();
        // stream.addTrack(audioStream.getAudioTracks()[0]);

        // Start the recording service and provide a callback for when it stops.
        recordingService.start(stream, (blob) => {
          // This callback runs when recording stops.
          const url = URL.createObjectURL(blob);
          const file = new File([blob], `recording-${new Date().toISOString()}.webm`, { type: blob.type });

          // Add the newly created video file to the asset library.
          addAssets([file]);

          // Optional: Trigger a download of the file for the user.
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
    // Update the button's visual state.
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
