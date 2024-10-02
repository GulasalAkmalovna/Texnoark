import React, { useEffect, useState } from 'react'
import { GlobalTable } from '@components'
import { products } from '@service'
import ConfirmDelete from '../../confirmation/delete'
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Button, Space } from 'antd';

const Index = () => {
    const [data, setData] = useState([])
    const getData = async () => {
        try {
            const res = await products.get()
            console.log(res)
            if (res.status === 200) {
                setData(res?.data?.data?.products);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const deleteData = async (id) => {
        const res = await products.delete(id);
        if (res.status === 200) {
            getData();
        }
    };

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
            <GlobalTable columns={columns} data={data} />
        </div>
    )
}

export default Index