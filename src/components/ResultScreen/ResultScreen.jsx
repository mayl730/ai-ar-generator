import React, { useContext } from "react";
import { FileContext } from "../../Contex/FileContext";
import loader from '../../style_images/loader.gif'

const ResultScreen = () => {
  const { imageResponse } = useContext(FileContext);

  return (
    <div>
      {
        imageResponse === null ? <img src={loader} style={{width: '50px', height: '50px'}}/> :
        <>
        {imageResponse && imageResponse.base64 && (
          <img
          src={`data:image/jpeg;base64,${imageResponse.base64}`}
          alt="Generated"
          />
          )}
          </>
      }
      
    </div>
  );
};

export default ResultScreen;
