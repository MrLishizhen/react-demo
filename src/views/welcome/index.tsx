import styles from './index.module.less'
import EchartsContainer from "@/components/ui/echarts";
import * as echarts from "echarts";
import {ECElementEvent} from "echarts/types/dist/echarts";

const Welcome = () => {
    const option: echarts.EChartsOption = {
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
    const echarts_click = (params: ECElementEvent) => {
        console.log(params)
    }

    return (
        <div className={styles.welcome}>
            <div className={styles.welcome_top}>
                <EchartsContainer events={[{type: 'click', events: echarts_click}]} echarts_option={option}/>
            </div>
            <div className={styles.welcome_cent}>
                <div className={styles.welcome_cent_left}>
                    <EchartsContainer events={[{type: 'click', events: echarts_click}]} echarts_option={option}/>
                </div>
                <div className={styles.welcome_cent_right}>
                    <EchartsContainer events={[{type: 'click', events: echarts_click}]} echarts_option={option}/>
                </div>
            </div>
        </div>
    )
}

export default Welcome
