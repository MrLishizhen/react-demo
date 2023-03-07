import * as echarts from 'echarts';
import {useRef} from "react";
import useParent from "@/hooks/useParent";

const EchartsContainer = () => {
    const echarts_ref = useRef<HTMLDivElement>(null)
    const [width,height] = useParent(echarts_ref)
    console.log(width,height)
    return (
        <div ref={echarts_ref} style={{width:width,height:height}}></div>
    )
}

export default EchartsContainer
