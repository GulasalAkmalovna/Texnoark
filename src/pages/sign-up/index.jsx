import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { auth } from '@service'
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate()
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);

        try {
            const response = await auth.sign_up(values)
            if (response.status = 201) {
                navigate("/")
            }
        } catch (error) {

        }
    };
    return (
        <>
            <div className='w-full min-h-[100vh] bg-slate-300 flex items-center justify-center'>
                <Form
                    name="login"
                    initialValues={{
                        remember: true,
                    }}
                    style={{
                        width: "100%",
                        maxWidth: 500,
                        padding: "10px",
                        borderRadius: "12px",
                        backgroundColor: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        paddingTop: "50px"
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="first_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="First Name" />
                    </Form.Item>
                    <Form.Item
                        name="last_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Last Nane!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item
                        name="phone_number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input prefix={<BsFillTelephoneFill />} placeholder="Phone Number" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input prefix={<AiOutlineMail />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input prefix={<RiLockPasswordLine />} type="password" placeholder="Password" />
                    </Form.Item>
                    {/* <Form.Item>
                        <Flex justify="space-between" align="center">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <a href="">Forgot password</a>
                        </Flex>
                    </Form.Item> */}

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Log in
                        </Button>
                        or <a href="">Register now!</a>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default App;