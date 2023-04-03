import styles from "@/index.module.less";
import React from 'react';
import {UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {Avatar, Badge, theme} from 'antd';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {setGlobalStyle, setColorPrimary} from '@/redux/global'
import {toggleCollapsed} from '@/redux/menu'
import logo from '@/assets/logo-removebg-preview.png'
import Breadcrumb from './breadcrumb'
import {Layout, Switch} from 'antd'
import Colors from "@/components/ui/colors";
import {ColorResult} from "react-color";

const {Header} = Layout;

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
const Headers = () => {
    // const {
    //     token: {colorBgContainer},
    // } = theme.useToken();
    const dispatch = useAppDispatch();
    const inlineCollapsed: boolean = useAppSelector(state => state.menuSlice.inlineCollapsed)
    // const {global_color, colorPrimary} = useAppSelector(state => state.globalSlice.global);
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
    const switchChange = (checked: boolean) => {
        dispatch(setGlobalStyle(checked))
    }
    const colorChange = (value: ColorResult) => {
        dispatch(setColorPrimary(`rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`))
    }
    return (
        <Header
            // style={{background: colorBgContainer}}
            className={styles.App_header}>
            <div className={styles.logo} style={{width: inlineCollapsed ? 90 : 200}}>
                <img src={logo} alt="logo"/>
            </div>
            <div className={styles.head_com}>
                <div className={styles.head_btn} onClick={() => dispatch(toggleCollapsed())}>
                    <MenuBtn menu_btn={!inlineCollapsed}/>
                </div>
                {/*<div className={styles.head_breadcrumb}>*/}
                {/*<Breadcrumb/>*/}
                {/*</div>*/}
                {/*<div className={styles.head_right}>*/}
                {/*    <Colors color={colorPrimary} onChange={(value) => colorChange(value)}/>*/}
                {/*    <Switch checked={global_color} checkedChildren="亮色" unCheckedChildren="暗色"*/}
                {/*            onChange={switchChange}></Switch>*/}
                {/*</div>*/}
            </div>
            <div className={styles.user}>
                <Badge count={1}>
                    <Avatar shape="square" style={{color: '#fff'}} icon={<UserOutlined/>}/>
                </Badge>
                <span className={styles.username}>
                    欢迎 {
                    USER.userName
                }
                    <div className={styles.user_list}
                         // style={{background: colorBgContainer}}
                    >
                        <div className={styles.user_list_item} onClick={clearUser}>退出登录</div>
                    </div>
                </span>

            </div>
        </Header>
    )
}
export default Headers
