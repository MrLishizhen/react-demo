import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import RouterView from '@/router'
import 'antd/dist/reset.css';
import '@/util/mock/index'
import {Provider} from 'react-redux'
import store from '@/redux/store'
import {BrowserRouter} from "react-router-dom";
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    // <BrowserRouter>
        <Provider store={store}>
            <RouterView/>
        </Provider>
    // </BrowserRouter>

    // </React.StrictMode>,
)
