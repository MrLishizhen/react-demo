import styles from './index.module.less'
import EchartsContainer from "@/components/ui/echarts";

const Welcome = () => {
    return (
        <div className={styles.welcome}>
            <EchartsContainer/>
        </div>
    )
}

export default Welcome
