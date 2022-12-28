import styles from "@/index.module.less";
import React, {useEffect, useState} from "react";
import {useNavigate, useLocation, useParams} from 'react-router-dom'
import {useAppSelector} from "@/redux/hook";
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import {deepClone} from "@/util/functions";

interface route {
    label: string,
    key: string,
    path?: string,
    element?: any,
    children?: route[],
    errorElement?: any,
    fid?: number,
    id?: number
}
// 生成children对象
const createChildren = (menu: route[]) => {
    const list = deepClone(menu);
    const router = list.filter((u: route) => u.fid === 0);
    const childrens = (data: route[]) => {
        for (let j = 0; j < data.length; j++) {
            data[j] = {...data[j], key: '/' + data[j].key};
            let children: route[] = menu.filter(i => i.fid === data[j].id);
            if (children.length > 0) {
                // @ts-ignore
                data[j].children = children.map(i => {
                    return {
                        label: i.label,
                        key: '/' + i.key
                    }
                });
                childrens(children)
            } else {
                continue;
            }

        }
    }
    childrens(router)
    return router
}
const MenuCom = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([])
    const menu: route[] = useAppSelector(state => state.menuSlice.menu_list)
    let items: MenuProps['items'] = createChildren(menu)
    const menuClick: MenuProps['onClick'] = (e) => {
        setSelectedKeys([e.key])
    }
    const openChange: MenuProps["onOpenChange"] = (openKeys: string[]) => {
        setDefaultOpenKeys([...openKeys])
    }
    //解决menu切换高亮闪屏的问题
    useEffect(() => {
        if (selectedKeys.length > 0) {
            navigate(selectedKeys[0])
        }
    }, [selectedKeys])
    useEffect(() => {
        let menu_item: route = menu.find(u => u.key === location.pathname.slice(1)) || {label: '', key: ''};
        if (menu_item?.key) {
            let p_name = menu.find(u => u.id === menu_item.fid) || {label: '', key: ''};
            if (p_name.key) {
                setDefaultOpenKeys(['/' + p_name?.key])
            }
        }
        if (selectedKeys[0] !== location.pathname) {
            setSelectedKeys([location.pathname])
        }

    }, [location])
    return (
        <aside className={styles.App_aside}>
            {
                items && items.length > 0 ? <Menu
                    theme="dark"
                    onClick={menuClick}
                    style={{width: 260}}
                    onOpenChange={openChange}
                    openKeys={defaultOpenKeys}
                    selectedKeys={selectedKeys}
                    mode="inline"
                    items={items}
                /> : ''
            }

        </aside>
    )
}
export default MenuCom
