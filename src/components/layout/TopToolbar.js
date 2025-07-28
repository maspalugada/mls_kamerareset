import React from 'react';

function TopToolbar() {
  const toolbarStyle = {
    borderBottom: '1px solid var(--border-color)',
    padding: '10px',
    backgroundColor: 'var(--panel-bg-color)',
  };
  return <div style={toolbarStyle}>Top Toolbar</div>;
}

export default TopToolbar;
