import styles from './index.module.css'
import React from 'react';
import {Button, Result} from 'antd';
import {useNavigate} from "react-router-dom";

type title_type = 403 | 404 | 500 | '403' | '404' | '500'
const Empty: React.FC<{title:title_type}> = ({title}) => {
    const navigate = useNavigate();
    const backHome = () => {
        navigate('/')
    }
    return (<Result
        status={title || '404'}
        title={title || '404'}
        subTitle="你是不是迷路了？"
        extra={<Button type="primary" onClick={backHome}>返回首页</Button>}
    />)
}
export default Empty
