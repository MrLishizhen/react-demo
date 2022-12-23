import React, {useEffect, useState,Suspense} from 'react'
import styles from './index.module.less'
import {Outlet, useNavigate} from 'react-router-dom'
import {message} from 'antd'
import Header from "@/components/headers";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

function App() {



    const items: MenuProps['items'] = [
        getItem('Navigation One', 'sub1', <MailOutlined />, [
            getItem('Item 1', '1', null, [getItem('Option 1', 'welcome'), getItem('Option 2', 'analysis')], 'group'),
            getItem('Item 2', '2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
        ]),

        getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
            getItem('Option 5', '5'),
            getItem('Option 6', '6'),
            getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
        ]),

        getItem('Navigation Three', 'sub4', <SettingOutlined />, [
            getItem('Option 9', '9'),
            getItem('Option 10', '10'),
            getItem('Option 11', '11'),
            getItem('Option 12', '12'),
        ]),

        getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
    ];

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
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        navigate('/'+e.key);
    };
    return (
        <section className={styles.App}>
            <Header/>
            <section className={styles.App_bom}>
                <aside className={styles.App_aside}>
                    <Menu
                        onClick={onClick}
                        style={{ width: 256 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        items={items}
                    />
                </aside>
                <section className={styles.App_main}>
                    <nav className={styles.App_nav}></nav>
                    <section className={styles.App_outlet}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Outlet></Outlet>
                        </Suspense>
                    </section>
                </section>
            </section>
        </section>
    )
}

export default App
