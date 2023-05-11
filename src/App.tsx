import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import backgroundSvg from "./assets/background.svg";
import RecordAudio from "./components/RecordAudio";

const serverUrl = import.meta.env.VITE_SERVER_URL;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState("");

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

  return (
    <div
      className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-slate-800 font-raleway bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <Header />
      <main className="flex items-center justify-center w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
        {/* TODO: Create Tabs around wrapper div below*/}
        <div>
          <RecordAudio {...RecordAudioProps} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
