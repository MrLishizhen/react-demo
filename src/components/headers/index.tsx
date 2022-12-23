import styles from "@/index.module.less";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import Weather from "@/components/weather";
import {useEffect,useState} from "react";

interface user {
    userName:string,
    password:string,
    token?:string
}
const Header = ()=>{
    const [USER,setUSER] = useState<user>({userName:'',password:''});
    useEffect(()=>{
        const user = sessionStorage.getItem('userInfo')||0;
        if(user){
            setUSER(JSON.parse(user));
        }
    },[])
    return (
        <header className={styles.App_header}>
            <div className={styles.logo}>

            </div>
            <div className={styles.head_com}>

            </div>
            <div className={styles.user}>
                <Badge count={1}>
                    <Avatar shape="square" style={{color:'#fff'}} icon={<UserOutlined />} />
                </Badge>
                <span className={styles.username}>
                    欢迎 {
                        USER.userName
                    }
                </span>
            </div>
        </header>
    )
}
export default Header
