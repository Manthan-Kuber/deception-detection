import { useReactMediaRecorder } from "react-media-recorder";

function App() {
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ audio: true });
  return (
    <div className="grid min-h-screen place-items-center">
      <div>
        <p>{status}</p>
        <div>
          <button onClick={startRecording}>Start </button>
          {/* TODO: Pause / Resume buttons */}
          <button onClick={pauseRecording}>Pause</button>
          <button onClick={stopRecording}>Stop </button>
          {status === "stopped" && mediaBlobUrl && (
            <audio src={mediaBlobUrl} controls />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
