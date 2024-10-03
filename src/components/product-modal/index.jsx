import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { products } from '@service'
const Index = (props) => {
    const [form] = Form.useForm();
    const [files, setFiles] = useState([]);
    // const [filteredBrands, setFilteredBrands] = useState([])
    // const [filteredBrandCat, setFilteredBrandCat] = useState([])
    const { open, onClose, getData, brands, categories, brandCategories } = props;

    const handleChange = (e) => {
        let fileData = e.target.files[0]
        setFiles(fileData);
    };
    // console.log(file)

    const handleSubmit = async (value) => {
        // console.log(values)
        let formData = new FormData();
        formData.append("name", value?.name);
        formData.append("price", value?.price);
        formData.append("categoryId", value?.category_id);
        formData.append("brandCategoryId", value?.brand_category_id);
        formData.append("brandId", value?.brand_id);
        formData.append("files", files);
        try {
            const res = await products.create(formData)
            if (res.status === 201) {
                onClose();
                getData();
            }
        } catch (error) {
            console.log(error)
        }
        console.log(res)
    }


    const handleCategoryChange = (category_id) => {
        const relatedBrands = brands?.filter((item => item.category_id === category_id))
        setFilteredBrands(relatedBrands)

    }


    const handleBrandChange = (brand_id) => {
        const relatedBrandCategories = brandCategories?.filter((item => item.brand_id === brand_id))
        setFilteredBrandCat(relatedBrandCategories)
    }


    return (
        <>

            <Modal
                open={open}
                title="Add new Products"
                onCancel={onClose}
                onOk={handleSubmit}
                width={650}
            >
                <Form form={form} id="basic" name="basic" onFinish={handleSubmit}>
                    <div className='flex gap-3 '>
                        <Form.Item
                            label="Product name"
                            name="name"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: '8px' }}
                            rules={[
                                { required: true, message: 'Enter product name!' },
                            ]}
                        >
                            <Input style={{ height: "40px" }} />
                        </Form.Item>
                        <Form.Item
                            label="Product price"
                            name="price"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: '8px' }}
                            rules={[
                                { required: true, message: 'Enter product price!' },
                            ]}
                        >
                            <Input style={{ height: "40px" }} type='number' />
                        </Form.Item>
                    </div>
                    <div className='flex gap-3 mb-5'>
                        <Form.Item
                            name="categoryId"
                            label=" Select Category"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: '8px', height: "40px", width: "100%" }}
                            rules={[
                                { required: true, message: 'Select category!' },
                            ]}

                        >
                            <Select
                                showSearch
                                style={{ height: "40px" }}
                                onChange={handleCategoryChange}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {categories?.map((item, index) => (
                                    <Option value={parseInt(item.id)} key={index}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="brandId"
                            label="Select Brand"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ height: "40px", width: "100%" }}
                            rules={[
                                { required: true, message: 'Select Brand!' },
                            ]}
                        >
                            <Select
                                style={{ height: "40px" }}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                onChange={handleBrandChange}
                            >
                                {brands?.map((item, index) => (
                                    <Option value={parseInt(item.id)} key={index}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                    </div>
                    <div className='flex gap-3 mb-5 mt-4' >
                        <Form.Item
                            name="brandCategoryId"
                            label="Select Brand  Category"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ height: "40px", width: "100%" }}
                            rules={[
                                { required: true, message: 'Select Brand category!' },
                            ]}
                        >
                            <Select
                                style={{ height: "40px" }}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                onChange={handleBrandChange}
                            >
                                {brandCategories?.map((item, index) => (
                                    <Option value={parseInt(item.id)} key={index}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="files"
                            label="Files"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            // style={{ marginBottom: '8px' }}
                            rules={[
                                { required: true, message: 'Upload file!' },
                            ]}>
                            <input type="file" height={80} onChange={handleChange} />
                        </Form.Item>
                    </div>

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
                            Add
                        </Button>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};
export default Index;