import React, { useContext, useState } from "react";
import { FileContext } from "../../Contex/FileContext";
import { Link } from "react-router-dom";

import Block from "../Blocks/Block";
import "./StylesScreen.css";
import { Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";

import cartoonImage from "../../style_images/cartoon.png";
import cyberpunkImage from "../../style_images/cyberpunk.png";
import pixarImage from "../../style_images/pixar.png";
import toyImage from "../../style_images/toy.png";
import realisticImage from "../../style_images/realistic.png";

import { generateImageSelectedFile } from "../../utils/functions.js";

const linkPhoto = [
  {
    name: "Cartoon",
    link: cartoonImage,
  },
  {
    name: "Cyberpunk",
    link: cyberpunkImage,
  },
  {
    name: "Pixar",
    link: pixarImage,
  },
  {
    name: "Realistic",
    link: realisticImage,
  },
  {
    name: "Toy",
    link: toyImage,
  },
];

const StylesScreen = () => {
  const [value, setValue] = useState(null);

  const { file } = useContext(FileContext);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  console.log(file);

  const generatePhoto = async () => {
    try {
      await generateImageSelectedFile(file, value);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="styles-screen">
      <h2>Choose style</h2>
      {/* Hello here is File <img src={URL.createObjectURL(file)} style={{width: '300px', height: '300px'}}/> */}
      <div className="list-styles">
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="photo"
            name="photo"
            value={value}
            onChange={handleChange}
          >
            {linkPhoto.map((item, index) => (
              <Block key={index}>
                <img src={item.link} alt={item.name} />
                <div className="radio-selector">
                  <FormControlLabel
                    key={index}
                    value={item.name}
                    control={<Radio sx={{ color: "white" }} />} // Change color to primary color
                    label={item.name}
                  />
                </div>
              </Block>
            ))}
          </RadioGroup>
        </FormControl>
      </div>
      <Link to="/result">
        <Button onClick={generatePhoto}>Choose style & generate</Button>
      </Link>
    </div>
  );
};

export default StylesScreen;
