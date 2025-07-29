import React, { useContext } from 'react';
import { SelectionContext } from '../../context/SelectionContext';
import VideoProperties from './VideoProperties';
import AudioProperties from './AudioProperties';

function InspectorPanel() {
  const { selectedItem } = useContext(SelectionContext);

  const panelStyle = {
    width: '300px',
    flexShrink: 0,
    borderLeft: '1px solid var(--border-color)',
    padding: '10px',
    backgroundColor: 'var(--panel-bg-color)',
    overflowY: 'auto',
  };

  const renderProperties = () => {
    if (!selectedItem) {
      return <p>No item selected</p>;
    }

    switch (selectedItem.type) {
      case 'video':
        return <VideoProperties item={selectedItem} />;
      case 'audio':
        return <AudioProperties item={selectedItem} />;
      default:
        return <p>Unknown item type</p>;
    }
  };

  return (
    <div style={panelStyle}>
      <h3>Inspector</h3>
      {renderProperties()}
    </div>
  );
}

export default InspectorPanel;
