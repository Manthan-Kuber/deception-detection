import { useReactMediaRecorder } from "react-media-recorder";

function App() {
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ audio: true });

  const sendAudio = async () => {
    const audioBlob = await fetch(mediaBlobUrl as RequestInfo).then((r) =>
      r.blob()
    ); //Extract blob
    const audioFile = new File([audioBlob], "voice.wav", { type: "audio/wav" }); //Convert to audio
    const formData = new FormData();
    formData.append("file", audioFile); // append file to formData
    //TODO: Make api call here
  };
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
            <>
              <audio src={mediaBlobUrl} controls />
              <form>
                <button onClick={sendAudio}>Submit</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
