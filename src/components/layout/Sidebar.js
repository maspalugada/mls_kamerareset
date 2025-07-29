import React from 'react';
import AssetLibrary from '../../modules/asset-library/AssetLibrary';
import Settings from '../../modules/settings/Settings';
import CloudSync from '../../modules/cloud-sync/CloudSync';

function Sidebar() {
  const sidebarStyle = {
    width: '250px',
    flexShrink: 0,
    borderRight: '1px solid var(--border-color)',
    padding: '10px',
    backgroundColor: 'var(--panel-bg-color)',
    overflowY: 'auto', // Add scroll for content
  };

  return (
    <div style={sidebarStyle}>
      <h3>Sidebar</h3>
      <AssetLibrary />
      <hr style={{ borderColor: 'var(--border-color)' }} />
      <CloudSync />
      <hr style={{ borderColor: 'var(--border-color)' }} />
      <Settings />
    </div>
  );
}

export default Sidebar;
