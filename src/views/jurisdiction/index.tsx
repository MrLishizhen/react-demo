import styles from './index.module.css'
import {Outlet} from 'react-router-dom'

const Jurisdiction = () => {
    return (
        <div className={styles.jurisdiction}>
            {
                <Outlet/>
            }
        </div>
    )
}
export default Jurisdiction
