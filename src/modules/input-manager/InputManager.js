import React, { useState, useEffect, useContext } from 'react';
import { InputContext } from '../../context/InputContext';
import { AssetContext } from '../../context/AssetContext';
import { SwitcherContext } from '../../context/SwitcherContext';
import TextEditorModal from '../../components/text-editor/TextEditorModal';
import SourceSelectorModal from '../../components/source-selector/SourceSelectorModal';

function InputManager() {
  const { inputs, addInput } = useContext(InputContext);
  const { assets } = useContext(AssetContext);
  const { previewInput, programInput } = useContext(SwitcherContext);
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);

  useEffect(() => {
    async function getDevices() {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter(device => device.kind === 'videoinput');
        const audioInputs = devices.filter(device => device.kind === 'audioinput');
        setVideoDevices(videoInputs);
        setAudioDevices(audioInputs);
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    }
    getDevices();
  }, []);

  const handleAddCamera = (device) => {
    addInput({
      type: 'camera',
      deviceId: device.deviceId,
      name: device.label || `Camera ${inputs.length + 1}`,
    });
  };

  const handleAddVideoFile = (asset) => {
    addInput({
      type: 'videoFile',
      assetId: asset.id,
      name: asset.name,
      url: asset.url,
    });
  };

  const handleSaveText = (textData) => {
    addInput({
      type: 'text',
      name: `Text: ${textData.line1}`,
      data: textData,
    });
  };

  const handleSourceSelect = (source) => {
    addInput({
      type: 'screen',
      sourceId: source.id,
      name: source.name,
    });
    setIsSourceModalOpen(false);
  };

  const handleAddAudio = (device) => {
    addInput({
      type: 'audio',
      deviceId: device.deviceId,
      name: device.label || `Audio Input ${inputs.length + 1}`,
    });
  };

  const videoAssets = assets.filter(asset => asset.type === 'video');

  return (
    <div>
      {isTextModalOpen && <TextEditorModal onClose={() => setIsTextModalOpen(false)} onSave={handleSaveText} />}
      {isSourceModalOpen && <SourceSelectorModal onClose={() => setIsSourceModalOpen(false)} onSelect={handleSourceSelect} />}
      <h4>Input Manager</h4>
      <div style={{ marginBottom: '20px' }}>
        <h5>Add New Input</h5>
        <button onClick={() => setIsTextModalOpen(true)}>Add Text</button>
        <button onClick={() => setIsSourceModalOpen(true)}>Add Screen/Window</button>
        <hr/>
        <h5>Available Cameras</h5>
        {videoDevices.map(device => (
          <button key={device.deviceId} onClick={() => handleAddCamera(device)}>
            Add {device.label || `Camera ${videoDevices.indexOf(device) + 1}`}
          </button>
        ))}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h5>Available Video Assets</h5>
        {videoAssets.map(asset => (
          <button key={asset.id} onClick={() => handleAddVideoFile(asset)}>
            Add {asset.name}
          </button>
        ))}
        {videoAssets.length === 0 && <p>No video assets imported.</p>}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h5>Available Audio Inputs</h5>
        {audioDevices.map(device => (
          <button key={device.deviceId} onClick={() => handleAddAudio(device)}>
            Add {device.label || `Audio Input ${audioDevices.indexOf(device) + 1}`}
          </button>
        ))}
      </div>
      <div>
        <h5>Active Inputs</h5>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {inputs.map(input => (
            <li key={input.id} style={{ marginBottom: '5px' }}>
              {programInput && programInput.id === input.id && <span style={{ color: 'red', marginRight: '5px' }}>● LIVE</span>}
              {previewInput && previewInput.id === input.id && <span style={{ color: 'yellow', marginRight: '5px' }}>● PREV</span>}
              <strong>{input.name}</strong> ({input.type})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InputManager;
