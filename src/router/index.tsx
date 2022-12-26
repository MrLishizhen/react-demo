import App from '@/App'
import Login from '@/views/login'
import Empty from '@/views/empty'
import Loading from '../../public/loading.gif'
import {Navigate, useRoutes, RouterProvider, createBrowserRouter} from 'react-router-dom'
import {useEffect, useState} from "react";
import React from 'react'
import {selectMenuList, setMenu} from '@/redux/menu'
import {useAppDispatch, useAppSelector} from '@/redux/hook'
import {getMenu} from "@/api";
import {time} from '@/util/functions'

interface route {
    label?: string,
    key?: string,
    path?: string,
    element?: any,
    children?: route[],
    errorElement?: any
}

const modules = import.meta.glob('@/views/*/*');
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


const RouterView = () => {
    const [bs_number, setBs] = useState(0)
    const dispatch = useAppDispatch()
    const menu: route[] = useAppSelector(state => state.menuSlice.menu_list)
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
                        element: Model(u.key, menu)
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
        <>
            {
                menu.length === 0 && location.pathname != '/login' ? <App/> : routers

            }
        </>
    )
}
export default RouterView

