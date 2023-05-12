interface AudioProps {
  sendAudio: <T extends RequestInit>(
    options: T,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  controller: AbortController;
  prediction: string;
}
