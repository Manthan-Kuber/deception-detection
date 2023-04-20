import { useReactMediaRecorder } from "react-media-recorder";
import { RiRecordCircleFill } from "react-icons/ri";
import { BsPauseCircle, BsStopCircleFill } from "react-icons/bs";
import { AiFillPlayCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

function App() {
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    clearBlobUrl,
    mediaBlobUrl,
  } = useReactMediaRecorder({ audio: true });

  const sendAudio = async () => {
    const audioBlob = await fetch(mediaBlobUrl!).then((r) => r.blob()); //Extract blob
    const audioFile = new File([audioBlob], "voice.wav", { type: "audio/wav" }); //Convert to audio
    const formData = new FormData();
    formData.append("file", audioFile); // append file to formData
    //TODO: Make api call here
  };

  const baseClass = "text-rose-500 hover:cursor-pointer ";

  return (
    <main className="grid min-h-screen place-items-center  bg-slate-800">
      <div>
        <p className="text-center text-white">{status}</p>
        <div className="flex gap-4 mt-4 justify-center z-40">
          {/* TODO: Pause / Resume buttons */}
          <AiFillPlayCircle
            className={`${baseClass}`}
            size={32}
            onClick={resumeRecording}
          />
          <TiDelete
            className={`${baseClass}`}
            size={32}
            onClick={clearBlobUrl}
          />
          <RiRecordCircleFill
            className={`${baseClass}`}
            size={32}
            onClick={startRecording}
          />{" "}
          <BsPauseCircle
            className={`${baseClass}`}
            size={32}
            onClick={pauseRecording}
          />
          <BsStopCircleFill
            className={`${baseClass}`}
            size={32}
            onClick={stopRecording}
          />
        </div>
        <div className="mt-4">
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
