import React, {useEffect, useState} from "react";
import {useNavigate, useLocation} from 'react-router-dom'
import {useAppSelector} from "@/redux/hook";
import type {MenuProps} from 'antd';
import {Layout, Menu, theme} from 'antd';
import _ from 'lodash'
import IconFont from '@/components/icon'
const {Sider} = Layout;
interface route extends global_route {
    path?: string,
    element?: any,
    children?: route[]

}

const get_menu = (data: global_route[]) => {
    const links = data.filter((u: global_route) => u.parent_id === 0)
    const set_children_data = (datas: route[] | undefined) => {
        if (Array.isArray(datas)) {
            for (let i = 0; i < datas.length; i++) {
                const children = data.filter((u) => u.parent_id === datas[i].id);

                if (children.length > 0) {

                    datas[i].children = children.map((u) => {
                        return {
                            ...u,
                            icon: <IconFont icon_link={u.icon as string}/>
                        }
                    })
                    set_children_data(datas[i]['children'])
                } else {
                    return
                }

            }
        } else {
            return
        }

    }


    for (let i = 0; i < links.length; i++) {
        links[i].icon = <IconFont icon_link={(links[i].icon as string)}/>

        set_children_data([links[i]])
    }

    let menu: route[] = [...links]

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
    // const {
    //     token: { colorBgContainer },
    // } = theme.useToken();
    const inlineCollapsed: boolean = useAppSelector(state => state.menuSlice.inlineCollapsed)
    const location = useLocation()
    const navigate = useNavigate()
    const [selectedKeys, setSelectedKeys] = useState(location.pathname)
    const [openKeys, setOpenKeys] = useState(getOpenKeys())
    const menu: global_route[] = useAppSelector(state => state.menuSlice.menu_list)
    let items: MenuProps['items'] = get_menu(_.cloneDeep(menu))
    const menuClick: MenuProps['onClick'] = (e) => {
        if(e.key.indexOf('http')===0){
            window.open(e.key)
        }else{
            navigate(e.key)
        }

    }
    const openChange = (openKeys: string[]) => {
        setOpenKeys(openKeys)
    }

    useEffect(() => {
        setOpenKeys(getOpenKeys())
        setSelectedKeys(location.pathname.substring(1))
    }, [location])
    return (
        <Sider trigger={null} collapsed={inlineCollapsed}>
            {/*<aside className={styles.App_aside}>*/}
                <Menu
                    style={{borderColor:'transparent'}}
                    // key={selectedKeys}
                    // inlineCollapsed={inlineCollapsed}
                    theme="dark"
                    onClick={menuClick}
                    onOpenChange={openChange}
                    // style={{width: inlineCollapsed ? 90 : 260}}
                    openKeys={openKeys}
                    selectedKeys={[selectedKeys]}
                    mode="inline"
                    items={items}
                />
            {/*</aside>*/}
        </Sider>

    )
}
export default MenuCom
