import React, { useState, useEffect, useContext } from 'react';
import { InputContext } from '../../context/InputContext';

function InputManager() {
  const { inputs, addInput } = useContext(InputContext);
  const [videoDevices, setVideoDevices] = useState([]);

  useEffect(() => {
    async function getDevices() {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter(device => device.kind === 'videoinput');
        setVideoDevices(videoInputs);
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

  return (
    <div>
      <h4>Input Manager</h4>
      <div style={{ marginBottom: '20px' }}>
        <h5>Available Cameras</h5>
        {videoDevices.map(device => (
          <button key={device.deviceId} onClick={() => handleAddCamera(device)}>
            Add {device.label || `Camera ${videoDevices.indexOf(device) + 1}`}
          </button>
        ))}
      </div>
      <div>
        <h5>Active Inputs</h5>
        <ul>
          {inputs.map(input => (
            <li key={input.id}>
              <strong>{input.name}</strong> ({input.type})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InputManager;
