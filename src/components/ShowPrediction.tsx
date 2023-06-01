import { ColorRing } from "react-loader-spinner";

interface Props {
  isLoading: boolean;
  prediction: string;
}

const getPredictionString = (predNumber: number) => {
  let predString = "";
  if (predNumber > 80) predString = "Mostly Truth";
  if (predNumber > 60 && predNumber < 80) predString = "Probably Truth";
  if (predNumber > 40 && predNumber < 60)
    predString = "Probably Lie / Maybe True";
  if (predNumber < 40) predString = "Mostly Lie";
  return predString;
};

const ShowPrediction = ({ isLoading, prediction }: Props) => {
  const predString = getPredictionString(Number(prediction));
  return (
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
        prediction && (
          <span>
            <span className="text-lg font-semibold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-cyan-300">
              {predString}
            </span>
            <br />
            Truth Probability is:{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-cyan-300">
              {prediction} %{" "}
            </span>
          </span>
        )
      )}
    </span>
  );
};
export default ShowPrediction;
