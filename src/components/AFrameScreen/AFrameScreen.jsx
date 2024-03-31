import React, { useState } from "react";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";
import { Button } from "@mui/material";
import { AFrameField } from "./AFrameField";

import "./aframe-screen.css";

export const AFrameScreen = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="aframe-screen">
      {open && (
        <div className="container">
          <AFrameField />
        </div>
      )}
      <Button
        sx={{
          width: "200px",
          height: "40px",
        }}
        onClick={() => setOpen(true)}
      >
        Open AR field
      </Button>
    </div>
  );
};
