import styles from './index.module.less'
import React from 'react'
import Com_table from "@/components/table";
import Com_tabs from "@/components/com_tabs";
import {useRef, useState} from "react";
import { Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
interface pagin {
    current: number,
    total: number,
    pageSize: number,
    showSizeChanger: boolean
}


interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}
const Table = () => {
    const [currentRow,setCurrentRow] = useState<any>([]);
    const [pagination, setPagination] = useState<pagin>({
        current: 1,
        total: 99,
        pageSize: 10,
        showSizeChanger:true
    })
    const pageChange = (page: number, pageSize: number) => {
        setPagination({...pagination, current: page, pageSize})
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Full Name',
            width: 100,
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Age',
            width: 100,
            dataIndex: 'age',
            key: 'age',

        },
        {
            title: 'Column 1',
            dataIndex: 'address',
            key: '1',
            width: 150,
        },
        {
            title: 'Column 2',
            dataIndex: 'address',
            key: '2',
            width: 150,
        },
        {
            title: 'Column 3',
            dataIndex: 'address',
            key: '3',
            width: 150,
        },
        {
            title: 'Column 4',
            dataIndex: 'address',
            key: '4',
            width: 150,
        },
        {
            title: 'Column 5',
            dataIndex: 'address',
            key: '5',
            width: 150,
        },

        { title: 'Column 8', dataIndex: 'address', key: '8' },
        {
            title: 'Action',
            key: 'operation',
            width:180,
            render: () => <a>action</a>,
        },
    ];

    const data: DataType[] = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `Edrward ${i}`,
            age: 32,
            address: `London Park no. ${i}`,
        });
    }
    const rowSelectChange = (data:any)=>{
        setCurrentRow(data)
    }
    const tabsChange = (key:string)=>{
        console.log(key,123)
    }
    return (
        <div className={styles.table_box}>
            <div className={styles.table_left}>
                <Com_tabs onChange={tabsChange}></Com_tabs>
            </div>
            <div className={styles.table_right}>
                <Com_table rowSelectChange={rowSelectChange} tableData={{columns,dataSource:data}} pagination={pagination} pageChange={pageChange}></Com_table>
            </div>
        </div>
    )
}
export default Table
