import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import backgroundSvg from "./assets/background.svg";
import { motion, AnimatePresence } from "framer-motion";
import RecordAudio from "./components/RecordAudio";
import Button from "./components/Button";

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
        <div className="p-1 border border-neutral-600 w-full min-h-[20rem] max-w-[23rem] max-h-[20rem]   bg-neutral-900 rounded-md">
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
          <AnimatePresence mode="wait">
            <motion.div
              className="my-auto py-10 px-4"
              key={selectedTab ? selectedTab.label : "empty"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {selectedTab.label === "Record" ? (
                <div className="flex flex-col items-center">
                  <RecordAudio {...RecordAudioProps} />
                </div>
              ) : (
                <form className="text-white grid place-items-center">
                  <input
                    type="file"
                    accept="audio/*"
                    name="sound"
                    onChange={(e) => handleChange(e)}
                  />
                  <Button
                    disabled={!isFileSelected}
                    onClick={(e) => handleUpload(e)}
                  >
                    Upload
                  </Button>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
