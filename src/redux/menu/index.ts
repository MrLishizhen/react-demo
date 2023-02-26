import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {RootState} from '../store'
import {getMenu} from "@/api";

interface route {
    label: string,
    key: string,
}

interface getPost {
    code: number,
    msg: string,
    result: any
}

// 使用该类型定义初始 state
const initialState: {
    menu_list: route[]
    tabs_list: route[],
    inlineCollapsed:boolean,
} = {
    menu_list: [],
    tabs_list: [],
    inlineCollapsed:false
}


export const menuSlice = createSlice({
    name: 'menu',
    // `createSlice` 将从 `initialState` 参数推断 state 类型
    initialState,
    reducers: {
        setMenu: (state, action) => {
            state.menu_list = action.payload
        },
        setTabs: (state, action) => {
            // console.log(state.menu_list,action)
            let tab: route = state.menu_list.find((u: route) => '/' + u.key === action.payload) || {
                label: '',
                key: ''
            };

            if (state.tabs_list.findIndex((u: route) => u?.key === tab?.key) === -1 && tab.key !== '') {
                state.tabs_list.push(tab)
            }
        },
        toggleCollapsed:(state)=>{
          state.inlineCollapsed = !state.inlineCollapsed
        },
        removeTab: (state, action) => {
            state.tabs_list = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(getMenuList.fulfilled, (state, action) => {
            const res = action.payload;
            if (res?.code === 200) {
                state.menu_list = res?.result;
            } else {
                state.menu_list = []
            }
        })
    }
})

export const {setMenu, setTabs, removeTab,toggleCollapsed} = menuSlice.actions
// 选择器等其他代码可以使用导入的 `RootState` 类型
export const selectMenuList = (state: RootState) => state.menuSlice.menu_list

export const getMenuList = createAsyncThunk('menu/getMenu', async (): Promise<getPost> => {
    let res = await getMenu({userName: 'admin'});
    return res;
})
export default menuSlice.reducer
