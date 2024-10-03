import React, { useEffect, useState } from 'react'
import { GlobalTable } from '@components'
import { products } from '@service'
import ConfirmDelete from '../../confirmation/delete'
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Button, Space } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { ProductModal } from '@components'
import { brandCategory, brand, category } from '@service';

const Index = () => {
    const [data, setData] = useState([])
    const [brands, setBrands] = useState([])
    const [update, setUpdate] = useState({});
    const [categories, setCategories] = useState([]);
    const [brandCategories, setBrandCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [total, setTotal] = useState()
    const [params, setParams] = useState({
        search: "",
        limit: 3,
        page: 1
    })
    const navigate = useNavigate()
    const { search } = useLocation()

    const openModal = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


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

    const getBrands = async () => {
        try {
            const res = await brand.get(params);
            console.log(res, 'res branddlar')
            // const fetchedData = res?.data?.data?.brands;
            setBrands(res?.data?.data?.brands);
            console.log(brands, 'brandlar');

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBrands();
    }, [params]);

    const getCategories = async () => {
        try {
            const res = await category.get(params);
            // const fetchedData = res?.data?.data?.categories;
            setCategories(res?.data?.data?.categories);
            console.log(categories, 'categoriyalar')
            // console.log(categories, "categories");

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, [params]);

    const getBrandCategories = async () => {
        try {
            const res = await brandCategory.get(params);
            // const fetchedData = res?.data?.data?.brandCategories;
            setBrandCategories(res?.data?.data?.brandCategories);
            // console.log(brandCategory);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBrandCategories();
    }, [params]);

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
            <ProductModal
                open={open}
                onClose={onClose}
                getData={getData}
                brands={brands}
                update={update}
                categories={categories}
                brandCategories={brandCategories}
            />
            <Button type='primary' onClick={openModal}>
                <span >Add New Product</span>
            </Button>
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