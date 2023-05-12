import { ColorRing } from "react-loader-spinner";

interface Props {
  isLoading: boolean;
  prediction: string;
}
const ShowPrediction = ({ isLoading, prediction }: Props) => {
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
        prediction && `Prediction is: ${prediction}`
      )}
    </span>
  );
};
export default ShowPrediction;
