import { useReactMediaRecorder } from "react-media-recorder";
import { RiRecordCircleFill, RiRestartFill } from "react-icons/ri";
import { BsPauseCircle, BsStopCircleFill } from "react-icons/bs";
import { AiFillPlayCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import backgroundSvg from "./assets/background.svg";
import IconWrapper from "./components/IconWrapper";
import { ColorRing } from "react-loader-spinner";

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
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState("");

  const sendAudio = async () => {
    const audioBlob = await fetch(mediaBlobUrl!).then((r) => r.blob()); //Extract blob
    const audioFile = new File([audioBlob], "voice.wav", { type: "audio/wav" }); //Convert to audio
    const formData = new FormData();
    formData.append("sound", audioFile); // append file to formData
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const options = {
      method: "post",
      body: formData,
    };
    try {
      setIsLoading(true);
      const res = await fetch(serverUrl, options);
      const { prediction }: { prediction: number } = await res.json();
      console.log(prediction);
      setPrediction(prediction.toFixed(3).toString());
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const baseClass =
    "text-rose-500 hover:cursor-pointer hover:scale-110 transition-all ease-in-out hover:opacity-90 ";

  const CentralIconProps = {
    className: `${baseClass}`,
    size: 64,
  };

  const CentralIcon =
    status === "idle" || status === "acquiring_media" ? (
      <IconWrapper label="Record">
        <RiRecordCircleFill {...CentralIconProps} onClick={startRecording} />
      </IconWrapper>
    ) : status === "recording" ? (
      <IconWrapper label="Pause">
        <BsPauseCircle {...CentralIconProps} onClick={pauseRecording} />
      </IconWrapper>
    ) : status === "stopped" ? (
      <IconWrapper label="Reset">
        <RiRestartFill {...CentralIconProps} onClick={clearBlobUrl} />
      </IconWrapper>
    ) : (
      <IconWrapper label="Play">
        <AiFillPlayCircle {...CentralIconProps} onClick={resumeRecording} />
      </IconWrapper>
    );

  const isNotIdle = status === "recording" || status === "paused";
  status === "recording" || status === "paused";

  return (
    <div
      className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-slate-800 font-raleway bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <Header />
      <main className="flex items-center justify-center w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
        <div>
          <p className="text-center text-white  font-semibold tracking-wider text-2xl">
            {status[0].toUpperCase() + status.slice(1)}
          </p>
          <div className="flex gap-8 mt-4 justify-center items-center">
            <div className={`${isNotIdle ? "block" : "hidden"}`}>
              <IconWrapper label="Delete">
                <TiDelete
                  className={`${baseClass}`}
                  size={68}
                  onClick={clearBlobUrl}
                />
              </IconWrapper>
            </div>
            {CentralIcon}
            <div className={`${isNotIdle ? "block" : "hidden"}`}>
              <IconWrapper label="Stop">
                <BsStopCircleFill
                  className={`${baseClass}`}
                  size={48}
                  onClick={stopRecording}
                />
              </IconWrapper>
            </div>
          </div>
          <div className="mt-4">
            {status === "stopped" && mediaBlobUrl && (
              <>
                <audio src={mediaBlobUrl} controls className="rounded-md" />
                <form className="flex">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      sendAudio();
                    }}
                    type="submit"
                    className="text-white text-center font-semibold mx-auto border-rose-500 border mt-4 py-2 px-4 rounded-lg transition-colors hover:border-transparent hover:bg-rose-500 "
                  >
                    Submit
                  </button>
                </form>
              </>
            )}
          </div>
          <span className="text-white font-mono mt-4 block text-center font-semibold">
            {isLoading ? (
              <div className="flex items-center">
                <ColorRing
                  visible={true}
                  height="36"
                  width="36"
                  ariaLabel="blocks-loading"
                  wrapperClass="blocks-wrapper"
                  colors={[
                    "#67e8f9",
                    "#67e8f9",
                    "#f43f5e",
                    "#f43f5e",
                    "#f43f5e",
                  ]}
                />
                <span>Loading prediction...</span>
              </div>
            ) : (
              prediction && `Prediction is: ${prediction}`
            )}
          </span>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
