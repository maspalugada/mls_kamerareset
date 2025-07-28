import React, { useState, useRef, useEffect, useContext } from 'react';
import { InputContext } from '../../context/InputContext';

function ProgramPreview() {
  const { inputs } = useContext(InputContext);
  const [previewInput, setPreviewInput] = useState(null);
  const [programInput, setProgramInput] = useState(null);

  const previewVideoRef = useRef(null);
  const programVideoRef = useRef(null);

  // Helper to get stream from an input
  const getStreamForInput = async (input) => {
    if (!input) return null;
    if (input.type === 'camera') {
      return navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: input.deviceId } },
      });
    }
    // Later, add logic for video files, etc.
    return null;
  };

  useEffect(() => {
    getStreamForInput(previewInput).then(stream => {
      if (previewVideoRef.current) previewVideoRef.current.srcObject = stream;
    });
  }, [previewInput]);

  useEffect(() => {
    getStreamForInput(programInput).then(stream => {
      if (programVideoRef.current) programVideoRef.current.srcObject = stream;
    });
  }, [programInput]);

  const handleCut = () => {
    setProgramInput(previewInput);
  };

  const containerStyle = {
    display: 'flex',
    gap: '10px',
    padding: '10px',
  };

  const videoContainerStyle = {
    flex: 1,
    border: '2px solid #555',
    padding: '5px',
  };

  return (
    <div>
      <div style={containerStyle}>
        <div style={videoContainerStyle}>
          <h4>Preview</h4>
          <video ref={previewVideoRef} autoPlay playsInline muted style={{ width: '100%' }} />
        </div>
        <div style={videoContainerStyle}>
          <h4>Program</h4>
          <video ref={programVideoRef} autoPlay playsInline muted style={{ width: '100%' }} />
        </div>
      </div>
      <div style={{ padding: '10px' }}>
        <button onClick={handleCut}>Cut</button>
        {/* Fade button would require more complex canvas logic */}
        <button disabled>Fade</button>
      </div>
      <div>
        <h5>Select Input for Preview:</h5>
        {inputs.map(input => (
          <button key={input.id} onClick={() => setPreviewInput(input)}>
            {input.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProgramPreview;
