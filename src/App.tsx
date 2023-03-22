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
import {Layout, theme} from 'antd'

const {Content} = Layout;

function App() {
    const {
        token: {colorTextBase},
    } = theme.useToken();
    const location = useLocation();
    const routes = _.cloneDeep(useAppSelector(state => state.menuSlice.routes))
    const {nodeRef, layout} = routes.find((route: any) => '/' + route.key === location.pathname) ?? {};
    const currentOutlet = useOutlet()
    const create_layout = (type: string | undefined) => {
        if (type === 'App'||!type) {
            return <>
                <MenuCom/>
                <Layout className={styles.App_main}>
                    <nav className={styles.App_nav}>
                        <TabsCom/>
                    </nav>
                    <Content className={styles.App_outlet}>
                        <WaterMarkBox content={''}>
                            {
                                children()
                            }
                        </WaterMarkBox>
                    </Content>
                </Layout>
            </>
        } else if (type !== undefined) {
            return <Content className={styles.App_outlet}>
                <WaterMarkBox content={''}>
                    {
                        children()
                    }
                </WaterMarkBox>
            </Content>
        }
    }


    const children = () => {
        return (
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
                                <div style={{color: colorTextBase}} ref={nodeRef} className={'page'}>

                                    {currentOutlet}
                                    {/*{<Outlet></Outlet>}*/}
                                </div>
                            )
                        }}
                    </CSSTransition>
                </SwitchTransition>
            </Suspense>
        )
    }

    return (
        <Layout className={styles.App}>
            <Header/>
            <Layout className={styles.App_bom}>
                {
                    create_layout(layout)
                }
            </Layout>
        </Layout>
    )
}

export default App
