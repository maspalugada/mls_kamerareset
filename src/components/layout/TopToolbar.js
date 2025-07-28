import React from 'react';
import NetworkStatusIndicator from '../network-status/NetworkStatusIndicator';

function TopToolbar() {
  const toolbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--border-color)',
    padding: '10px',
    backgroundColor: 'var(--panel-bg-color)',
  };
  return (
    <div style={toolbarStyle}>
      <span>Top Toolbar</span>
      <NetworkStatusIndicator />
    </div>
  );
}

export default TopToolbar;
