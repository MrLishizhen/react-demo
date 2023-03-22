import React from 'react';
import styles from './index.module.less'

import {Outlet} from "react-router-dom";

const article = ()=>{

    return (
        <div className={styles.article}>
            <Outlet/>
        </div>
    )
}
export default article
