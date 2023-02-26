import styles from "@/index.module.less";
import React, {useEffect, useState} from "react";
import {useNavigate, useLocation, useParams} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import _ from 'lodash'
import IconFont from '@/components/icon'

interface route {
    label?: string,
    key?: string,
    icon?:string,
    path?: string,
    element?: any,
    component?: string,
    children?: route[],
    errorElement?: any
}

const get_menu = (data: any) => {

    const set_children_data = (datas: any) => {
        for (let i = 0; i < datas.length; i++) {
            const children = data.filter((u: any) => u.parent_id === datas[i].id);

            if (children.length > 0) {

                datas[i].children = children.map((u:route)=>{
                    return {
                        ...u,
                        icon:<IconFont icon_link={u.icon}/>
                    }
                })
                set_children_data(datas[i]['children'])
            } else {
                return
            }

        }
    }
    const links = data.filter((u: any) => u.parent_id === 0)

    for (let i = 0; i < links.length; i++) {
        links[i].icon = <IconFont icon_link={links[i].icon}/>
        set_children_data([links[i]])
    }

    let menu = [...links]

    return menu
}
const getOpenKeys = () => {
    const paths = location.pathname.split('/').filter(u => u)
    //大于2 表示需要打开SubMenu
    if (paths.length >= 2) {
        return paths
    } else {
        return []
    }
}
const MenuCom = () => {
    const inlineCollapsed: boolean = useAppSelector(state => state.menuSlice.inlineCollapsed)
    const location = useLocation()
    const navigate = useNavigate()
    const [selectedKeys, setSelectedKeys] = useState(location.pathname)
    const [openKeys, setOpenKeys] = useState(getOpenKeys())
    const menu: route[] = useAppSelector(state => state.menuSlice.menu_list)
    let items: MenuProps['items'] = get_menu(_.cloneDeep(menu))
    const menuClick: MenuProps['onClick'] = (e) => {
        navigate(e.key)
    }
    const openChange = (openKeys: string[]) => {
        setOpenKeys(openKeys)
    }

    useEffect(() => {
        setOpenKeys(getOpenKeys())
        setSelectedKeys(location.pathname.substring(1))
    }, [location])
    return (
        <aside className={styles.App_aside}>
            <Menu
                // key={selectedKeys}
                inlineCollapsed={inlineCollapsed}
                theme="dark"
                onClick={menuClick}
                onOpenChange={openChange}
                style={{width:inlineCollapsed?90:260}}
                openKeys={openKeys}
                selectedKeys={[selectedKeys]}
                mode="inline"
                items={items}
            />
        </aside>
    )
}
export default MenuCom
