import React from "react";
import "./Main.css";
import Blocks from "../Blocks/Blocks";
import { Route, Routes } from "react-router-dom";
import StylesScreen from "../StylesScreen/StylesScreen";
import ResultScreen from "../ResultScreen/ResultScreen";
import { FileProvider } from "../../Contex/FileContext";
import MindScreen from "../MindScreen/MindScreen";
import { AFrameScreen } from "../AFrameScreen/AFrameScreen";

const Main = () => {
  return (
    <div className="main">
      <FileProvider>
        <Routes>
          <Route path="/" element={<Blocks />} />
          <Route path="/styles" element={<StylesScreen />} />
          <Route path="/result" element={<ResultScreen />} />
          <Route path="/mind" element={<MindScreen />} />
          <Route path="/aframe" element={<AFrameScreen />} />
        </Routes>
      </FileProvider>
    </div>
  );
};

export default Main;
