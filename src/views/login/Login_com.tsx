import React, {useEffect} from 'react'
import {Button, Checkbox, Form, Input, message} from 'antd';
import styles from './index.module.less'
import {getMenu, userLogin} from "@/api/index";
import {useNavigate,redirect} from "react-router-dom";
import {useAppDispatch, useAppSelector} from '@/redux/hook'
import {getMenuList, setMenu} from "@/redux/menu";
import {removeRouterLoading, shouRouterLoading} from "@/util/functions";

const Login_com: React.FC<{ onChange: () => void }> = ({onChange}) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        userLogin(values).then(async (res) => {
            if (res.code === 200) {
                messageApi.open({
                    type: 'success',
                    content: '登录成功,正在跳转!',
                });
                sessionStorage.setItem('userInfo',JSON.stringify(res.result))
                shouRouterLoading()
                const menus = await getMenu({userName:'admin'});
                if(menus.code===200){
                    dispatch(setMenu(menus.result))
                }else{
                    dispatch(setMenu([]))
                }
                navigate('/',{replace:true})
                removeRouterLoading()
                // dispatch(getMenuList())
            } else {
                messageApi.open({
                    type: 'error',
                    content: res.msg,
                });
            }
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onReset = () => {
        form.resetFields();
    };
    return (
        <>
            {contextHolder}
            <Form
                form={form}
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="用户名"
                    name="userName"
                    rules={[{required: true, message: '请输入用户名'}]}
                >
                    <Input placeholder={'请输入用户名'}/>
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{required: true, message: '请输入密码'}]}
                >
                    <Input.Password placeholder={'请输入密码'}/>
                </Form.Item>

                <Form.Item name="isRM" valuePropName="checked" wrapperCol={{offset: 3, span: 24}}>
                    <div className={styles.icons}>
                        <Checkbox>记住账号</Checkbox>
                        <Button type="link" onClick={() => onChange()}>注册</Button>
                    </div>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 0, span: 24}} style={{textAlign: 'center'}}>
                    <div style={{display: 'flex', width: '100%', justifyContent: 'end'}}>
                        {/*<Button htmlType="button" onClick={onReset}>*/}
                        {/*    一键重置*/}
                        {/*</Button>*/}
                        <Button style={{marginLeft: '30px', width: '100%'}} type="primary" htmlType="submit">
                            登录账号
                        </Button>
                    </div>

                </Form.Item>
            </Form>
        </>

    )
}
export default Login_com
