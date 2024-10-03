import React, { useEffect, useState } from 'react'
import { GlobalTable } from '@components'
import { products } from '@service'
import ConfirmDelete from '../../confirmation/delete'
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Button, Space } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const Index = () => {
    const [data, setData] = useState([])
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
            const res = await products.get()
            // console.log(res)
            if (res.status === 200) {
                setData(res?.data?.data?.products);
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

    const deleteData = async (id) => {
        const res = await products.delete(id);
        if (res.status === 200) {
            getData();
        }
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

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button ><MdOutlineModeEditOutline /></Button>

                    <ConfirmDelete
                        id={record.id}
                        onConfirm={deleteData}
                        onCancel={() => console.log('Cancelled')}
                        title={"Delete this Brands ?"}
                    />
                </Space>
            ),
        },
    ];


    return (
        <div>
            products
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