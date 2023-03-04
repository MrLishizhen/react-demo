import React from 'react';
import {Watermark,WatermarkProps} from 'antd';

const WaterMarkBox: React.FC<WatermarkProps> = (props) => {
    const {children,...rest} = props;
    const watermark_data = {width:60,height:40,zIndex:9,rotate:-45,content:'秋雨',...rest}
    return (
        <Watermark {...watermark_data}>
            {
                children
            }
        </Watermark>
    )
}

export default WaterMarkBox
