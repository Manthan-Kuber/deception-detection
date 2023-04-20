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

  const baseClass =
    "text-rose-500 hover:cursor-pointer hover:scale-110 transition-all ease-in-out hover:opacity-90 ";

  const CentralIconProps = {
    className: `${baseClass}`,
    size: 64,
  };

  const CentralIcon =
    status === "idle" || status === "acquiring_media" ? (
      <RiRecordCircleFill {...CentralIconProps} onClick={startRecording} />
    ) : status === "recording" ? (
      <BsPauseCircle {...CentralIconProps} onClick={pauseRecording} />
    ) : (
      <AiFillPlayCircle {...CentralIconProps} onClick={resumeRecording} />
    );

  const isNotIdle = status === "recording" || status === "paused";
  status === "recording" || status === "paused";

  return (
    <main className="grid min-h-screen place-items-center font-raleway  bg-slate-800">
      <div>
        <p className="text-center text-white  font-semibold tracking-wider text-2xl">
          {status}
        </p>
        <div className="flex gap-8 mt-4 justify-center items-center">
          <TiDelete
            className={`${baseClass} ${isNotIdle ? "block" : "hidden"}`}
            size={68}
            onClick={clearBlobUrl}
          />
          {CentralIcon}
          <BsStopCircleFill
            className={`${baseClass} ml-3 ${isNotIdle ? "block " : "hidden"}`}
            size={48}
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
