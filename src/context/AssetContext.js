import React, { createContext, useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const AssetContext = createContext();

export function AssetProvider({ children }) {
  const [assets, setAssets] = useState([]);

  const addAssets = (files) => {
    const newAssets = Array.from(files).map(file => {
      const type = file.type.split('/')[0];
      return {
        id: uuidv4(),
        name: file.name,
        type: type, // 'video', 'audio', 'image'
        url: URL.createObjectURL(file),
      };
    });
    setAssets(prevAssets => [...prevAssets, ...newAssets]);
  };

  const value = useMemo(() => ({ assets, addAssets }), [assets]);

  return (
    <AssetContext.Provider value={value}>
      {children}
    </AssetContext.Provider>
  );
}
