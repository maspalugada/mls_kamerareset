import React, { createContext, useState, useMemo } from 'react';

export const SwitcherContext = createContext();

export function SwitcherProvider({ children }) {
  const [previewInput, setPreviewInput] = useState(null);
  const [programInput, setProgramInput] = useState(null);

  const value = useMemo(() => ({
    previewInput,
    setPreviewInput,
    programInput,
    setProgramInput,
  }), [previewInput, programInput]);

  return (
    <SwitcherContext.Provider value={value}>
      {children}
    </SwitcherContext.Provider>
  );
}
