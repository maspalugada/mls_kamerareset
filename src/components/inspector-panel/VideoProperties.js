import React from 'react';

function VideoProperties({ item }) {
  return (
    <div>
      <h4>Video Properties</h4>
      <p>ID: {item.id}</p>
      <p>Type: {item.type}</p>
      <label>
        Scale:
        <input type="number" defaultValue="100" />
      </label>
      <br />
      <label>
        Opacity:
        <input type="number" defaultValue="100" />
      </label>
    </div>
  );
}

export default VideoProperties;
