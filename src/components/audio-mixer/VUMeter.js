import React from 'react';

function VUMeter({ volume = 0 }) {
  const barStyle = {
    width: '100%',
    height: '10px',
    backgroundColor: '#ddd',
    borderRadius: '5px',
    overflow: 'hidden',
    marginTop: '5px',
  };

  const fillStyle = {
    height: '100%',
    backgroundColor: 'limegreen',
    width: `${volume * 100}%`,
    transition: 'width 0.05s linear',
  };

  return (
    <div style={barStyle}>
      <div style={fillStyle}></div>
    </div>
  );
}

export default VUMeter;
