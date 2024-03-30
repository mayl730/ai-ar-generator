import React, {useContext, useState} from 'react'
import { FileContext } from '../../Contex/FileContext'
import Block from '../Blocks/Block'
import './StylesScreen.css'
import { Button } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';





const linkPhoto = [
    {
        name: 'Cartoon',
        link: 'src/style_images/cartoon.png'
    },
    {
        name: 'Cyberpunk',
        link: 'src/style_images/cyberpunk.png'
    },
    {
        name: 'Pixar',
        link: 'src/style_images/pixar.png'
    },
    {
        name: 'Realistic',
        link: 'src/style_images/realistic.png'
    },
    {
        name: 'Toy',
        link: 'src/style_images/toy.png'
    }
]


const StylesScreen = () => {
    const [value, setValue] = useState(null)

    const {file} = useContext(FileContext)

    const handleChange = (event) => {
        setValue(event.target.value);
      };

    console.log(file);
    return (
        <div className='styles-screen'>
            <h2>Choose style</h2>
           {/* Hello here is File <img src={URL.createObjectURL(file)} style={{width: '300px', height: '300px'}}/> */}
           <div className='list-styles'>
           {linkPhoto.map((item, index) => (
               <Block  key={index}>
                <img src={item.link} alt={item.name}/>
                <div className='radio-selector'>
                <FormControlLabel value={value} control={<Radio />} label={item.name} onChange={handleChange}/>
                </div>
            </Block>
           ))}
           </div>
           <Button>Choose style</Button>
        </div>
    )
}


export default StylesScreen