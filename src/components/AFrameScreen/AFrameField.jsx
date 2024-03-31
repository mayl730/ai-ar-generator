import React, { useContext, useEffect, useRef } from "react";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";
import { FileContext } from "../../Contex/FileContext";

export const AFrameField = () => {
  const { cardImage, mindFile } = useContext(FileContext);
  const sceneRef = useRef(null);

  console.log("cardimage", cardImage);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    const arSystem = sceneEl.systems["mindar-image-system"];
    sceneEl.addEventListener("renderstart", () => {
      arSystem.start(); // start AR
    });
    return () => {
      arSystem.stop();
    };
  }, []);

  return (
    <a-scene
      ref={sceneRef}
      mindar-image={`imageTargetSrc:${mindFile}; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;`}
      color-space="sRGB"
      embedded
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        <img id="card" src={cardImage} alt="card" />
        <a-asset-item
          id="avatarModel"
          src="https://hackathon-nana-2024.s3.ap-northeast-1.amazonaws.com/cartoon_dog.obj"
        ></a-asset-item>
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      <a-entity mindar-image-target="targetIndex: 0">
        <a-obj-model
          material="vertexColorsEnabled:true;"
          rotation="0 0 0 "
          position="0 0 1"
          scale="0.50 0.500 0.50"
          src="#avatarModel"
          animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
        ></a-obj-model>
      </a-entity>
    </a-scene>
  );
};
