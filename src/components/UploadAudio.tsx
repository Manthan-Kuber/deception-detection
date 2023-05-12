import { useState, useRef } from "react";
import { MdAudiotrack } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import Button from "./Button";
import ShowPrediction from "./ShowPrediction";

const UploadAudio = ({ controller, sendAudio, prediction }: AudioProps) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isFileSelected, setIsFileSelected] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const initialFileName = "No file Selected...";
  const [fileName, setFileName] = useState(initialFileName);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files![0]);
    setFileName(e.target.files![0].name);
    setIsFileSelected(true);
  };

  const handleUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { signal } = controller;
    const formData = new FormData();
    formData.append("sound", selectedFile!);
    const options = {
      signal, //Pass the signal to fetch promise
      method: "post",
      body: formData,
    };
    sendAudio(options, setIsLoading);
  };
  return (
    <>
      <form className="text-white grid place-items-center">
        <input
          type="file"
          accept="audio/*"
          name="sound"
          ref={inputFileRef}
          id="audioInput"
          hidden
          disabled={isLoading}
          onChange={(e) => handleChange(e)}
        />
        <section className="flex flex-col items-center">
          <div
            onClick={() => {
              inputFileRef.current?.click();
            }}
            className=" flex items-center gap-1 w-fit hover:cursor-pointer p-2 rounded-md bg-rose-500"
          >
            <span>Browse Audio</span>
            <MdAudiotrack size={16} />
          </div>
          <div className="flex items-center mt-4 gap-4">
            <label htmlFor="audioInput">{fileName}</label>
            <div
              className="p-2 rounded-md bg-red-500 hover:cursor-pointer"
              onClick={() => {
                setSelectedFile(undefined);
                setIsFileSelected(false);
                setFileName(initialFileName);
              }}
            >
              <BsFillTrashFill size={16} />
            </div>
          </div>
        </section>
        <Button
          disabled={!isFileSelected || isLoading}
          onClick={(e) => handleUpload(e)}
        >
          Upload
        </Button>
      </form>
      <ShowPrediction prediction={prediction} isLoading={isLoading} />
    </>
  );
};
export default UploadAudio;
