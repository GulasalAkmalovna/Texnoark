import React, { useEffect, useState } from 'react'
import { GlobalTable, BrandModal } from '@components'
import { brand, category } from '@service'
import { Button, Input, Space } from 'antd'
import { MdOutlineModeEditOutline } from "react-icons/md";
import ConfirmDelete from '../../confirmation/delete'
import { useNavigate, useLocation } from 'react-router-dom';

const Index = () => {
    const [data, setData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState()
    const [total, setTotal] = useState()
    const [params, setParams] = useState({
        search: "",
        limit: 3,
        page: 1
    })
    const navigate = useNavigate()
    const { search } = useLocation()

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleClose = () => {
        setIsModalOpen(false);

    };

    const getData = async () => {
        try {
            const res = await brand.get()
            // console.log(res)
            if (res.status === 200) {
                setData(res?.data?.data?.brands);
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

    const getCategories = async () => {
        try {
            const res = await category.get()
            const fetchCategories = res?.data?.data?.categories;
            setCategories(fetchCategories)

        } catch (error) {

        }
    }
    useEffect(() => {
        getCategories();
    }, [params]);

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

    const deleteData = async (id) => {
        const res = await brand.delete(id);
        if (res.status === 200) {
            getData();
        }
    };
    const handleSearch = (event) => {
        setParams((prev) => ({
            ...prev,
            search: event.target.value,
        }));
        const search_params = new URLSearchParams(search);
        search_params.set("search", event.target.value);
        navigate(`?${search_params}`);
    };


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
                    <Button style={{ backgroundColor: "orange", color: "#fff" }} ><MdOutlineModeEditOutline /></Button>

                    <ConfirmDelete
                        id={record.id}
                        onConfirm={deleteData}
                        onCancel={() => console.log('Cancelled')}
                        title={"Delete this Brands ?"}
                    />
                    {/* <Button style={{ backgroundColor: "dodgerblue", color: "#fff" }}><AiOutlineArrowRight /></Button> */}
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Input placeholder="Search Categories" size="large" style={{ maxWidth: 260, minWidth: 20 }} onChange={handleSearch} />
                <Button onClick={showModal} className=' bg-blue-600 text-[#fff] font-[600]'>
                    <span className="ml-2">Add new Brand</span>
                </Button>
            </div>
            <BrandModal
                visible={isModalOpen}
                onOk={handleOk}
                handleClose={handleClose}
                getData={getData}
                categories={categories}
            />
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