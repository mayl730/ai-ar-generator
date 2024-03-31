import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../firebase";
import { v4 } from "uuid";

export async function generateImageSelectedFile(file, style, setImageURL) {
  console.log("generateImageSelectedFile: running");

  const prompts = {
    Cartoon:
      "cartoon style, white background, without words, no shadow, 3d render stylized, toon render keyshot, animation style rendering",
    Toy: "3d felted, round, isolated on white color background",
    Pixar:
      "3D design by Mark Clairedon and Pixar and Hayao Miyazaki and Akira Toriyama, the illustration is a high-definition illustration in 4K resolution with cartoon-style visuals, isolated on white background",
    Cyberpunk:
      "made of metal, cyborg, cyberpunk style, hdr, isolate in white background",
    Realistic: "vector, realistic, fantasy, isolate in white background",
  };

  const engineId = "stable-diffusion-xl-1024-v1-0";
  const apiHost = "https://api.stability.ai";
  const apiKey = process.env.REACT_APP_API_KEY;

  if (!apiKey) throw new Error("Missing Stability API key.");
  if (!prompts.hasOwnProperty(style)) throw new Error("Invalid style");

  const formData = new FormData();
  formData.append("init_image", file);
  formData.append("text_prompts[0][text]", prompts[style]);
  //   formData.append("init_image_mode", "IMAGE_STRENGTH");
  //   formData.append("image_strength", 0.35);
  //   formData.append("cfg_scale", 7);
  //   formData.append("samples", 1);
  //   formData.append("steps", 30);

  axios
    .post(`${apiHost}/v1/generation/${engineId}/image-to-image`, formData, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "multipart/form-data",
      },
      responseType: "json",
    })
    .then((response) => {
      if (!response.status === 200) {
        throw new Error(`Non-200 response: ${response.statusText}`);
      }
      return response.data;
    })
    .then((responseJSON) => {
      responseJSON.artifacts.forEach((imageResponse) => {
        console.log(imageResponse); //base64
        // setImageResponseData(imageResponse);
        uploadImage(imageResponse.base64, style, setImageURL);
        // return imageResponse.base64;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const base64StringToBlob = (
  base64,
  contentType = "image/jpeg",
  sliceSize = 1024
) => {
  // Remove the Data URI prefix if it exists
  const base64Data = base64.replace(/^data:image\/[a-z]+;base64,/, "");

  // Ensure the Base64 string is properly encoded
  if (base64Data.length % 4 !== 0) {
    console.error("Base64 string is not properly encoded.");
    throw new Error("Base64 string is not properly encoded.");
  }

  // Decode the Base64 string
  const byteCharacters = atob(base64Data);

  // Continue with converting to Blob as before
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};

export async function uploadImage(base64Image, style, setImageURL) {
  // Assumes base64Image is the Base64 image string
  const blob = base64StringToBlob(base64Image);

  // Create a unique file name for the upload
  const fileName = `${style}/${v4()}.jpg`; // Customize as needed
  const imageRef = ref(storage, fileName);

  try {
    const snapshot = await uploadBytes(imageRef, blob);
    const url = await getDownloadURL(snapshot.ref);
    setImageURL(url); // Use the context method to update the URL in your state
    console.log("File available at", url);
    return url; // Optionally return the URL
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw error;
  }
}
