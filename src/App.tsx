import { useState, useRef } from "react";
import Header from "./components/Header";
import backgroundSvg from "./assets/background.svg";
import { motion, AnimatePresence } from "framer-motion";
import RecordAudio from "./components/RecordAudio";
import Button from "./components/Button";
import { MdAudiotrack } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const Tabs = [
  { id: 0, label: "Record" },
  { id: 1, label: "Upload" },
];

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [selectedTab, setSelectedTab] = useState(Tabs[0]);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isFileSelected, setIsFileSelected] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const initialFileName = "No file Selected...";
  const [fileName, setFileName] = useState(initialFileName);

  const controller = new AbortController();

  //Use the same to upload audio
  const sendAudio = async <T extends RequestInit>(options: T) => {
    setIsLoading(true);
    try {
      const res = await fetch(serverUrl, options);
      const { prediction }: { prediction: number } = await res.json();
      console.log(prediction);
      setPrediction(prediction.toFixed(3).toString());
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const RecordAudioProps = {
    sendAudio,
    isLoading,
    setIsLoading,
    controller,
    prediction,
  };

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
    sendAudio(options);
  };

  return (
    <div
      className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-slate-800 font-raleway bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <Header />
      <main className="flex items-center justify-center w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 px-4">
        <div className="p-1 grid grid-rows-[auto_1fr] border border-neutral-600 w-full min-h-[25rem] max-w-[23rem] bg-neutral-900 rounded-md">
          <ul className="text-white flex items-center">
            {Tabs.map((tab) => (
              <li
                key={tab.id}
                onClick={() => {
                  setSelectedTab(tab);
                }}
                className="relative hover:cursor-pointer hover:bg-neutral-800 p-2 rounded-tl-md rounded-tr-md flex-1"
              >
                {tab.label}
                {tab === selectedTab && (
                  <motion.div
                    className="absolute bg-gradient-to-r inset-x-0 h-0.5 bottom-0 from-rose-500 to-cyan-300"
                    layoutId="underline"
                  />
                )}
              </li>
            ))}
          </ul>
          <div className="grid place-items-center" >
          <AnimatePresence mode="wait">
            {/* TODO: Center tabcontent */}
            <motion.div
              key={selectedTab ? selectedTab.label : "empty"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {selectedTab.label === "Record" ? (
                <RecordAudio {...RecordAudioProps} />
              ) : (
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
              )}
            </motion.div>
          </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
