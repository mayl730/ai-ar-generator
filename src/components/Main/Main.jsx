import React from "react";
import "./Main.css";
import Blocks from "../Blocks/Blocks";
import { Route, Routes } from "react-router-dom";
import StylesScreen from "../StylesScreen/StylesScreen";
import ResultScreen from "../ResultScreen/ResultScreen";
import { FileProvider } from "../../Contex/FileContext";

const Main = () => {
  return (
    <div className="main">
      <FileProvider>
        <Routes>
          <Route path="/" element={<Blocks />} />
          <Route path="/styles" element={<StylesScreen />} />
          <Route path="/result" element={<ResultScreen />} />
        </Routes>
      </FileProvider>
    </div>
  );
};

export default Main;
