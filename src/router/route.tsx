import React from "react";

const modules = import.meta.glob('@/views/**');
const Model = (link: any,) => {
    let Com = null;
    const URL = '/src/views/' + link + '/index.tsx'
    console.log(URL,modules[`${URL}`],React.lazy(modules[`${URL}`] as any) )
    Com = React.lazy(modules[`${URL}`] as any)
    return (
        <>
            {
                Com ? <Com></Com> : ''
            }
        </>
    )
}
export const get_routers = (data: any) => {
    const set_children_data = (datas: any) => {
        for (let i = 0; i < datas.length; i++) {
            datas[i].path = datas[i].key;
            datas[i].element = Model(datas[i].component)
            const children = data.filter((u: any) => u.parent_id === datas[i].id);
            if (children.length > 0) {
                datas[i]['children'] = children;
                set_children_data(datas[i]['children'])
            } else {
                return
            }

        }
    }
    const links = data.filter((u: any) => u.parent_id === 0)

    for (let i = 0; i < links.length; i++) {
        links[i].path = links[i].key;
        links[i].element = Model(links[i].component)
        set_children_data([links[i]])
    }

    let routers = [...links]

    return routers
}

