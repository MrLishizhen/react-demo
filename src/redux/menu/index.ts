import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import type {RootState} from '../store'
import {getMenu} from "@/api";
import React from "react";
import {Navigate} from "react-router-dom";
import App from "@/App";
import Login from "@/views/login";

// 为 slice state 定义一个类型
interface menuState {
    path?: string,
    element?: string
}

interface getPost {
    code: number,
    msg: string,
    result: any
}

// 使用该类型定义初始 state
const initialState = {
    menu_list:[]
}


export const menuSlice = createSlice({
    name: 'menu',
    // `createSlice` 将从 `initialState` 参数推断 state 类型
    initialState,
    reducers: {
        setMenu: (state, action) => {
            state.menu_list = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(getMenuList.fulfilled, (state, action) => {
            console.log(state, action)
            const res = action.payload;
            if (res?.code === 200) {
                state.menu_list = res?.result;
            } else {
                state.menu_list = []
            }
        })
    }
})

export const {setMenu} = menuSlice.actions
// 选择器等其他代码可以使用导入的 `RootState` 类型
export const selectMenuList = (state: RootState) =>state.menuSlice.menu_list

export const getMenuList = createAsyncThunk('menu/getMenu', async (): Promise<getPost> => {
    let res = await getMenu({userName: 'admin'});
    return res;
})
export default menuSlice.reducer
