import React from 'react';
import AssetLibrary from '../../modules/asset-library/AssetLibrary';
import Settings from '../../modules/settings/Settings';

function Sidebar() {
  const sidebarStyle = {
    width: '250px',
    borderRight: '1px solid var(--border-color)',
    padding: '10px',
    backgroundColor: 'var(--panel-bg-color)',
  };

  return (
    <div style={sidebarStyle}>
      <h3>Sidebar</h3>
      <AssetLibrary />
      <hr style={{ borderColor: 'var(--border-color)' }} />
      <Settings />
    </div>
  );
}

export default Sidebar;
