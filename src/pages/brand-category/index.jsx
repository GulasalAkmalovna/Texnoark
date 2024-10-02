import React, { useEffect, useState } from 'react'
import { GlobalTable } from '@components'
import { brandCategory } from '@service'

const Index = () => {
    const [data, setData] = useState([])
    const getData = async () => {
        try {
            const res = await brandCategory.get()
            console.log(res)
            if (res.status === 200) {
                setData(res?.data?.data?.brandCategories);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        // {
        //     title: 'Age',
        //     dataIndex: 'age',
        //     key: 'age',
        // },
        // {
        //     title: 'Address',
        //     dataIndex: 'address',
        //     key: 'address',
        // },
        // {
        //     title: 'Tags',
        //     key: 'tags',
        //     dataIndex: 'tags',
        //     render: (_, { tags }) => (
        //         <>
        //             {tags.map((tag) => {
        //                 let color = tag.length > 5 ? 'geekblue' : 'green';
        //                 if (tag === 'loser') {
        //                     color = 'volcano';
        //                 }
        //                 return (
        //                     <Tag color={color} key={tag}>
        //                         {tag.toUpperCase()}
        //                     </Tag>
        //                 );
        //             })}
        //         </>
        //     ),
        // },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (_, record) => (
        //         <Space size="middle">
        //             <a>Invite {record.name}</a>
        //             <a>Delete</a>
        //         </Space>
        //     ),
        // },
    ];


    return (
        <div>
            brand category
            <GlobalTable columns={columns} data={data} />
        </div>
    )
}

export default Index