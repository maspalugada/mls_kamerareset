import React, { useRef, useEffect, useContext } from 'react';
import Split from 'split.js';
import { InputContext } from '../../context/InputContext';
import { SwitcherContext } from '../../context/SwitcherContext';
import RecordingButton from '../recording/RecordingButton';

function ProgramPreview() {
  const { inputs } = useContext(InputContext);
  const {
    previewInput,
    setPreviewInput,
    programInput,
    setProgramInput
  } = useContext(SwitcherContext);

  const splitRef = useRef(null);
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
    if (input.type === 'text') {
        const canvas = document.createElement('canvas');
        canvas.width = 1920;
        canvas.height = 1080;
        const ctx = canvas.getContext('2d');

        // Simple lower third style
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 900, 1920, 180);

        ctx.fillStyle = 'white';
        ctx.font = 'bold 72px Arial';
        ctx.fillText(input.data.line1, 50, 980);

        ctx.font = '48px Arial';
        ctx.fillText(input.data.line2, 50, 1050);

        return canvas.captureStream();
    }
    if (input.type === 'screen') {
        return navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: input.sourceId,
            },
          },
        });
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


  useEffect(() => {
    splitRef.current = Split(['#preview-panel', '#program-panel'], {
      sizes: [50, 50],
      minSize: 200,
      gutterSize: 10,
      cursor: 'col-resize',
    });

    return () => {
      if (splitRef.current) {
        splitRef.current.destroy();
      }
    };
  }, []);

  const containerStyle = { display: 'flex', height: 'calc(100% - 100px)' }; // Adjust height to leave space for controls
  const videoContainerStyle = { padding: '5px', overflow: 'hidden' };

  const handleResetLayout = () => {
    if (splitRef.current) {
      splitRef.current.setSizes([50, 50]);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div id="studio-mode-container" style={containerStyle}>
        <div id="preview-panel" style={videoContainerStyle}>
          <h4>Preview</h4>
          <video ref={previewVideoRef} autoPlay playsInline muted style={{ width: '100%', height: 'auto' }} />
        </div>
        <div id="program-panel" style={videoContainerStyle}>
          <h4>Program</h4>
          <canvas ref={programCanvasRef} style={{ width: '100%', height: 'auto', backgroundColor: 'black' }} />
          <video ref={programVideoRef} autoPlay playsInline muted style={{ display: 'none' }} />
        </div>
      </div>
      <div style={{ padding: '10px', display: 'flex', gap: '10px', flexShrink: 0 }}>
        <button onClick={handleCut}>Cut</button>
        <button onClick={handleFade}>Fade</button>
        <RecordingButton programCanvasRef={programCanvasRef} />
        <button onClick={handleResetLayout} title="Reset Layout">⟳</button>
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
