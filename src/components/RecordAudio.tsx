import { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { RiRecordCircleFill, RiRestartFill } from "react-icons/ri";
import { BsPauseCircle, BsStopCircleFill } from "react-icons/bs";
import { AiFillPlayCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import IconWrapper from "./IconWrapper";
import Button from "./Button";
import ShowPrediction from "./ShowPrediction";

const baseClass =
  "text-rose-500 hover:cursor-pointer hover:scale-110 transition-all ease-in-out hover:opacity-90 ";

const CentralIconProps = {
  className: `${baseClass}`,
  size: 64,
};

const RecordAudio = ({ sendAudio, controller, prediction }: AudioProps) => {
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    clearBlobUrl,
    mediaBlobUrl,
  } = useReactMediaRecorder({
    audio: true,
    mediaRecorderOptions: { mimeType: "audio/wav" },
  });

  const [isLoading, setIsLoading] = useState(false);

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
    sendAudio(options, setIsLoading);
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
      <IconWrapper label="Resume">
        <AiFillPlayCircle {...CentralIconProps} onClick={resumeRecording} />
      </IconWrapper>
    );

  const isNotIdle = status === "recording" || status === "paused";
  status === "recording" || status === "paused";
  return (
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
            <audio src={mediaBlobUrl} controls className="rounded-md w-full" />
            <form className="flex">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                disabled={isLoading}
              >
                Submit{" "}
              </Button>
            </form>
          </>
        )}
      </div>
      <ShowPrediction isLoading={isLoading} prediction={prediction} />
    </div>
  );
};
export default RecordAudio;
