import { Tabs } from 'antd';
import React from 'react'
import type {TabsProps} from 'antd'

const Com_tabs:React.FC<TabsProps> = (props)=>{
    const onChange = (key: string) => {
        console.log(key);
    };
    const tabs_data:TabsProps = {
        defaultActiveKey:'1',
        tabPosition:'left',
        onChange:onChange,
        items:new Array(30).fill(null).map((_, i) => {
                const id = String(i);
                return {
                    label: `Tab-${id}`,
                    key: id,
                    disabled: i === 28,
                };
            }),
        ...props
    }
    let style = {}
    if(tabs_data.tabPosition==='left'||tabs_data.tabPosition==='right'){
        style={height:'100%'}
    }else if(tabs_data.tabPosition==='top'||tabs_data.tabPosition==='bottom'){
        style={width:'100%'}
    }
    return (
        <Tabs style={{...style}} {...tabs_data}/>
    )
}

export default Com_tabs
