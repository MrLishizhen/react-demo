import styles from "@/index.module.less";
import React, {useEffect, useState} from "react";
import {useNavigate,useLocation,useParams} from 'react-router-dom'
import {useAppSelector} from "@/redux/hook";
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

interface route {
    label?: string,
    key?: string,
    path?: string,
    element?: any,
    children?: route[],
    errorElement?: any
}

const MenuCom = ()=>{
    const location = useLocation()
    const navigate = useNavigate()
    const [selectedKeys,setSelectedKeys]= useState(location.pathname)
    const menu: route[] = useAppSelector(state => state.menuSlice.menu_list)
    let items:MenuProps['items'] = menu.map((u)=>{
        return {
            label:u.label,
            key:'/'+u.key
        }
    })
    const menuClick: MenuProps['onClick'] = (e)=>{
        navigate(e.key)
    }
    useEffect(()=>{
        setSelectedKeys(location.pathname)
    },[location])
    return(
        <aside className={styles.App_aside}>
            <Menu
                key={selectedKeys}
                theme="dark"
                onClick={menuClick}
                style={{ width: 260 }}
                defaultSelectedKeys={[selectedKeys]}
                mode="inline"
                items={items}
            />
        </aside>
    )
}
export default MenuCom
