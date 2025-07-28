import React, { useContext } from 'react';
import { SelectionContext } from '../../context/SelectionContext';
import { TimelineContext } from '../../context/TimelineContext';

function TimelineView() {
  const { selectedItem, setSelectedItem } = useContext(SelectionContext);
  const { tracks, addClip } = useContext(TimelineContext);

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (event, trackId) => {
    event.preventDefault();
    const asset = JSON.parse(event.dataTransfer.getData('application/json'));

    const track = tracks.find(t => t.id === trackId);
    if (track && asset.type === track.type) {
      addClip(trackId, asset);
    } else {
      alert(`Cannot drop a ${asset.type} asset into a ${track.type} track.`);
    }
  };

  const timelineStyle = {
    height: '250px',
    borderTop: '1px solid var(--border-color)',
    padding: '10px',
    backgroundColor: 'var(--panel-bg-color)',
    overflowY: 'auto',
  };

  const trackStyle = {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: 'var(--bg-color)',
    border: '1px solid var(--border-color)',
    minHeight: '50px',
    position: 'relative',
  };

  const clipStyle = (clip) => ({
    position: 'absolute',
    left: `${clip.startTime / 100}px`, // Simple mapping of ms to px
    width: `${clip.duration / 100}px`,
    backgroundColor: clip.type === 'video' ? 'var(--accent-color)' : 'seagreen',
    color: 'white',
    padding: '5px',
    borderRadius: '4px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    border: selectedItem && selectedItem.id === clip.id ? '2px solid yellow' : 'none',
  });

  return (
    <div style={timelineStyle}>
      <h4>Timeline</h4>
      {tracks.map(track => (
        <div
          key={track.id}
          style={trackStyle}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, track.id)}
        >
          <strong>{track.type.charAt(0).toUpperCase() + track.type.slice(1)} Track</strong>
          {track.clips.map(clip => (
            <div
              key={clip.id}
              style={clipStyle(clip)}
              onClick={() => setSelectedItem(clip)}
            >
              {clip.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TimelineView;
