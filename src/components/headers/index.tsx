import styles from "@/index.module.less";
import React from 'react';
import {UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {Avatar, Badge} from 'antd';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {toggleCollapsed} from '@/redux/menu'
import logo from '@/assets/logo-removebg-preview.png'
import Breadcrumb from './breadcrumb'


interface user {
    userName: string,
    password: string,
    token?: string
}

const MenuBtn: React.FC<{ menu_btn: boolean }> = ({menu_btn}) => {
    const styles = {fontSize: 20}
    if (menu_btn) {
        return <MenuFoldOutlined style={styles}/>
    } else {
        return <MenuUnfoldOutlined style={styles}/>
    }
}
const Header = () => {
    const dispatch = useAppDispatch();
    const inlineCollapsed: boolean = useAppSelector(state => state.menuSlice.inlineCollapsed)
    const [USER, setUSER] = useState<user>({userName: '', password: ''});
    const navigate = useNavigate()
    useEffect(() => {
        const user = sessionStorage.getItem('userInfo') || 0;
        if (user) {
            setUSER(JSON.parse(user));
        }
    }, [])
    const clearUser = () => {
        if (USER.token) {
            sessionStorage.removeItem('userInfo');
            navigate('/login', {replace: true})
        }
    }
    return (
        <header className={styles.App_header}>
            <div className={styles.logo} style={{width: inlineCollapsed ? 90 : 260}}>
                <img src={logo} alt="logo"/>
            </div>
            <div className={styles.head_com}>
                <div className={styles.head_btn} onClick={() => dispatch(toggleCollapsed())}>
                    <MenuBtn menu_btn={!inlineCollapsed}/>
                </div>
                {/*<div className={styles.head_breadcrumb}>*/}
                <Breadcrumb/>
                {/*</div>*/}
                <div className={styles.head_right}></div>
            </div>
            <div className={styles.user}>
                <Badge count={1}>
                    <Avatar shape="square" style={{color: '#fff'}} icon={<UserOutlined/>}/>
                </Badge>
                <span className={styles.username}>
                    欢迎 {
                    USER.userName
                }
                    <div className={styles.user_list}>
                        <div className={styles.user_list_item} onClick={clearUser}>退出登录</div>
                    </div>
                </span>

            </div>
        </header>
    )
}
export default Header
