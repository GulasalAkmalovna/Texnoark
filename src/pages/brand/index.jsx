import React, { useEffect, useState } from 'react'
import { GlobalTable, BrandModal } from '@components'
import { brand, category } from '@service'
import { Button, Space } from 'antd'
import { MdOutlineModeEditOutline } from "react-icons/md";
import ConfirmDelete from '../../confirmation/delete'
import { AiOutlineArrowRight } from "react-icons/ai";

const Index = () => {
    const [data, setData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState()

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
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getData()
    }, [])

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
    }, []);

    const deleteData = async (id) => {
        const res = await brand.delete(id);
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
                    <Button style={{ backgroundColor: "orange", color: "#fff" }} ><MdOutlineModeEditOutline /></Button>

                    <ConfirmDelete
                        id={record.id}
                        onConfirm={deleteData}
                        onCancel={() => console.log('Cancelled')}
                        title={"Delete this Brands ?"}
                    />
                    <Button style={{ backgroundColor: "dodgerblue", color: "#fff" }}><AiOutlineArrowRight /></Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Button onClick={showModal} className=' bg-blue-600 text-[#fff] font-[600]'>
                <span className="ml-2">Add new Brand</span>
            </Button>
            <BrandModal
                visible={isModalOpen}
                onOk={handleOk}
                handleClose={handleClose}
                getData={getData}
                categories={categories}
            />
            <GlobalTable columns={columns} data={data} />
        </div>
    )
}

export default Index