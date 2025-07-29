import React from 'react';
import AssetLibrary from '../../modules/asset-library/AssetLibrary';
import CloudSync from '../../modules/cloud-sync/CloudSync';

function Sidebar({ onSettingsClick }) {
  const sidebarStyle = {
    width: '250px',
    flexShrink: 0,
    borderRight: '1px solid var(--border-color)',
    padding: '10px',
    backgroundColor: 'var(--panel-bg-color)',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  };

  const mainContentStyle = {
    flexGrow: 1,
  };

  const footerStyle = {
    paddingTop: '10px',
    marginTop: 'auto',
    borderTop: '1px solid var(--border-color)',
  };

  const settingsButtonStyle = {
    background: 'none',
    border: 'none',
    color: 'var(--font-color)',
    cursor: 'pointer',
    fontSize: '1.5em',
  };

  return (
    <div style={sidebarStyle}>
      <div style={mainContentStyle}>
        <h3>Sidebar</h3>
        <AssetLibrary />
        <hr style={{ borderColor: 'var(--border-color)' }} />
        <CloudSync />
      </div>
      <div style={footerStyle}>
        <button onClick={onSettingsClick} style={settingsButtonStyle} title="Settings">
          ⚙️
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
