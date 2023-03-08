import {useEffect, useState, useCallback} from 'react'

function useParent(el: any) {
    const [width_number, set_width_number] = useState<number>(0);
    const [height_number, set_height_number] = useState<number>(0)
    const handle = useCallback(() => {
        if (el.current) {
            set_width_number(el.current.parentNode.clientWidth)
            set_height_number(el.current.parentNode.clientHeight)
        }
    }, [])

    useEffect(() => {
        handle()
        window.addEventListener('resize', handle, false)
        return () => {
            window.removeEventListener('resize', handle, false)
        }

    }, [])

    return [width_number, height_number]
}

export default useParent
