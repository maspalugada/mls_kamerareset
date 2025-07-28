import React, { useRef, useContext } from 'react';
import { AssetContext } from '../../context/AssetContext';

function AssetLibrary() {
  const fileInputRef = useRef(null);
  const { assets, addAssets } = useContext(AssetContext);

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      addAssets(files);
    }
  };

  const handleDragStart = (event, asset) => {
    event.dataTransfer.setData('application/json', JSON.stringify(asset));
    event.dataTransfer.effectAllowed = 'copy';
  };

  const getAssetIcon = (type) => {
    if (type === 'video') return '🎬';
    if (type === 'audio') return '🎵';
    if (type === 'image') return '🖼️';
    return '📄';
  };

  const assetListStyle = {
    marginTop: '10px',
    maxHeight: '200px',
    overflowY: 'auto',
  };

  const assetItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    border: '1px solid var(--border-color)',
    borderRadius: '4px',
    marginBottom: '5px',
    cursor: 'grab',
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4>Asset Library</h4>
        <button onClick={handleImportClick}>Import</button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept="video/*,audio/*,image/*"
        style={{ display: 'none' }}
      />
      <div style={assetListStyle}>
        {assets.length === 0 && <p>No assets yet. Click Import.</p>}
        {assets.map(asset => (
          <div
            key={asset.id}
            style={assetItemStyle}
            draggable
            onDragStart={(e) => handleDragStart(e, asset)}
          >
            <span style={{ marginRight: '10px', fontSize: '1.5em' }}>{getAssetIcon(asset.type)}</span>
            <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{asset.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssetLibrary;
