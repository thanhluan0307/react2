
import React from 'react';
import { Button, Form, Input, message } from 'antd';

import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {addUser} from '../../userSlice'
import {PostAPI} from '../../methodsAPI'

function Login() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    // Login
    const onFinish = (values) => {
        PostAPI('https://class.nodemy.vn/api/login',values,(res)=>{
          localStorage.setItem('accessToken',res.data.data.token)
          localStorage.setItem('acc',JSON.stringify(values))
          dispatch(addUser(values))
          nav('/home')
        },() => message.error('dang nhap ko thanh cong'))
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (  
            <Form
              name="basic"
              labelCol={{span: 8,}}
              wrapperCol={{span: 16,}}
              initialValues={{remember: true,}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
        
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    min: 6,
                    message: 'nhap tren 6 ky tu',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                wrapperCol={{offset: 8,span: 16,}}
              >
                <Button type="primary" htmlType="submit">
                    Dang nhap
                </Button>
              </Form.Item>
            </Form>
     );
}

export default Login;