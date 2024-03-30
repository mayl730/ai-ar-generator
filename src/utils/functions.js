import axios from "axios";

export async function generateImageSelectedFile(file, style) {
  console.log("generateImageSelectedFile: running");

  const prompts = {
    cartoon:
      "cartoon style, white background, without words, no shadow, 3d render stylized, toon render keyshot, animation style rendering",
    cyberpunk:
      "made of metal, cyborg, cyberpunk style, hdr, isolate in white background",
  };

  const engineId = "stable-diffusion-xl-1024-v1-0";
  const apiHost = "https://api.stability.ai";
  const apiKey = process.env.REACT_APP_API_KEY;
  console.log(apiKey);

  if (!apiKey) throw new Error("Missing Stability API key.");

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
      responseJSON.artifacts.forEach((imageResponse, index) => {
        console.log(imageResponse); //base64
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}