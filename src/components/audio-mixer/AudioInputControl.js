import React, { useEffect, useRef, useState } from 'react';
import VUMeter from './VUMeter';

function AudioInputControl({ input, audioContext }) {
  const [volume, setVolume] = useState(1);
  const [pan, setPan] = useState(0);
  const [vuLevel, setVuLevel] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const gainNodeRef = useRef(null);
  const pannerNodeRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const analyserNodeRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!audioContext || !input) return;

    let stream;
    async function setupAudio() {
      try {
        if (input.deviceId) {
          stream = await navigator.mediaDevices.getUserMedia({
            audio: { deviceId: { exact: input.deviceId } },
            video: false,
          });
          sourceNodeRef.current = audioContext.createMediaStreamSource(stream);
        } else if (input.url) {
          const audioEl = new Audio(input.url);
          audioEl.loop = true;
          await audioEl.play();
          sourceNodeRef.current = audioContext.createMediaElementSource(audioEl);
        }

        gainNodeRef.current = audioContext.createGain();
        pannerNodeRef.current = audioContext.createStereoPanner();
        analyserNodeRef.current = audioContext.createAnalyser();

        analyserNodeRef.current.fftSize = 256;
        const bufferLength = analyserNodeRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        sourceNodeRef.current.connect(analyserNodeRef.current);
        analyserNodeRef.current.connect(gainNodeRef.current);
        gainNodeRef.current.connect(pannerNodeRef.current);
        pannerNodeRef.current.connect(audioContext.destination);

        const updateVU = () => {
          analyserNodeRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
          setVuLevel(average / 128); // Normalize to 0-1 range
          animationFrameRef.current = requestAnimationFrame(updateVU);
        };
        updateVU();

      } catch (err) {
        console.error('Error setting up audio for input:', input.name, err);
      }
    }

    setupAudio();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      stream?.getTracks().forEach(track => track.stop());
      sourceNodeRef.current?.disconnect();
      gainNodeRef.current?.disconnect();
      pannerNodeRef.current?.disconnect();
      analyserNodeRef.current?.disconnect();
    };
  }, [audioContext, input]);

  useEffect(() => {
    if (gainNodeRef.current) {
      const targetVolume = isMuted ? 0 : volume;
      gainNodeRef.current.gain.setValueAtTime(targetVolume, audioContext.currentTime);
    }
  }, [volume, isMuted, audioContext]);

  useEffect(() => {
    if (pannerNodeRef.current) {
      pannerNodeRef.current.pan.setValueAtTime(pan, audioContext.currentTime);
    }
  }, [pan, audioContext]);

  return (
    <div style={{ border: '1px solid var(--border-color)', padding: '10px', marginBottom: '10px' }}>
      <p>{input.name}</p>
      <VUMeter volume={vuLevel} />
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
      <button onClick={() => setIsMuted(!isMuted)} style={{ marginTop: '10px' }}>
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
    </div>
  );
}

export default AudioInputControl;
