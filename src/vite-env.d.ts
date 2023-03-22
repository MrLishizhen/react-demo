/// <reference types="vite/client" />
// import React from "react";

interface meta {
    title: string,
    params?:string[]|string
}

interface tabs_type {
    key: string,
    label: React.ReactNode
}

interface global_route {
    id: number,
    parent_id: number,
    icon: string | React.ReactElement,
    label: string,
    layout: string,
    name: string,
    key: string,
    meta: meta,
    nodeRef?: React.RefObject
    // [key:string]:string
}

interface request {
    code: number,
    msg: string,
    result: any
}
