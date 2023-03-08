import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {RootState} from '../store'
import {getMenu} from "@/api";


// 使用该类型定义初始 state
const initialState: {
    global:{
        global_color:boolean,
    }
} = {
    global:{
        global_color:true,
    }
}


export const globalSlice = createSlice({
    name: 'menu',
    // `createSlice` 将从 `initialState` 参数推断 state 类型
    initialState,
    reducers: {
        setGlobalStyle: (state, action) => {
            state.global.global_color = action.payload
        },

    }
})

export const {setGlobalStyle} = globalSlice.actions
// 选择器等其他代码可以使用导入的 `RootState` 类型
export const getMenuList = createAsyncThunk('menu/getMenu', async (): Promise<request> => {
    return await getMenu({userName: 'admin'});
})
export default globalSlice.reducer
