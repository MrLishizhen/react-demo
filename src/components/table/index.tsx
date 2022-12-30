import styles from './index.module.less'
import React, {useEffect, useRef, useState} from 'react'
import {Pagination,Table} from 'antd';

import type { TableRowSelection } from 'antd/es/table/interface';


interface com_table {
    rowSelectChange?:(data:any)=>void,//筛选回调函数
    rowSelections?:{},//多选参数
    pageChange: (page:number,pageSize:number) => void,//页数修改回调参数
    tableData?:{columns:any,dataSource:any,scroll?:boolean},//表格内容回调参数
    pagination: { current: number, total: number, pageSize: number, showSizeChanger: boolean }//分页参数
}

const Com_table: React.FC<com_table> = ({rowSelectChange,rowSelections,pageChange,tableData, pagination}) => {
    const tableDom = useRef<HTMLDivElement>(null);
    const [table_height,set_table_height] = useState<number>(0)
    const [table_width,set_table_width] = useState<number>(0)

    useEffect(()=>{
        if(tableDom.current){
            set_table_height(tableDom.current.clientHeight - 60)
            set_table_width(tableDom.current.clientWidth)
        }
    },[])
    const paginationChange = (page:number, pageSize:number) => {
        pageChange(page, pageSize);
    }

    const [checkStrictly, setCheckStrictly] = useState(false);
    const rowSelection: TableRowSelection<any> = {
        onChange: (selectedRowKeys, selectedRows:any) => {
            if (rowSelectChange) {
                rowSelectChange(selectedRows)
            }
        },
        ...rowSelections
    };
    const createTable=()=>{
        let data:any = {
            scroll:tableData?.scroll?{x:table_width,y:table_height}:{x:undefined,y:table_height},
            columns:tableData?.columns||[],
            dataSource:tableData?.dataSource||[]
        }
        if(rowSelections){
            data.rowSelection={ ...rowSelection, checkStrictly }
        }
        let table_box_width = '0'
        // if(tableData?.scroll){
        //     table_box_width='calc(100% - 10px)'
        // }
        return (<div className={styles.com_table_com} style={{width:'calc(100% - 1px)'}} ref={tableDom}>
            <Table pagination={false} {...data}/>
        </div>)

    }
    return (<div className={styles.com_table}>
        {
            createTable()
        }
        <div className={styles.com_table_pagination}>
            <Pagination
                current={pagination.current || 1}
                onChange={paginationChange}
                pageSize={pagination.pageSize}
                total={pagination.total || 0}
                hideOnSinglePage={true}
                showSizeChanger={pagination.showSizeChanger}
            />
        </div>
    </div>)
}

export default Com_table
