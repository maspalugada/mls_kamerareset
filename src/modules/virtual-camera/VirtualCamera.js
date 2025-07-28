import React, { useState, useEffect, useRef } from 'react';

function VirtualCamera() {
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    async function getDevices() {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter(device => device.kind === 'videoinput');
        setVideoDevices(videoInputs);
        if (videoInputs.length > 0) {
          setSelectedDeviceId(videoInputs[0].deviceId);
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
        alert("Could not access camera. Please grant permission in your browser settings.");
      }
    }
    getDevices();
  }, []);

  useEffect(() => {
    if (selectedDeviceId) {
      // Stop previous stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      async function getStream() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: selectedDeviceId } }
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error getting stream for device:", selectedDeviceId, err);
        }
      }
      getStream();
    }

    // Cleanup on component unmount
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [selectedDeviceId]);

  return (
    <div>
      <h4>Virtual Camera Source</h4>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="camera-select">Choose a camera: </label>
        <select
          id="camera-select"
          value={selectedDeviceId}
          onChange={(e) => setSelectedDeviceId(e.target.value)}
        >
          {videoDevices.map(device => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${videoDevices.indexOf(device) + 1}`}
            </option>
          ))}
        </select>
      </div>
      <div>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{ width: '100%', maxWidth: '500px', backgroundColor: 'black' }}
        />
      </div>
    </div>
  );
}

export default VirtualCamera;
