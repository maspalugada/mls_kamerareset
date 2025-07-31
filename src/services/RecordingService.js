class RecordingService {
  constructor() {
    this.mediaRecorder = null;
    this.recordedChunks = [];
    this.isRecording = false;
    this.onStop = null;
  }

  start(stream, onStopCallback) {
    if (this.isRecording) return;

    this.onStop = onStopCallback;
    this.recordedChunks = [];

    // Prefer webm with vp9 for better quality if available
    const options = { mimeType: 'video/webm; codecs=vp9' };
    try {
      this.mediaRecorder = new MediaRecorder(stream, options);
    } catch (e) {
      console.log('vp9 not supported, falling back to default');
      this.mediaRecorder = new MediaRecorder(stream);
    }

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.recordedChunks, {
        type: this.mediaRecorder.mimeType,
      });
      if (this.onStop) {
        this.onStop(blob);
      }
      this.isRecording = false;
    };

    this.mediaRecorder.start();
    this.isRecording = true;
  }

  stop() {
    if (!this.isRecording || !this.mediaRecorder) return;
    this.mediaRecorder.stop();
  }
}

const recordingService = new RecordingService();
export default recordingService;
