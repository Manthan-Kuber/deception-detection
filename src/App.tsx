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
    const audioBlob = await fetch(mediaBlobUrl!).then((r) => r.blob()); //Extract blob
    const audioFile = new File([audioBlob], "voice.wav", { type: "audio/wav" }); //Convert to audio
    const formData = new FormData();
    formData.append("file", audioFile); // append file to formData
    //TODO: Make api call here
  };
  return (
    <main className="grid min-h-screen place-items-center">
      <div>
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px] -z-10" />
        <p className="text-center" >{status}</p>
        <div className="flex gap-4 mt-4 justify-center">
          <button
            onClick={startRecording}
            className="p-2 bg-slate-500 text-white rounded-lg border-2 border-transparent  hover:border-sky-500"
          >
            Start{" "}
          </button>
          {/* TODO: Pause / Resume buttons */}
          <button
            onClick={pauseRecording}
            className="p-2 bg-slate-500 text-white rounded-lg border-2 border-transparent  hover:border-sky-500"
          >
            Pause{" "}
          </button>
          <button
            onClick={stopRecording}
            className="p-2 bg-slate-500 text-white rounded-lg border-2 border-transparent  hover:border-sky-500"
          >
            Stop{" "}
          </button>
        </div>
        <div className="mt-4" >
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
    </main>
  );
}

export default App;
