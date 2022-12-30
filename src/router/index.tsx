import App from '@/App'
import Login from '@/views/login'
import Empty from '@/views/empty'
import {Navigate, useRoutes, RouterProvider, createBrowserRouter} from 'react-router-dom'
import {useEffect, useState} from "react";
import {ConfigProvider} from 'antd';
import React from 'react'
import {selectMenuList, setMenu} from '@/redux/menu'
import {useAppDispatch, useAppSelector} from '@/redux/hook'
import {getMenu} from "@/api";
import {deepClone, time} from '@/util/functions'
import zhCN from "antd/locale/zh_CN";

interface route {
    label?: string,
    key?: string,
    path?: string,
    element?: any,
    children?: route[],
    errorElement?: any
}

const modules = import.meta.glob('@/views/*/*');
const comModules = import.meta.glob('@/views/component/*/*')
const Model = (link: any, menu: route[]) => {
    let Com = null;
    const URL = '/src/views/' + link + '/index.tsx'
    Com = React.lazy(modules[`${URL}`] as any)
    return (
        <>
            {
                Com ? <Com></Com> : ''
            }
        </>
    )
}
const comModel = (link: any, menu: route[]) => {
    let Com = null;
    const URL = '/src/views/' + link + '/index.tsx'
    Com = React.lazy(comModules[`${URL}`] as any)
    return (
        <>
            {
                Com ? <Com></Com> : ''
            }
        </>
    )
}


const RouterView = () => {
    const [bs_number, setBs] = useState(0)
    const dispatch = useAppDispatch()
    const menu: route[] = useAppSelector(state => state.menuSlice.menu_list.filter(u => u.key))
    const routers = useRoutes([
        {
            path: '/',
            element: <Navigate to={'/welcome'}/>
        },
        {
            path: '/',
            element: <App/>,
            children: [
                ...menu.map((u: route) => {
                    return {
                        path: u.key,
                        element: u.key && u.key.indexOf('/') === -1 ? Model(u.key, menu) : comModel(u.key, menu)
                    }
                }),
                {
                    path: '*',
                    element: <Empty/>
                }
            ]
        },
        {
            path: '/login',
            element: <Login/>,
        }]
    )
    useEffect(() => {
        const list = async () => {
            if (bs_number === 1) {
                // dispatch(setMenu([]))
            } else {
                if (menu.length === 0 && location.pathname != '/login') {
                    const menus = await getMenu({userName: 'admin'});
                    if (menus.code === 200) {
                        dispatch(setMenu(menus.result))
                    } else {
                        dispatch(setMenu([]))
                    }

                    setBs(bs_number + 1)
                }
            }

        }
        list()
    }, [menu])

    return (
        <ConfigProvider locale={zhCN}>
            {
                menu.length === 0 && location.pathname != '/login' ? <App/> : routers

            }
        </ConfigProvider>
    )
}
export default RouterView

