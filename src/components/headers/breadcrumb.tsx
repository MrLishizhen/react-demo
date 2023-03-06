import {Breadcrumb} from 'antd'
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppSelector} from "@/redux/hook";
import styles from './index.module.less';
const breadcrumb = () => {
    const location = useLocation()
    const [bread, set_bread] = useState<string[]>([])
    const routes = useAppSelector((state) => state.menuSlice.routes)
    useEffect(() => {
        const paths = location.pathname.split('/').filter((u: string) => u)
        const path = paths.join('/')
        console.log(routes)
        const items: string[] = []
        paths.forEach(u => {
            let item = routes.find(j => j.key === u || j.key === path);
            if (item !== undefined) {
                items.push(item?.label)
            }
        })
        set_bread(items);
    }, [location.pathname])
    return (
        <Breadcrumb className={styles.breadcrumb}>
            {
                bread.map(u=>{
                    return <Breadcrumb.Item key={u}>{u}</Breadcrumb.Item>
                })
            }
        </Breadcrumb>
    )
}
export default breadcrumb;
