import { useReactMediaRecorder } from "react-media-recorder";
import { RiRecordCircleFill, RiRestartFill } from "react-icons/ri";
import { BsPauseCircle, BsStopCircleFill } from "react-icons/bs";
import { AiFillPlayCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { ColorRing } from "react-loader-spinner";
import IconWrapper from "./IconWrapper";

const baseClass =
  "text-rose-500 hover:cursor-pointer hover:scale-110 transition-all ease-in-out hover:opacity-90 ";

const CentralIconProps = {
  className: `${baseClass}`,
  size: 64,
};

interface Props {
  sendAudio: <T extends RequestInit>(options: T) => Promise<void>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  controller: AbortController;
  prediction: string;
}

const RecordAudio = ({
  sendAudio,
  isLoading,
  controller,
  setIsLoading,
  prediction,
}: Props) => {
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    clearBlobUrl,
    mediaBlobUrl,
  } = useReactMediaRecorder({ audio: true });
  const resetRecording = () => {
    controller.abort(); //Abort the initiated fetch request
    clearBlobUrl();
    setIsLoading(false);
  };
  const handleSubmit = async () => {
    const audioBlob = await fetch(mediaBlobUrl!).then((r) => r.blob()); //Extract blob
    const audioFile = new File([audioBlob], "voice.wav", { type: "audio/wav" }); //Convert to audio
    const formData = new FormData();
    const { signal } = controller;
    formData.append("sound", audioFile); // append file to formData
    const options = {
      signal, //Pass the signal to fetch promise
      method: "post",
      body: formData,
    };
    sendAudio(options);
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
        <RiRestartFill {...CentralIconProps} onClick={resetRecording} />
      </IconWrapper>
    ) : (
      <IconWrapper label="Play">
        <AiFillPlayCircle {...CentralIconProps} onClick={resumeRecording} />
      </IconWrapper>
    );

  const isNotIdle = status === "recording" || status === "paused";
  status === "recording" || status === "paused";
  return (
    <>
      <p className="text-center text-white  font-semibold tracking-wider text-2xl">
        {status[0].toUpperCase() + status.slice(1)}
      </p>
      <div className="flex gap-8 mt-4 justify-center items-center">
        <div className={`${isNotIdle ? "block" : "hidden"}`}>
          <IconWrapper label="Delete">
            <TiDelete
              className={`${baseClass}`}
              size={68}
              onClick={resetRecording}
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
                  handleSubmit();
                }}
                type="submit"
                className="text-white text-center font-semibold mx-auto border-rose-500 border mt-4 py-2 px-4 rounded-lg transition-colors hover:border-transparent hover:bg-rose-500 disabled:border-gray-500 disabled:text-gray-500 disabled:hover:bg-transparent disabled:hover:border-gray-500 "
                disabled={isLoading}
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
      <span className="text-white font-mono mt-4 block text-center font-semibold">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <ColorRing
              visible={true}
              height="36"
              width="36"
              ariaLabel="blocks-loading"
              wrapperClass="blocks-wrapper"
              colors={["#67e8f9", "#67e8f9", "#f43f5e", "#f43f5e", "#f43f5e"]}
            />
            <span>Loading prediction...</span>
          </div>
        ) : (
          prediction && `Prediction is: ${prediction}`
        )}
      </span>
    </>
  );
};
export default RecordAudio;
