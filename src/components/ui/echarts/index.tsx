import * as echarts from 'echarts';
import {useEffect, useRef} from "react";
import useParent from "@/hooks/useParent";

type EChartsOption = echarts.EChartsOption;

interface EchartsEvents {
    type: string,
    events: (params: EventParams) => boolean|void
}

interface EchartsContainer {
    echarts_option: EChartsOption,
    events: EchartsEvents[]
}

const EchartsContainer = (props: EchartsContainer) => {

    const {echarts_option, events} = props;


    const echarts_ref = useRef<HTMLDivElement>(null)
    const [width = 600, height = 400] = useParent(echarts_ref)
    const myChart = useRef<echarts.ECharts | null>(null)

    useEffect(() => {
        if (echarts_ref.current) {
            if (!myChart.current) {
                myChart.current = echarts.init(echarts_ref.current);
            }
            const option = {...echarts_option};
            myChart.current.setOption(option, true)

            if (Array.isArray(events) && events.length > 0) {
                for (let i = 0; i < events.length; i++) {
                    myChart.current.on(events[i].type,function(params){
                        events[i].events&&events[i].events(params)
                    });
                }
            }
        }
    }, [])
    useEffect(() => {
        myChart.current?.resize({
            width,
            height
        })
    }, [width, height])
    return (
        <div ref={echarts_ref} style={{width: width ? width : 600, height: height ? height : 400}}/>
    )
}

export default EchartsContainer
