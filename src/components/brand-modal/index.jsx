import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { brand } from '@service'
const Index = (props) => {
    const [form] = Form.useForm();
    const { visible, onOk, handleClose, getData, categories } = props;

    const [file, setFile] = useState([]);
    const handleChange = (e) => {
        let fileData = e.target.files[0]
        setFile(fileData);
    };
    console.log(file)

    const onFinish = async (value) => {

        let formData = new FormData();
        formData.append("name", value?.name);
        formData.append("description", value?.description);
        formData.append("categoryId", value?.category_id);
        formData.append("file", file);

        // console.log(formData)
        try {
            await brand.create(formData)
            getData()
            handleClose()
        } catch (error) {
            console.log(error)
        }


        // console.log(formData)
        // try {
        //     const res = await brand.create(formData)
        //     console.log(formData)
        //     if (res.status === 201) {
        //         handleClose();
        //         getData();
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    }
    return (
        <>

            <Modal
                title="Add New Brand"
                open={visible}
                onOk={onOk}
                onCancel={handleClose}
                footer={null}
            >
                <Form form={form} id="basic" name="brands_form" onFinish={onFinish}>
                    <Form.Item
                        label="Brand name"
                        name="name"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: "Please input Brand name!",
                            },
                        ]}
                    >
                        <Input style={{ height: "40px" }} />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ marginBottom: '8px' }}
                        rules={[
                            { required: true, message: 'Enter Description!' },
                        ]}
                    >
                        <Input style={{ height: "40px" }} />
                    </Form.Item>
                    <Form.Item
                        name="categoryId"
                        label="Category"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ marginBottom: '8px' }}
                        rules={[
                            { required: true, message: 'Enter Brand name!' },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Select a Category"
                        // filterOption={(input, option) =>
                        //     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        // }
                        >
                            {categories?.map((item, index) => (
                                <Option value={parseInt(item.id)} key={index}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="file"
                        label="File"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ marginBottom: '8px' }}
                        rules={[
                            { required: true, message: 'Upload file!' },
                        ]}>
                        <input type="file" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            block
                            type="submit"
                            htmlType="submit"
                            style={{
                                backgroundColor: "#e35112",
                                color: "white",
                                height: "40px",
                                fontSize: "18px",
                                marginTop: "10px",
                            }}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default Index;