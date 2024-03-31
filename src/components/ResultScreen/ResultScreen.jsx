import React, { useContext } from "react";
import { FileContext } from "../../Contex/FileContext";

const ResultScreen = () => {
  const { imageURL } = useContext(FileContext);

  return (
    <div>
      <h1>Result Screen</h1>
      <img src={`${imageURL}`} alt="Generated" />
    </div>
  );
};

export default ResultScreen;
