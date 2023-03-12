/*
* 不要将父级的宽高设置为固定的px值。
* 实现功能：自适应父级组件宽度
*         全局resize事件
*         暴露echarts对象
*         暴露option对象，暴露echarts.on方法传递回调参数
*
* 参数
* echarts_option: echarts option参数
* events?: 以数组的形式传递需要绑定的事件，格式为：[{type:'click',events:function(params)}]
*           events:会传递params的回调参数
*
* ref: 可以通过父组件传递ref的方式 获取组件中的echarts init后的对象
*
* ---李秋雨
* 创建时间：2023年3月9日11:10:30
* */
import * as echarts from 'echarts';
import {useEffect, useRef, useImperativeHandle, forwardRef} from "react";
import {ECElementEvent} from "echarts/types/dist/echarts";

type EChartsOption = echarts.EChartsOption;

interface EchartsEvents {
    type: string,
    events: (params: ECElementEvent) => void
}

interface EchartsContainer {
    echarts_option: EChartsOption,
    events?: EchartsEvents[],
}


const EchartsContainer = forwardRef((props: EchartsContainer, ref) => {

    const {echarts_option, events} = props;
    const echarts_ref = useRef<HTMLDivElement>(null)
    const myChart = useRef<echarts.ECharts | null>(null)
    //
    const init = () => {
        if (echarts_ref.current) {
            echarts.dispose(echarts_ref.current);
            myChart.current = echarts.init(echarts_ref.current);
            const option = {...echarts_option};
            myChart.current.setOption(option)
            if (Array.isArray(events) && events.length > 0) {
                for (let i = 0; i < events.length; i++) {
                    myChart.current && myChart.current.on(events[i].type, function (params) {
                        return events[i].events && events[i].events(params as ECElementEvent);
                    });
                }
            }
        }
    }
    const resizeAll = () => {
        myChart.current && myChart.current.resize()
    }
    useEffect(() => {
        window.addEventListener('resize', resizeAll, false)
        init();
        return () => {
            window.removeEventListener('resize', resizeAll, false)
        }
    }, [])

    useImperativeHandle(ref, () => {
        return myChart.current
    }, [myChart.current])
    return (
        <div ref={echarts_ref} style={{width: '100%', height: '100%'}}/>
    )
})

export default EchartsContainer
