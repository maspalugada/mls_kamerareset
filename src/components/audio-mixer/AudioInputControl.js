import React, { useEffect, useRef, useState } from 'react';

function AudioInputControl({ input, audioContext }) {
  const [volume, setVolume] = useState(1);
  const [pan, setPan] = useState(0);
  const gainNodeRef = useRef(null);
  const pannerNodeRef = useRef(null);
  const sourceNodeRef = useRef(null);

  useEffect(() => {
    if (!audioContext || !input) return;

    let stream;
    async function setupAudio() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: { deviceId: { exact: input.deviceId } },
          video: false,
        });

        sourceNodeRef.current = audioContext.createMediaStreamSource(stream);
        gainNodeRef.current = audioContext.createGain();
        pannerNodeRef.current = audioContext.createStereoPanner();

        sourceNodeRef.current.connect(gainNodeRef.current);
        gainNodeRef.current.connect(pannerNodeRef.current);
        pannerNodeRef.current.connect(audioContext.destination);
      } catch (err) {
        console.error('Error setting up audio for input:', input.name, err);
      }
    }

    setupAudio();

    return () => {
      stream?.getTracks().forEach(track => track.stop());
      sourceNodeRef.current?.disconnect();
      gainNodeRef.current?.disconnect();
      pannerNodeRef.current?.disconnect();
    };
  }, [audioContext, input]);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioContext.currentTime);
    }
  }, [volume, audioContext]);

  useEffect(() => {
    if (pannerNodeRef.current) {
      pannerNodeRef.current.pan.setValueAtTime(pan, audioContext.currentTime);
    }
  }, [pan, audioContext]);

  return (
    <div style={{ border: '1px solid var(--border-color)', padding: '10px', marginBottom: '10px' }}>
      <p>{input.name}</p>
      <div>
        <label>Volume:</label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Pan:</label>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          value={pan}
          onChange={(e) => setPan(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}

export default AudioInputControl;
