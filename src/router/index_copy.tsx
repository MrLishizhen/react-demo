import App from '@/App'
import Login from '@/views/login'
import Empty from '@/views/empty'
// import Welcome from "@/views/welcome";
// import Analysis from "@/views/analysis";
import {createBrowserRouter, RouterProvider, useNavigate, Navigate, useRoutes} from 'react-router-dom'
import {useEffect, useState} from "react";
import React from 'react'
import {getMenuList, selectMenuList, setMenu} from '@/redux/menu'
import {useAppDispatch, useAppSelector} from '@/redux/hook'
import {getMenu} from "@/api";

interface route {
    label?: string,
    key?: string,
    path?:string,
    element?:any,
    children?:route[]
}

interface Component {
    link?: string,
}

const modules = import.meta.glob('@/views/*/*');
const Model = (link:any) => {

    // const [ModelCom, setModel] = useState<React.ElementType>()

    let Com = null;
    // useEffect(() => {

    if (link) {
        const URL = '/src/views/' + link + '/index.tsx'
        Com = React.lazy(modules[`${URL}`] as any)
        // setModel(Com)
    }
    // }, [link])
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
        if (menu.length === 0 && location.pathname != '/login') {
            dispatch(getMenuList())
        }
        setMenuList()
    }, [menu])

    const setMenuList = () => {

        let children = menu.map((u: route) => {
            let route = {
                path: u.key,
                element: Model(u.key)
            }
            return route;
        })
        // children.push({
        //     path: '*',
        //     element: <Empty/>
        // })
        if (children.length > 0) {
            setRoutes([routes[0], {...routes[1], children: [...children]}, routes[2]])
        }
    }
    return (
        <>
            {
                menu.length === 0 && location.pathname != '/login' ? '' :
                    <RouterProvider router={createBrowserRouter(routes)}></RouterProvider>
                // useRoutes(routes)
            }
        </>
    )
}
export default RouterView

