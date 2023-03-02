import React from 'react';
import {Watermark} from 'antd';
interface font_type{
    color:string,
    fontSize:number,
    fontWeight:"normal" | "light" | "weight" | number,
    fontFamily:string,
    fontStyle:"none" | "normal" | "italic" | "oblique"
}
interface style_type {
    width: number,
    height: number,
    image: string,
    content: string | string[],
    rotate: number,
    zIndex: number,
    font: font_type,
    gap: [number, number],
    offset: [number, number]
}

const WaterMarkBox: React.FC<{ children: any, watermark_style?: style_type }> = ({children, watermark_style}) => {
    // const {children} = props;
    // const watermark = getStyle(watermark_style);
    return (
        <Watermark width={60} height={40} image={''} zIndex={99999} rotate={-45} content={'秋雨'}>
            {
                children
            }
        </Watermark>
    )
}

export default WaterMarkBox
