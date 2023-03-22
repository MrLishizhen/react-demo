import React from "react";

const modules = import.meta.glob('@/views/**');
const Model = (link: any,) => {
    let Com = null;
    const URL = '/src/views/' + link + '/index.tsx'
    Com = React.lazy(modules[`${URL}`] as any)
    return (
        <>
            {
                Com ? <Com></Com> : ''
            }
        </>
    )
}
//解决需要在路径上传递参数
//
export const get_params = (data: string[] | string): string => {
    if (typeof data === 'string') {
        return data;
    } else if (data && Array.isArray(data)) {
        return '/' + data.join('/')
    } else {
        return ''
    }
}
export const get_routers = (data: any) => {
    const set_children_data = (datas: any) => {
        for (let i = 0; i < datas.length; i++) {

            const children = data.filter((u: any) => u.parent_id === datas[i].id && u.name !== 'open');
            if (children.length > 0) {
                datas[i]['children'] = children.map((u: any) => {
                    const {meta} = u;
                    let path = u.name;
                    let params = get_params(meta?.params || '')
                    if (params) {
                        path = path + params;
                    }
                    return {
                        path: path,
                        element: Model(u.key)
                    }

                });
                set_children_data(datas[i]['children'])
            } else {
                return
            }

        }
    }
    const links = data.filter((u: any) => u.parent_id === 0 && u.name !== 'open')

    for (let i = 0; i < links.length; i++) {
        const {meta} = links[i]
        let params = get_params(meta?.params || '')
        if (params) {
            links[i].path = links[i].name + params;
        } else {
            links[i].path = links[i].name;
        }
        links[i].element = Model(links[i].key)
        set_children_data([links[i]])

    }
    let routers = [...links]
    return routers
}

