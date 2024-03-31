import React, { useContext, useState, useEffect } from "react";
import { FileContext } from "../../Contex/FileContext";
import { Link } from "react-router-dom";
import Block from "../Blocks/Block";
import "./StylesScreen.css";
import { Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import backEnd from "../../style_images/backEnd.js";
import axios from "axios";

import { generateImageSelectedFile } from "../../utils/functions.js";

const StylesScreen = () => {
  const [value, setValue] = useState(null);

  const [imgObject, setImageObject] = useState(null)

  const { file, setUploadedFile, setImageResponseData } =
    useContext(FileContext);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  console.log(file, 'Here is a File');

  const generatePhoto = async () => {
    try {
      //   await generateImageSelectedFile(file, value);
      await generateImageSelectedFile(file, value, setImageResponseData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {

    const formData = new FormData();
    formData.append('image', file);

    const madeRequest = () => {
        axios.post('http://192.168.2.10:8000/crop_resize_image/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            responseType: 'arraybuffer' 
          })
      .then(function (response) {
        console.log(response.data); 
        const blob = new Blob([response.data], { type: 'image/png' });
      // Создаем URL объекта Blob
      const imgUrl = URL.createObjectURL(blob);
      console.log(imgUrl);
        setImageObject(imgUrl)
      })
      .catch(function (error) {
        console.log(error); 
      });
        }
    
        madeRequest()
},[])

  return (
    <div className="styles-screen">
      <h2>Choose style</h2>
      {/*  here is File <img src={URL.createObjectURL(file)} style={{width: '300px', height: '300px'}}/> */}
      
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="photo"
            name="photo"
            value={value}
            onChange={handleChange}
          >
            <div className="list-styles">
            {backEnd.map((item, index) => (
              <Block key={index}>
                <img src={item.link} alt={item.name} />
                <div className="radio-selector">
                  <FormControlLabel
                    key={index}
                    value={item.name}
                    control={<Radio sx={{ color: "white" }} />} // Change color to primary color
                    label={item.name}
                  ></FormControlLabel>
                </div>
              </Block>
            ))}
            </div>
          </RadioGroup>
        </FormControl>
      
      <Link to="/result">
        <Button onClick={generatePhoto}>Choose style & generate</Button>
      </Link>
    </div>
  );
};

export default StylesScreen;
