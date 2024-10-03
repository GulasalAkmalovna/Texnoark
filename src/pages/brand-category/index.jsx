import { AiFillEdit } from "react-icons/ai";
import React, { useEffect, useState } from 'react'
import { GlobalTable, BrandCategoryModal } from '@components'
import { brandCategory, brand } from '@service'
import { Button, Input, Space } from 'antd'
import ConfirmDelete from '../../confirmation/delete'
import { useNavigate, useLocation } from 'react-router-dom';

const Index = () => {
    const [data, setData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [parentBrands, setParentBrands] = useState([])
    const [total, setTotal] = useState()
    const [params, setParams] = useState({
        search: "",
        limit: 3,
        page: 1
    })
    const navigate = useNavigate()
    const { search } = useLocation()
    const getData = async () => {
        try {
            const res = await brandCategory.get()
            // console.log(res)
            if (res.status === 200) {
                setData(res?.data?.data?.brandCategories);
                setTotal(res?.data?.data?.count)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [params])

    useEffect(() => {
        const params = new URLSearchParams(search)
        let page = Number(params.get("page")) || 1
        let limit = Number(params.get("limit")) || 3
        setParams((prev) => ({
            ...prev,
            page: page,
            limit: limit
        }))

        // let limit
    }, [search])


    const editData = () => {
        console.log("for update")
    }
    const deleteData = async (id) => {
        const res = await brandCategory.delete(id);
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
        const current_params = new URLSearchParams(search)
        current_params.set('page', `${current}`)
        current_params.set('limit', `${pageSize}`)
        navigate(`?${current_params}`)
    }

    const getBrands = async () => {
        try {
            const res = await brand.get();
            const fetchBrands = res?.data?.data?.brands;
            setParentBrands(fetchBrands);
            // console.log(parentBrand);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBrands();
    }, []);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Created',
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
        }
    ];


    return (
        <div>
            <BrandCategoryModal
                visible={isModalOpen}
                onOk={handleOk}
                handleClose={handleClose}
                getData={getData}
                // update={update}
                parentBrands={parentBrands}
            />
            <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Input placeholder="Search Categories" size="large" style={{ maxWidth: 260, minWidth: 20 }} />
                <Button type="primary" size="large" style={{ maxWidth: 160, minWidth: 20, backgroundColor: "blue" }} onClick={showModal}>
                    Add Brand-category
                </Button>
            </div>

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
        </div>
    )
}

export default Index