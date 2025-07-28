import React, { createContext, useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const TimelineContext = createContext();

const initialTracks = [
  { id: 'track-v1', type: 'video', clips: [] },
  { id: 'track-a1', type: 'audio', clips: [] },
];

export function TimelineProvider({ children }) {
  const [tracks, setTracks] = useState(initialTracks);

  const addClip = (trackId, asset) => {
    const newClip = {
      id: uuidv4(),
      assetId: asset.id,
      name: asset.name,
      type: asset.type,
      // In a real app, you'd get duration from the asset metadata
      duration: 5000, // mock duration 5s
      startTime: 0, // mock start time
    };

    setTracks(prevTracks =>
      prevTracks.map(track => {
        if (track.id === trackId) {
          return { ...track, clips: [...track.clips, newClip] };
        }
        return track;
      })
    );
  };

  const value = useMemo(() => ({ tracks, addClip }), [tracks]);

  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
}
