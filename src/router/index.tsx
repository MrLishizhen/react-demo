import App from '@/App'
import Login from '@/views/login'
import Empty from '@/views/empty'
import {Navigate, useRoutes, useNavigate} from 'react-router-dom'
import {useEffect, useState} from "react";
import React from 'react'
import {setMenu} from '@/redux/menu'
import {useAppDispatch, useAppSelector} from '@/redux/hook'
import {getMenu} from "@/api";
import {message} from "antd";
import {get_routers} from "@/router/route";
import _ from 'lodash'

interface route {
    label?: string,
    key?: string,
    path?: string,
    element?: any,
    children?: route[],
    errorElement?: any
}


const RouterView = () => {
    const [bs_number, setBs] = useState(0)
    const dispatch = useAppDispatch()
    const menu: route[] = useAppSelector(state => state.menuSlice.menu_list)
    console.log(get_routers(_.cloneDeep(menu)),1)
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

    //判断是否登陆
    useEffect(() => {
        const list = async () => {
            if (!bs_number) {
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
        <>
            {
                menu.length === 0 && location.pathname != '/login' ? <App/> : routers

            }
        </>
    )
}
export default RouterView

