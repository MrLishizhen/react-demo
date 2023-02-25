import styles from "@/index.module.less";
import React, {useEffect, useState} from "react";
import {useNavigate, useLocation, useParams} from 'react-router-dom'
import {useAppSelector} from "@/redux/hook";
import type {MenuProps} from 'antd';
import {Menu} from 'antd';

import _ from 'lodash'

interface route {
    label?: string,
    key?: string,
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
                datas[i].children = children.map((u:any)=>({
                    ...u,
                    key:u.component,
                }))
                set_children_data(datas[i]['children'])
            } else {
                return
            }

        }
    }
    const links = data.filter((u: any) => u.parent_id === 0)

    for (let i = 0; i < links.length; i++) {
        // links[i] = {
        //     label: links[i].label,
        //     key: links[i].component,
        //     id: links[i].id
        // }
        links[i].key = links[i].component
        set_children_data([links[i]])
    }

    let menu = [...links]

    return menu
}
const MenuCom = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [selectedKeys, setSelectedKeys] = useState(location.pathname)
    const menu: route[] = useAppSelector(state => state.menuSlice.menu_list)
    let items: MenuProps['items'] = get_menu(_.cloneDeep(menu))
    console.log(items)
    const menuClick: MenuProps['onClick'] = (e) => {
        navigate(e.key)
    }
    useEffect(() => {
        setSelectedKeys(location.pathname)
    }, [location])
    return (
        <aside className={styles.App_aside}>
            <Menu
                // key={selectedKeys}
                theme="dark"
                onClick={menuClick}
                style={{width: 260}}
                defaultSelectedKeys={[selectedKeys]}
                mode="inline"
                items={items}
            />
        </aside>
    )
}
export default MenuCom
