import React, { useContext } from "react";
import { FileContext } from "../../Contex/FileContext";

const ResultScreen = () => {
  const { imageResponse } = useContext(FileContext);

  return (
    <div>
      <h1>Result Screen</h1>
      {imageResponse && imageResponse.base64 && (
        <img
          src={`data:image/jpeg;base64,${imageResponse.base64}`}
          alt="Generated"
        />
      )}
    </div>
  );
};

export default ResultScreen;
