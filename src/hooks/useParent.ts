import {useEffect, useState} from 'react'

function useParent(el:any) {
    const [width_number, set_width_number] = useState<number>(0);
    const [height_number, set_height_number] = useState<number>(0)

    useEffect(() => {
        console.log(el)
        const handle = ()=>{
            if(el.current){
                set_width_number(el.current.parentNode.clientWidth)
                set_height_number(el.current.parentNode.clientHeight)
            }
        }
        window.addEventListener('resize',handle,false)
        return ()=>{
            window.removeEventListener('resize',handle,false)
        }

    }, [])

    return [width_number,height_number]
}

export default useParent
