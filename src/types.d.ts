interface AudioProps {
  sendAudio: <T extends RequestInit>(
    options: T,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  setPrediction: React.Dispatch<React.SetStateAction<string>>;
  controller: AbortController;
  prediction: string;
}
