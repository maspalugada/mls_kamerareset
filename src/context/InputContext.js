import React, { createContext, useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const InputContext = createContext();

export function InputProvider({ children }) {
  const [inputs, setInputs] = useState([]);

  const addInput = (inputData) => {
    const newInput = {
      id: uuidv4(),
      ...inputData, // e.g., { type: 'camera', deviceId: '...', name: '...' }
    };
    setInputs(prevInputs => [...prevInputs, newInput]);
  };

  const addAudioInputFromVideo = (videoInput) => {
    const audioInput = {
      id: uuidv4(),
      type: 'audio',
      name: `${videoInput.name} (Audio)`,
      // We link it to the video input to know its origin
      parentInputId: videoInput.id,
      url: videoInput.url, // The audio will come from the same file url
    };
    setInputs(prevInputs => [...prevInputs, audioInput]);
  };

  const value = useMemo(() => ({ inputs, addInput, addAudioInputFromVideo }), [inputs]);

  return (
    <InputContext.Provider value={value}>
      {children}
    </InputContext.Provider>
  );
}
