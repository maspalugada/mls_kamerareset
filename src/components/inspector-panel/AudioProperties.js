import React from 'react';

function AudioProperties({ item }) {
  return (
    <div>
      <h4>Audio Properties</h4>
      <p>ID: {item.id}</p>
      <p>Type: {item.type}</p>
      <label>
        Volume:
        <input type="number" defaultValue="0" /> dB
      </label>
      <br />
      <label>
        Pan:
        <input type="range" min="-100" max="100" defaultValue="0" />
      </label>
    </div>
  );
}

export default AudioProperties;
