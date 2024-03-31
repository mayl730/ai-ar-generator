import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { FileContext } from "../../Contex/FileContext";
import { useNavigate } from "react-router-dom";

const Input = styled("input")({
  display: "none",
});

const MindScreen = () => {
  const { setUploadedCardImage, cardImage, setGeneratedMindFile } =
    useContext(FileContext);
  const [uploadStatus, setUploadStatus] = useState("");
  const navigation = useNavigate();

  const handleFileChange = (event) => {
    setUploadedCardImage(event.target.files[0]);
    setUploadStatus(""); // Reset upload status message on new file selection
  };

  const handleUploadClick = async () => {
    if (!cardImage) {
      setUploadStatus("No file selected.");
      return;
    }

    // prepare form data to be sent to BE

    // navigate to AR screen, you have to set once BE resonse is succeeded
    // navigation("/aframe", {
    //   state: { cardImage },
    // });

    // return;

    try {
      setUploadStatus("Uploading...");
      const response = await fetch(
        "https://0ebd-152-165-122-193.ngrok-free.app/create-mind-file",
        {
          // Insert Url here
          method: "POST",
          body: cardImage,
          header: {
            "Content-Type": "image/jpeg",
          },
        }
      );
      if (response.ok) {
        // const reader = response.body.getReader()c
        const blob = await response.blob();
        const newBlob = new Blob([blob]);
        const blobUrl = window.URL.createObjectURL(newBlob);

        setUploadStatus("Upload successful!");

        setGeneratedMindFile(blobUrl);

        // console.log(result);

        navigation("/aframe", {
          state: { cardImage },
        });
      } else {
        setUploadStatus("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading the file:", error);
      setUploadStatus("Upload failed. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Upload an Image
      </Typography>
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
      {cardImage && <Typography>File selected: {cardImage.name}</Typography>}
      <div style={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          component="span"
          onClick={handleUploadClick}
        >
          Upload
        </Button>
      </div>
      {uploadStatus && <Typography>{uploadStatus}</Typography>}
    </div>
  );
};

export default MindScreen;
