import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { category } from '@service'
const Index = (props) => {
    const [form] = Form.useForm();
    const { open, handleClose, getData } = props;

    const handleSubmit = async (values) => {
        console.log(values)
        try {
            const res = await category.create(values)
            if (res.status === 201) {
                handleClose();
                getData();
            }
        } catch (error) {
            console.log(error)
        }
        console.log(res)
    }
    return (
        <>

            <Modal
                open={open}
                title="Add new category"
                onCancel={handleClose}
                onOk={handleSubmit}
                width={500}
            >
                <Form form={form} id="basic" name="basic" onFinish={handleSubmit}>
                    <Form.Item
                        label="Category name"
                        name="name"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: "Please input category name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};
export default Index;