import React, { useContext, useRef, useEffect } from 'react';
import { InputContext } from '../../context/InputContext';
import AudioInputControl from './AudioInputControl';

function AudioMixer() {
  const { inputs } = useContext(InputContext);
  const audioContextRef = useRef(null);

  useEffect(() => {
    // Create AudioContext only once
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;
    // Resume context on user interaction if needed, though it should be handled by getUserMedia
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    return () => {
      // It's often better to manage the lifecycle of the context at a higher level
      // but for now, we'll leave it running.
    };
  }, []);

  const audioInputs = inputs.filter(input => input.type === 'audio');

  return (
    <div>
      <h4>Audio Mixer</h4>
      {audioInputs.length === 0 && <p>No audio inputs added from Input Manager.</p>}
      {audioInputs.map(input => (
        <AudioInputControl
          key={input.id}
          input={input}
          audioContext={audioContextRef.current}
        />
      ))}
    </div>
  );
}

export default AudioMixer;
