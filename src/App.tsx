import React, {useEffect, useState,Suspense} from 'react'
import styles from './index.module.less'
import {Outlet, useNavigate} from 'react-router-dom'
import MenuCom from "@/components/menu";
import Header from "@/components/headers";
import TabsCom from '@/components/tabs'
import {message} from 'antd'
function App() {
    const navigate = useNavigate()
    useEffect(() => {
        if (location.pathname.indexOf('login') === -1) {
            const local_user = sessionStorage.getItem('userInfo') || 0;
            if (!local_user) {
                message.success('登录失效，请重新登录');
                navigate('/login');
            }
        }
    }, [])
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
                        <Suspense fallback={<div></div>}>
                            <Outlet></Outlet>
                        </Suspense>
                    </section>
                </section>
            </section>
        </section>
    )
}

export default App
