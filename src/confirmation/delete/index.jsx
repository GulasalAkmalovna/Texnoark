import React from 'react';
import { Popconfirm, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
const PopconfirmDelete = ({ onConfirm, onCancel, id, title }) => (
    <Popconfirm
        title={title}
        okText="Ok"
        cancelText="Cancel"
        onConfirm={() => onConfirm(id)}
        onCancel={onCancel}
    >
        <Button style={{ backgroundColor: "red" }}><span style={{ color: "#fff" }}><DeleteOutlined /></span></Button>
    </Popconfirm>
);

export default PopconfirmDelete;
