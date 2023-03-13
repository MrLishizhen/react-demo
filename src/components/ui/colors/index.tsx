import {SketchPicker, Color, ColorResult, RGBColor} from 'react-color'
import styles from './index.module.less'
import React, {useState} from "react";

interface ColorType {
    onChange?: (color: ColorResult) => void,
    color: string
}

const Colors: React.FC<ColorType> = ({onChange, color}) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false)

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    }
    const handleClose = () => {
        setDisplayColorPicker(false);
    }
    const handleChange = (color: ColorResult) => {
        onChange && onChange(color)
    }
    return (
        <div style={{position: 'relative', marginRight: 16}}>
            <div className={styles.colors} style={{}} onClick={handleClick}>
                <div className={styles.color}
                     style={{backgroundColor: color}}/>
            </div>
            {
                displayColorPicker ? <div className={styles.popover}>
                    <div className={styles.cover} onClick={handleClose}/>
                    <SketchPicker color={color} onChange={(color:ColorResult) => handleChange(color)}/>
                </div> : null
            }
        </div>
    )
}
export default Colors
