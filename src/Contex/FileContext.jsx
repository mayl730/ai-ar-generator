import React, { createContext, useState } from "react";

const FileContext = createContext();

const FileProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  const [imageResponse, setImageResponse] = useState(null);

  const setUploadedFile = (newFile) => {
    setFile(newFile);
  };

  const setImageResponseData = (newImageData) => {
    setImageResponse(newImageData);
  };

  return (
    <FileContext.Provider
      value={{
        file,
        setUploadedFile,
        imageResponse,
        setImageResponseData,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export { FileContext, FileProvider };
