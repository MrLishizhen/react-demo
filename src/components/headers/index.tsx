import styles from "@/index.module.less";
import {UserOutlined} from '@ant-design/icons';
import {Avatar, Badge} from 'antd';
import Weather from "@/components/weather";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

interface user {
    userName: string,
    password: string,
    token?: string
}

const Header = () => {
    const [USER, setUSER] = useState<user>({userName: '', password: ''});
    const navigate = useNavigate()
    useEffect(() => {
        const user = sessionStorage.getItem('userInfo') || 0;
        if (user) {
            setUSER(JSON.parse(user));
        }
    }, [])
    const clearUser = () => {
        if(USER.token){
            sessionStorage.removeItem('userInfo');
            navigate('/login',{replace:true})
        }
    }
    return (
        <header className={styles.App_header}>
            <div className={styles.logo}>

            </div>
            <div className={styles.head_com}>

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
