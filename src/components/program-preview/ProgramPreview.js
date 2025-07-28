import React, { useRef, useEffect, useContext } from 'react';
import { InputContext } from '../../context/InputContext';
import { SwitcherContext } from '../../context/SwitcherContext';

function ProgramPreview() {
  const { inputs } = useContext(InputContext);
  const {
    previewInput,
    setPreviewInput,
    programInput,
    setProgramInput
  } = useContext(SwitcherContext);

  const previewVideoRef = useRef(null);
  const programVideoRef = useRef(null);
  const programCanvasRef = useRef(null);
  const transitionAnimationRef = useRef(null);

  const getStreamForInput = async (input) => {
    if (!input) return null;
    if (input.type === 'camera') {
      return navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: input.deviceId } } });
    }
    if (input.type === 'videoFile') {
      const videoEl = document.createElement('video');
      videoEl.src = input.url;
      videoEl.crossOrigin = 'anonymous';
      videoEl.loop = true;
      videoEl.muted = true;
      await videoEl.play();
      return videoEl.captureStream();
    }
    return null;
  };

  useEffect(() => {
    let stream;
    getStreamForInput(previewInput).then(s => {
      stream = s;
      if (previewVideoRef.current) previewVideoRef.current.srcObject = stream;
    });
    return () => stream?.getTracks().forEach(track => track.stop());
  }, [previewInput]);

  useEffect(() => {
    let stream;
    getStreamForInput(programInput).then(s => {
      stream = s;
      if (programVideoRef.current) programVideoRef.current.srcObject = stream;
    });
    return () => stream?.getTracks().forEach(track => track.stop());
  }, [programInput]);

  const handleCut = () => {
    if (transitionAnimationRef.current) cancelAnimationFrame(transitionAnimationRef.current);
    setProgramInput(previewInput);
  };

  const handleFade = () => {
    if (transitionAnimationRef.current) cancelAnimationFrame(transitionAnimationRef.current);

    const duration = 500; // 0.5 seconds
    let startTime = null;

    const fadeAnimation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const ctx = programCanvasRef.current.getContext('2d');
      const { width, height } = programCanvasRef.current;

      ctx.clearRect(0, 0, width, height);

      // Draw program with decreasing opacity
      ctx.globalAlpha = 1 - progress;
      if (programVideoRef.current && programVideoRef.current.readyState >= 2) {
        ctx.drawImage(programVideoRef.current, 0, 0, width, height);
      }

      // Draw preview with increasing opacity
      ctx.globalAlpha = progress;
      if (previewVideoRef.current && previewVideoRef.current.readyState >= 2) {
        ctx.drawImage(previewVideoRef.current, 0, 0, width, height);
      }

      ctx.globalAlpha = 1.0;

      if (progress < 1) {
        transitionAnimationRef.current = requestAnimationFrame(fadeAnimation);
      } else {
        setProgramInput(previewInput);
      }
    };
    transitionAnimationRef.current = requestAnimationFrame(fadeAnimation);
  };

  // Draw current program video to canvas continuously
  useEffect(() => {
    const renderLoop = () => {
      if (programVideoRef.current && programVideoRef.current.readyState >= 2 && programCanvasRef.current) {
        const ctx = programCanvasRef.current.getContext('2d');
        programCanvasRef.current.width = programVideoRef.current.videoWidth;
        programCanvasRef.current.height = programVideoRef.current.videoHeight;
        ctx.drawImage(programVideoRef.current, 0, 0, programCanvasRef.current.width, programCanvasRef.current.height);
      }
      requestAnimationFrame(renderLoop);
    };
    const animationFrameId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [programInput]);


  const containerStyle = { display: 'flex', gap: '10px', padding: '10px' };
  const videoContainerStyle = { flex: 1, border: '2px solid #555', padding: '5px' };

  return (
    <div>
      <div style={containerStyle}>
        <div style={videoContainerStyle}>
          <h4>Preview</h4>
          <video ref={previewVideoRef} autoPlay playsInline muted style={{ width: '100%' }} />
        </div>
        <div style={videoContainerStyle}>
          <h4>Program</h4>
          <canvas ref={programCanvasRef} style={{ width: '100%', backgroundColor: 'black' }} />
          <video ref={programVideoRef} autoPlay playsInline muted style={{ display: 'none' }} />
        </div>
      </div>
      <div style={{ padding: '10px' }}>
        <button onClick={handleCut}>Cut</button>
        <button onClick={handleFade}>Fade</button>
      </div>
      <div>
        <h5>Select Input for Preview:</h5>
        {inputs.map(input => (
          <button key={input.id} onClick={() => setPreviewInput(input)}>
            {input.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProgramPreview;
