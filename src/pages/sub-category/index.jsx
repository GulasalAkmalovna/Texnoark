import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import React from 'react'
import { GlobalTable } from '@components'
import { SubModal } from "@components";
import { useState, useEffect } from "react";
import { Button, Input, Space, } from 'antd';
import { subCategory, category } from '@service'
import ConfirmDelete from '../../confirmation/delete'
import { useNavigate, NavLink, useParams, useLocation } from 'react-router-dom'

const Index = () => {
    const [data, setData] = useState([])
    const [total, setTotal] = useState()
    const [params, setParams] = useState({
        search: "",
        limit: 3,
        page: 1
    })
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const { id } = useParams();
    const parentId = id

    const getData = async () => {
        const res = await subCategory.get(parentId)
        try {
            if (res.status === 200) {
                setData(res?.data?.data?.subcategories);
                setTotal(res?.data?.data?.count)
                // console.log(res.data.data.subcategories)
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getData();
    }, [params]);

    const editData = () => {
        console.log("for update")
    }
    const deleteData = async (id) => {
        const res = await subCategory.delete(id);
        if (res.status === 200) {
            getData();
        }
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleTableChange = (pagination) => {
        console.log(pagination)
        const { current, pageSize } = pagination
        setParams((prev) => ({
            ...prev,
            limit: pageSize,
            page: current,
        }))
    }

    const getCategories = async () => {
        try {
            const res = await category.get();
            const fetchCategories = res?.data?.data?.categories;
            setCategories(fetchCategories);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const columns = [
        {
            title: '№',
            dataIndex: 'id',
        },
        {
            title: ' Category name',
            dataIndex: 'name',
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button style={{ backgroundColor: "orange", color: "#fff" }} onClick={() => editData(record)}><AiFillEdit /></Button>
                    <ConfirmDelete
                        id={record.id}
                        onConfirm={deleteData}
                        onCancel={() => console.log('Cancelled')}
                        title={"Delete this Sub Category ?"}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <SubModal
                visible={isModalOpen}
                onOk={handleOk}
                handleClose={handleClose}
                getData={getData}
                // update={update}
                categories={categories}
            />
            <Button type="primary" size="large" style={{ maxWidth: 160, minWidth: 20, backgroundColor: "blue" }} onClick={showModal}>
                Create
            </Button>
            {/* Sub category */}
            <GlobalTable
                columns={columns}
                data={data}
                pagination={{
                    current: params.page,
                    pageSize: params.limit,
                    total: total,
                    showSizeChanger: true,
                    pageSizeOptions: ['2', '4', '6', '8', '10', '12'],
                }}
                handleChange={handleTableChange}
            />
            <NavLink to="/admin-layout/category" className=" font-[700], text-[#b42d43]" style={{ fontSize: "18px" }}>Back to Category</NavLink>
        </div>
    )
}

export default Index