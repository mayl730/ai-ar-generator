import React, { createContext, useState } from "react";

const FileContext = createContext();

const FileProvider = ({ children }) => {
  const [file, setFile] = useState(null);

  // Hard coded for testing - store card file for AR prompt
  const [cardImage, setCardImage] = useState(
    "https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/card.png"
  );

  // Hard coded for testing - store AR mind file for image targeting
  const [mindFile, setMindFile] = useState("./bath.mind");

  const setUploadedFile = (newFile) => {
    setFile(newFile);
  };

  const setUploadedCardImage = (newUploadedImage) => {
    setCardImage(newUploadedImage);
  };

  const setGeneratedMindFile = (newMindFile) => {
    setMindFile(newMindFile);
  };

  return (
    <FileContext.Provider
      value={{
        file,
        setUploadedFile,
        cardImage,
        setUploadedCardImage,
        mindFile,
        setGeneratedMindFile,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export { FileContext, FileProvider };
