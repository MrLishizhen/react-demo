import styles from './index.module.less'
import EchartsContainer from "@/components/ui/echarts";
import * as echarts from "echarts";

const Welcome = () => {
    const option:echarts.EChartsOption = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }
        ]
    }
    const echarts_click = (params: EventParams)=>{
        console.log(params)
    }
    return (
        <div className={styles.welcome}>
            <EchartsContainer events={[{type:'click',events:(params:EventParams)=>echarts_click(params)}]} echarts_option={option}/>
        </div>
    )
}

export default Welcome
