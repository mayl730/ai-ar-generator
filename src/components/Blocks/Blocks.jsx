import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import "./Blocks.css";
import Block from "./Block";
import { Button } from "@mui/material";
import { Application } from "@splinetool/runtime";
// import Webcam from 'react-webcam';  *** Import of webcam
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Link } from "react-router-dom";
import { FileContext } from "../../Contex/FileContext";

const Blocks = () => {
  const { setUploadedFile } = useContext(FileContext);
  const canvasElement = useRef(null);
  // const webcamRef = useRef(null)    **** Here is REF of webCamera element
  const [cameraOpened, setCameraOpened] = useState(false);
  const [takedImage, setTakedImage] = useState(null);
  const [fileState, setFileState] = useState(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setFileState(file);
    setUploadedFile(file);
  };

  useEffect(() => {
    const canvas = canvasElement.current;
    const app = new Application(canvas);
    app.load("https://prod.spline.design/qLSRi2-xXMMGXdrE/scene.splinecode");
    return () => {};
  }, []);

  //****   Function to take photo by webcamera on laptop or PC

  // const takePhoto = useCallback(() => {
  //     const imageSrc = webcamRef.current.getScreenshot()
  //     const blob = base64StringToBlob(imageSrc);
  //     const file = new File([blob], 'webcam_capture.png', { type: 'image/png' });
  //     setTakedImage(imageSrc)
  //     setUploadedFile(file)
  //     setCameraOpened(false)
  // }, [webcamRef])

  // **** This Function convert our webcamera photo do base64 format to can be reading as file
  // const base64StringToBlob = (base64String) => {
  //     const byteCharacters = atob(base64String.split(',')[1]);
  //     const byteNumbers = new Array(byteCharacters.length);
  //     for (let i = 0; i < byteCharacters.length; i++) {
  //       byteNumbers[i] = byteCharacters.charCodeAt(i);
  //     }
  //     const byteArray = new Uint8Array(byteNumbers);
  //     return new Blob([byteArray], { type: 'image/png' });
  //   };

  return (
    <div className="blocks">
      <Block>
        <canvas ref={canvasElement}></canvas>
      </Block>

      <Block>
        {/* Here it's showing buttons with dependies of state */}
        {/* <Button variant="contained" className='custom-button'  onClick={() => {setCameraOpened(!cameraOpened)}}>{!cameraOpened ? <span><CameraAltIcon/>Open Camera</span> : <span>Close Camera</span> }</Button>
                {cameraOpened ?  (
                    <>
                <Webcam imageSmoothing={true} screenshotFormat="image/jpeg" mirrored={true} ref={webcamRef}/>
                <Button variant='contained' onClick={takePhoto} >Take Photo</Button>
                
                    </>
                ) : null}
                {takedImage !== null ?  <img src={takedImage}></img> : null} */}
        <Button onClick={handleButtonClick}>
          {fileState === null ? (
            <span>
              <CameraAltIcon /> Take or Upload Photo
            </span>
          ) : (
            <span>{fileState.name}</span>
          )}
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/png, image/jpeg"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        ></input>
        {takedImage || fileState ? (
          <Link to="/styles">
            <Button>Generate</Button>
          </Link>
        ) : null}
      </Block>
    </div>
  );
};

export default Blocks;
