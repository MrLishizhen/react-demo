import App from '@/App'
import Login from '@/views/login'
import Empty from '@/views/empty'
import {Navigate, useRoutes, useNavigate, useLocation} from 'react-router-dom'
import {createRef, useEffect, useRef, useState} from "react";
import React from 'react'
import {setMenu, removeTab, setRoutes} from '@/redux/menu'
import {useAppDispatch, useAppSelector} from '@/redux/hook'
import {getMenu} from "@/api";
import {message, ConfigProvider, theme} from "antd";
import {get_routers} from "@/router/route";
import _ from 'lodash'
import {setGlobalStyle} from "@/redux/global";

interface route {
    label?: string,
    key?: string,
    path?: string,
    element?: any,
    children?: route[],
    errorElement?: any,
    meta?: meta
}


const RouterView = () => {
    const [bs_number, set_bs_number] = useState(0)
    const dispatch = useAppDispatch()
    const menu: route[] = useAppSelector(state => state.menuSlice.menu_list)
    const {global_color} = useAppSelector(state => state.globalSlice.global)
    const location = useLocation()

    //修改网站title
    useEffect(() => {
        const route: route | undefined = menu.find((u) => '/' + u.key === location.pathname)
        if (route) {
            const {meta: meta} = route
            if (meta?.title) {
                document.title = meta?.title
            } else {
                document.title = 'admin'
            }
        } else {
            if (location.pathname === '/login') {
                document.title = '登陆'
            }
        }

    }, [location.pathname, menu])

    const routers = useRoutes([
            {
                path: '/',
                element: <Navigate to={'/welcome'}/>
            },
            {
                path: '/',
                element: <App/>,
                children: [
                    ...get_routers(_.cloneDeep(menu)),
                ]
            },
            {
                path: '/login',
                element: <Login/>,
            }, {
                path: '*',
                element: <Empty title={404}/>
            }
        ]
    )
    //判断是否登陆
    const navigate = useNavigate()
    useEffect(() => {
        if (location.pathname.indexOf('login') > -1) {
            dispatch(setGlobalStyle(true))
            dispatch(removeTab([]))
            dispatch(setMenu([]))
        }

        if (location.pathname.indexOf('login') === -1) {
            const local_user = sessionStorage.getItem('userInfo') || 0;
            if (!local_user) {
                message.success('登录失效，请重新登录');
                navigate('/login');
            }
        }
    }, [location.pathname])
    //判断是否已经有了导航数据
    const ref = useRef<string | null>(null)
    useEffect(() => {
        const list = async () => {
            if (!bs_number) {
                if (menu.length === 0 && location.pathname != '/login') {
                    const menus = await getMenu({userName: 'admin'});
                    if (menus.code === 200) {

                        dispatch(setMenu(menus.result))
                        dispatch(setRoutes(_.cloneDeep(menus.result.map((u: any) => {
                            return {
                                ...u,
                                nodeRef: ref
                            }
                        }))))
                    } else {
                        dispatch(setMenu([]))
                    }
                    set_bs_number(bs_number + 1)
                }
            }
        }
        list()
    }, [menu])


    return (
        <>
            {
                menu.length === 0 && location.pathname != '/login' ? '' : <ConfigProvider
                    theme={{algorithm: theme[global_color ? 'defaultAlgorithm' : 'darkAlgorithm']}}>{routers}</ConfigProvider>

            }
        </>
    )
}
export default RouterView

