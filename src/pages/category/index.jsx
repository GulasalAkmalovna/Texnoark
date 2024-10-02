import { AiOutlineArrowRight } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";
import React, { useEffect, useState } from 'react'
import { GlobalTable, CategoryModal } from '@components'
import { category } from '@service'
import { Button, Space } from 'antd'
import ConfirmDelete from '../../confirmation/delete'
import { useNavigate, useLocation } from 'react-router-dom';

const Index = () => {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()

    const openModal = () => {
        setOpen(true);
    };
    const getData = async () => {
        try {
            const res = await category.get()
            // console.log(res)
            if (res.status === 200) {
                setData(res?.data?.data?.categories);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const deleteData = async (id) => {
        const res = await category.delete(id);
        if (res.status === 200) {
            getData();
        }
    };

    const subCategoryView = (id) => {
        navigate(`/admin-layout/category/${id}`);
        // console.log(id)
    }
    const handleClose = () => {
        console.log('Clicked cancel button');
        setOpen(false);
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
                    <Button style={{ backgroundColor: 'orange', color: "#fff" }}><MdOutlineModeEditOutline /></Button>
                    <ConfirmDelete
                        id={record.id}
                        onConfirm={deleteData}
                        onCancel={() => console.log('Cancelled')}
                        title={"Delete this Brands ?"}
                    />
                    <Button onClick={() => subCategoryView(record.id.toString())} style={{ backgroundColor: "dodgerblue", color: "#fff" }}><AiOutlineArrowRight /></Button>
                </Space>
            ),
        },
    ];


    return (
        <div>
            <Button onClick={openModal} className=' bg-blue-600 text-[#fff] font-[600]'>
                <span className="ml-2">Add new category</span>
            </Button>
            <CategoryModal
                open={open}
                handleClose={handleClose}
                getData={getData}
            />
            <GlobalTable columns={columns} data={data} />
        </div>
    )
}

export default Index