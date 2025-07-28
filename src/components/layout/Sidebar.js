import React from 'react';
import AssetLibrary from '../../modules/asset-library/AssetLibrary';

function Sidebar() {
  return (
    <div style={{ width: '250px', borderRight: '1px solid #ccc', padding: '10px' }}>
      Sidebar
      <AssetLibrary />
    </div>
  );
}

export default Sidebar;
