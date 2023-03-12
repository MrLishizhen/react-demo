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
export const get_routers = (data: any) => {
    console.log('我执行了')
    const set_children_data = (datas: any) => {
        for (let i = 0; i < datas.length; i++) {

            const children = data.filter((u: any) => u.parent_id === datas[i].id && u.name !== 'open');
            if (children.length > 0) {
                datas[i]['children'] = children.map((u: any) => {

                    return {
                        path: u.name,
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
        links[i].path = links[i].name;
        links[i].element = Model(links[i].key)
        set_children_data([links[i]])

    }
    let routers = [...links]

    return routers
}

