import React, { useState, useEffect } from 'react';

function SourceSelectorModal({ onSelect, onClose }) {
  const [sources, setSources] = useState([]);

  useEffect(() => {
    async function fetchSources() {
      const screenSources = await window.electronAPI.getScreenSources();
      setSources(screenSources);
    }
    fetchSources();
  }, []);

  const modalStyle = {
    position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    backgroundColor: 'var(--panel-bg-color)', padding: '20px', borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)', zIndex: 1001, width: '80vw', maxWidth: '800px',
  };
  const overlayStyle = {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
  };
  const listStyle = {
    display: 'flex', flexWrap: 'wrap', gap: '10px', maxHeight: '70vh', overflowY: 'auto',
  };
  const itemStyle = {
    width: '200px', border: '1px solid var(--border-color)', borderRadius: '4px',
    padding: '5px', cursor: 'pointer', textAlign: 'center',
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={modalStyle}>
        <h3>Select a Screen or Window</h3>
        <div style={listStyle}>
          {sources.map(source => (
            <div key={source.id} style={itemStyle} onClick={() => onSelect(source)}>
              <img src={source.thumbnail.toDataURL()} style={{ width: '100%', height: 'auto' }} alt={source.name} />
              <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{source.name}</p>
            </div>
          ))}
        </div>
        <button onClick={onClose} style={{ marginTop: '20px' }}>Cancel</button>
      </div>
    </>
  );
}

export default SourceSelectorModal;
