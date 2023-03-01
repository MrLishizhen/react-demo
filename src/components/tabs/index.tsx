import styles from './index.module.less'
import React, {useEffect, useState} from 'react';
import {Tabs} from 'antd';
import {setTabs, removeTab} from '@/redux/menu'
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {useNavigate} from "react-router-dom";
import {deepClone} from "@/util/functions";

interface route {
    label: string,
    key: string,
}

const TabsCom = () => {
    const tabs_list = useAppSelector(state => state.menuSlice.tabs_list)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [activeKey, setActiveKey] = useState('')
    useEffect(() => {
        if (location.pathname) {
            dispatch(setTabs(location.pathname))
            setActiveKey(location.pathname.substring(1))
        }
    }, [location.pathname])
    const onChange = (key: string) => {
        navigate(key)
    };
    const onEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove',) => {
        let tabIndex = tabs_list.findIndex((u: route) => u.key === targetKey);
        let tabs = deepClone(tabs_list)
        if (tabs.length === 1 && tabs[tabIndex].key === 'welcome') {
            //什么都不做
        } else {
            tabs.splice(tabIndex, 1);
        }


        if (tabs.length === 0) {
            navigate('/welcome')
        } else {
            if (location.pathname === '/' + targetKey) {
                navigate('/' + tabs[tabs.length - 1].key)
            }

        }
        dispatch(removeTab(tabs))
    }
    return (
        <div className={styles.tabs}>
            {
                tabs_list.length === 0 ? '' : <Tabs
                    type="editable-card"
                    // key={activeKey}
                    hideAdd
                    size={'small'}
                    // key={activeKey}
                    // type="card"
                    activeKey={activeKey}
                    // defaultActiveKey={activeKey}
                    onChange={onChange}
                    onEdit={onEdit}
                    items={[...tabs_list]}
                />
            }

        </div>
    )
}

export default TabsCom
