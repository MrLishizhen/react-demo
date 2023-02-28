import React, {Suspense} from 'react'
import styles from './index.module.less'
import {Outlet} from 'react-router-dom'
import MenuCom from "@/components/menu";
import Header from "@/components/headers";
import TabsCom from '@/components/tabs'
function App() {

    return (
        <section className={styles.App}>
            <Header/>
            <section className={styles.App_bom}>
                <MenuCom></MenuCom>
                <section className={styles.App_main}>
                    <nav className={styles.App_nav}>
                        <TabsCom></TabsCom>
                    </nav>
                    <section className={styles.App_outlet}>
                        <Suspense fallback={<div className={styles.loading}></div>}>
                            <Outlet></Outlet>
                        </Suspense>
                    </section>
                </section>
            </section>
        </section>
    )
}

export default App
