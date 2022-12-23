import * as axios from 'axios'
import { AxiosRequestConfig } from 'axios';
//解决

declare module 'axios' {
    //解决自定义loading参数ts报错的问题
    export interface AxiosRequestConfig {
        loading?: boolean;
        // [自定义属性声明]
    }
    //解决axios返回promise参数不对等的问题
    interface AxiosInstance {
        (config: AxiosRequestConfig): Promise<any>
    }
}
