import { useState } from "react";
import Header from "./components/Header";
import backgroundSvg from "./assets/background.svg";
import { motion, AnimatePresence } from "framer-motion";
import RecordAudio from "./components/RecordAudio";
import UploadAudio from "./components/UploadAudio";
import toast from "react-hot-toast";
import Footer from "./components/Footer";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const Tabs = [{ label: "Record" }, { label: "Upload" }];

function App() {
  const [prediction, setPrediction] = useState("");
  const [selectedTab, setSelectedTab] = useState(Tabs[0]);

  const controller = new AbortController();

  //Use the same to upload audio
  const sendAudio = async <T extends RequestInit>(
    options: T,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setIsLoading(true);
    try {
      const res = await fetch(serverUrl, options);
      const { prediction }: { prediction: number } = await res.json();
      console.log(prediction);
      setPrediction(prediction.toFixed(3).toString());
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      let errMess = "An error occured";
      if ((e as any).name === "AbortError") {
        errMess = "Operation was aborted";
      }
      toast.error(errMess);
      setIsLoading(false);
    }
  };

  const handleTabChange = (tab: (typeof Tabs)[0]) => {
    setSelectedTab(tab);
    if (selectedTab !== tab) controller.abort();
  };

  const AudioProps = {
    sendAudio,
    controller,
    prediction,
  };

  const TabContent = selectedTab.label === "Record" ? RecordAudio : UploadAudio;
  
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
                key={tab.label}
                onClick={() => handleTabChange(tab)}
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
          <div className="grid place-items-center p-4">
            <motion.div
              key={selectedTab ? selectedTab.label : "empty"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {<TabContent {...AudioProps} />}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
