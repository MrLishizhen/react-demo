/*
* 根据后台的icon 字段返回对应的antd Icon
* */

import React from 'react'
import {HomeOutlined,BarChartOutlined,LockOutlined,MenuFoldOutlined} from '@ant-design/icons';

interface IconFontType {
    icon_link?: string,
    style?:React.CSSProperties
}

const IconFont: (props: IconFontType) => (React.ReactElement) = (props:IconFontType)=> {
    const {icon_link,style} = props;
    const styles = {fontSize:16,color:'#fff',...style}
    switch (icon_link){
        case 'HomeOutlined':
            return <HomeOutlined style={styles}/>
        case 'BarChartOutlined':
            return <BarChartOutlined style={styles}/>
        case 'LockOutlined':
            return <LockOutlined style={styles}/>
        case 'MenuFoldOutlined':
            return <MenuFoldOutlined style={styles}/>
        default:
            return <></>
    }
}
export default IconFont
