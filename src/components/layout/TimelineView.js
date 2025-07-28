import React, { useContext } from 'react';
import { SelectionContext } from '../../context/SelectionContext';

const mockItems = [
  { id: 'v1', type: 'video', name: 'Clip 1' },
  { id: 'a1', type: 'audio', name: 'Soundtrack' },
  { id: 'v2', type: 'video', name: 'Clip 2' },
];

function TimelineView() {
  const { setSelectedItem } = useContext(SelectionContext);

  const timelineStyle = {
    height: '200px',
    borderTop: '1px solid var(--border-color)',
    padding: '10px',
    backgroundColor: 'var(--panel-bg-color)',
    overflowY: 'auto',
  };

  const itemStyle = {
    padding: '8px',
    margin: '4px 0',
    backgroundColor: 'var(--bg-color)',
    border: '1px solid var(--border-color)',
    cursor: 'pointer',
  };

  return (
    <div style={timelineStyle}>
      <h4>Timeline</h4>
      {mockItems.map(item => (
        <div
          key={item.id}
          style={itemStyle}
          onClick={() => setSelectedItem(item)}
        >
          {item.name} ({item.type})
        </div>
      ))}
    </div>
  );
}

export default TimelineView;
