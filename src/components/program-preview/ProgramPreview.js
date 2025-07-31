import React, { useRef, useEffect, useContext } from 'react';
import Split from 'split.js';
import { InputContext } from '../../context/InputContext';
import { SwitcherContext } from '../../context/SwitcherContext';
import RecordingButton from '../recording/RecordingButton';

/**
 * The main component for the live production switcher.
 * It displays a resizable Preview and Program window, handles transitions,
 * and allows selecting inputs.
 */
function ProgramPreview() {
  const { inputs } = useContext(InputContext);
  const {
    previewInput,
    setPreviewInput,
    programInput,
    setProgramInput
  } = useContext(SwitcherContext);

  // Refs for DOM elements
  const splitRef = useRef(null); // To hold the Split.js instance
  const previewVideoRef = useRef(null); // For the <video> element showing the preview stream
  const programVideoRef = useRef(null); // For the hidden <video> element that feeds the program canvas
  const programCanvasRef = useRef(null); // For the final <canvas> output, which allows for smooth transitions
  const transitionAnimationRef = useRef(null); // To hold the requestAnimationFrame ID for transitions

  /**
   * Generates a MediaStream for a given input source.
   * This is a key function that handles different input types.
   * @param {object} input - The input object from InputContext.
   * @returns {Promise<MediaStream|null>} A promise that resolves to a MediaStream or null.
   */
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

  // Effect to update the preview video element when the previewInput changes.
  useEffect(() => {
    let stream;
    getStreamForInput(previewInput).then(s => {
      stream = s;
      if (previewVideoRef.current) previewVideoRef.current.srcObject = stream;
    });
    // Cleanup: stop the stream tracks when the component unmounts or input changes.
    return () => stream?.getTracks().forEach(track => track.stop());
  }, [previewInput]);

  // Effect to update the (hidden) program video element when the programInput changes.
  useEffect(() => {
    let stream;
    getStreamForInput(programInput).then(s => {
      stream = s;
      if (programVideoRef.current) programVideoRef.current.srcObject = stream;
    });
    // Cleanup: stop the stream tracks.
    return () => stream?.getTracks().forEach(track => track.stop());
  }, [programInput]);

  /**
   * Handles the 'Cut' transition by immediately setting the program input to the preview input.
   */
  const handleCut = () => {
    if (transitionAnimationRef.current) cancelAnimationFrame(transitionAnimationRef.current);
    setProgramInput(previewInput);
  };

  /**
   * Handles the 'Fade' transition using a canvas and requestAnimationFrame.
   * It creates a smooth cross-fade between the program and preview video feeds.
   */
  const handleFade = () => {
    if (transitionAnimationRef.current) cancelAnimationFrame(transitionAnimationRef.current);

    const duration = 500; // Fade duration in ms
    let startTime = null;

    const fadeAnimation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const ctx = programCanvasRef.current.getContext('2d');
      const { width, height } = programCanvasRef.current;

      ctx.clearRect(0, 0, width, height);

      // Draw the current program video with decreasing opacity.
      ctx.globalAlpha = 1 - progress;
      if (programVideoRef.current && programVideoRef.current.readyState >= 2) {
        ctx.drawImage(programVideoRef.current, 0, 0, width, height);
      }

      // Draw the incoming preview video with increasing opacity.
      ctx.globalAlpha = progress;
      if (previewVideoRef.current && previewVideoRef.current.readyState >= 2) {
        ctx.drawImage(previewVideoRef.current, 0, 0, width, height);
      }

      ctx.globalAlpha = 1.0; // Reset alpha for other canvas operations.

      if (progress < 1) {
        transitionAnimationRef.current = requestAnimationFrame(fadeAnimation);
      } else {
        // When the animation is complete, set the new program input.
        setProgramInput(previewInput);
      }
    };
    transitionAnimationRef.current = requestAnimationFrame(fadeAnimation);
  };

  // This effect creates a continuous render loop to draw the program video to the canvas.
  // This ensures the canvas always shows the live program feed.
  useEffect(() => {
    const renderLoop = () => {
      if (programVideoRef.current && programVideoRef.current.readyState >= 2 && programCanvasRef.current) {
        const ctx = programCanvasRef.current.getContext('2d');
        // Match canvas resolution to video resolution
        programCanvasRef.current.width = programVideoRef.current.videoWidth;
        programCanvasRef.current.height = programVideoRef.current.videoHeight;
        ctx.drawImage(programVideoRef.current, 0, 0, programCanvasRef.current.width, programCanvasRef.current.height);
      }
      requestAnimationFrame(renderLoop);
    };
    const animationFrameId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [programInput]);

  // Effect to initialize and destroy the Split.js layout.
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

  const containerStyle = { display: 'flex', height: 'calc(100% - 100px)' };
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
