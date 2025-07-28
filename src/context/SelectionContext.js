import React, { createContext, useState, useMemo } from 'react';

export const SelectionContext = createContext();

export function SelectionProvider({ children }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const value = useMemo(() => ({ selectedItem, setSelectedItem }), [selectedItem]);

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}
