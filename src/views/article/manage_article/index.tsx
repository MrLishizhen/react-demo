import {Button} from 'antd'
import {SearchOutlined} from '@ant-design/icons'
import {useNavigate} from 'react-router-dom'

const manage_article = ()=>{
    const navigate = useNavigate();
    const click_to =(link:string)=>{
        navigate('/article/edit_article')
    }
    return (
        <div>
            <Button type="primary" onClick={()=>click_to('12')} icon={<SearchOutlined />}>
                Search
            </Button>
        </div>
    )
}

export default manage_article
