import React, { useState } from 'react';

function TextEditorModal({ onSave, onClose }) {
  const [line1, setLine1] = useState('John Doe');
  const [line2, setLine2] = useState('Presenter');

  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'var(--panel-bg-color)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    zIndex: 1001,
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  };

  const handleSave = () => {
    onSave({ line1, line2 });
    onClose();
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={modalStyle}>
        <h3>Add Text Input</h3>
        <div style={{ marginBottom: '10px' }}>
          <label>Line 1:</label>
          <input type="text" value={line1} onChange={(e) => setLine1(e.target.value)} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Line 2:</label>
          <input type="text" value={line2} onChange={(e) => setLine2(e.target.value)} />
        </div>
        <button onClick={handleSave}>Save Input</button>
        <button onClick={onClose} style={{ marginLeft: '10px' }}>Cancel</button>
      </div>
    </>
  );
}

export default TextEditorModal;
