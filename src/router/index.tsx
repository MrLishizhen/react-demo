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
import {removeRouterLoading, shouRouterLoading, time} from '@/util/functions'

interface route {
    label?: string,
    key?: string,
    path?: string,
    element?: any,
    children?: route[],
    errorElement?: any
}


const modules = import.meta.glob('@/views/*/*');
const Model = (link: any) => {
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

    const dispatch = useAppDispatch()
    const menu = useAppSelector(selectMenuList)
    const [routes, setRoutes] = useState<route[]>([
        {
            path: '/',
            element: <Navigate to={'/welcome'}/>
        },
        {
            path: '/',
            element: <App/>,
            children: []
        },
        {
            path: '/login',
            element: <Login/>,
        }
    ])

    useEffect(() => {

        const list = async () => {
            if (menu.length === 0 && location.pathname != '/login') {
                shouRouterLoading()
                const menus = await getMenu({userName: 'admin'});
                if (menus.code === 200) {
                    dispatch(setMenu(menus.result))
                } else {
                    dispatch(setMenu([]))
                }
            }
        }
        list()
        setMenuList()
        removeRouterLoading()
    }, [menu])


    const setMenuList = () => {
        let children = menu.map((u: route) => {
            let route = {
                path: u.key,
                element: Model(u.key)
            }
            return route;
        })
        children.push({
            path: '/*',
            element: <Empty/>
        })
        setRoutes([routes[0], {...routes[1], children: [...children]}, routes[2]])
    }
    return (
        <>
            {
                menu.length === 0 && location.pathname != '/login' ? '' :
                    <RouterProvider key={time} router={createBrowserRouter(routes)}></RouterProvider>
            }
        </>
    )
}
export default RouterView

