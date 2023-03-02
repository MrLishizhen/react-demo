import React, {Suspense} from 'react'
import styles from './index.module.less'
import {useLocation, useOutlet} from 'react-router-dom'
import MenuCom from "@/components/menu";
import Header from "@/components/headers";
import TabsCom from '@/components/tabs'
import Loading from "@/components/loading";
import WaterMarkBox from '@/components/watermark/index'
import {SwitchTransition, CSSTransition} from 'react-transition-group'
import {useAppSelector} from '@/redux/hook'
import _ from "lodash";


function App() {
    const location = useLocation();
    const routes = _.cloneDeep(useAppSelector(state => state.menuSlice.routes))
    const {nodeRef} = routes.find((route: any) => '/' + route.key === location.pathname) ?? {};
    const currentOutlet = useOutlet()
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
                        <WaterMarkBox>
                            <Suspense fallback={<Loading/>}>
                                <SwitchTransition>
                                    <CSSTransition
                                        key={location.pathname}
                                        timeout={360}
                                        nodeRef={nodeRef}
                                        classNames={'page'}
                                        unmountOnExit>
                                        {(state) => {
                                            return (
                                                <div ref={nodeRef} className={'page'}>

                                                    {currentOutlet}
                                                    {/*{<Outlet></Outlet>}*/}
                                                </div>
                                            )
                                        }}
                                    </CSSTransition>
                                </SwitchTransition>
                            </Suspense>
                        </WaterMarkBox>
                    </section>
                </section>
            </section>
        </section>
    )
}

export default App
