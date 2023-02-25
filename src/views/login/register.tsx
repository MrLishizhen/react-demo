import {Button, Checkbox, Form, Input,message} from 'antd';
import styles from './index.module.less'
import {setUser} from "@/api";
import React from 'react'

const Register: React.FC<{ onChange: () => void }> = ({onChange}) => {
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        setUser({userName:values.userName,password:values.password,email:values.email}).then(res => {
            if(res.code===200){
                message.success('注册成功')
                onChange()
                onReset()
            }else{
                message.error(res.msg)
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
        <Form
            className={styles.register}
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
                name="email"
                label="E-mail"
                rules={[{type: 'email', message: '格式错误',}, {required: true, message: '请输入email',},]}
            >
                <Input placeholder={'请输入email'}/>
            </Form.Item>
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
            <Form.Item
                dependencies={['password']}
                hasFeedback
                label="确认密码"
                name="confirm"
                rules={[{required: true, message: '请确认密码'}, ({getFieldValue}) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('两次密码不一致'));
                    },
                })]}
            >
                <Input.Password placeholder={'请确认密码'}/>
            </Form.Item>
            <Form.Item className={styles.register_icons_box} name="isRM" valuePropName="checked"
                       wrapperCol={{offset: 4, span: 24}}>
                <div className={styles.register_icons}>
                    <Button type="link" onClick={() => onChange()}>已有账号</Button>
                </div>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 0, span: 24}} style={{textAlign: 'center'}}>
                <div style={{display: 'flex', width: '100%', justifyContent: 'end'}}>
                    {/*<Button htmlType="button" onClick={onReset}>*/}
                    {/*    一键重置*/}
                    {/*</Button>*/}
                    <Button style={{marginLeft: '30px', width: '100%'}} type="primary" htmlType="submit">
                        注册账号
                    </Button>
                </div>

            </Form.Item>
        </Form>
    )
}
export default Register
