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
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }
        ]
    };

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
