import { BsFillTelephoneFill } from "react-icons/bs";
import React from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import auth from "../../service/auth";
import { useNavigate } from "react-router-dom";
const App = () => {
    const navigate = useNavigate()
    const onFinish = async (values) => {

        try {
            const response = await auth.sign_in(values)
            console.log(response)
            const access_token = response?.data?.data?.tokens?.access_token
            localStorage.setItem("access_token", access_token)
            navigate("/admin-layout")

        } catch (error) {

        }
    };
    return (
        <>

            <div className="w-full  bg-blue-200 min-h-[100vh] flex items-center justify-center">
                <Form
                    name="login"
                    initialValues={{
                        remember: true,
                    }}
                    style={{
                        width: "100%",
                        minHeight: "330px",
                        maxWidth: 550,
                        padding: "10px",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        paddingTop: "40px",
                        backgroundColor: "#0003"
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="phone_number"

                        rules={[
                            {
                                required: true,
                                message: 'Please input phone number!',
                            },
                        ]}
                    >
                        <Input prefix={<BsFillTelephoneFill />} placeholder="Phone number" />
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
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
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