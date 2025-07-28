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

  const value = useMemo(() => ({ inputs, addInput }), [inputs]);

  return (
    <InputContext.Provider value={value}>
      {children}
    </InputContext.Provider>
  );
}
