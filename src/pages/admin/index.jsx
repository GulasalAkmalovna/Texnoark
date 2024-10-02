import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Flex, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
import { NavLink, Outlet } from 'react-router-dom';
import { adminRoutes } from '../../routes/routes';
import Item from 'antd/es/list/Item';


const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ minHeight: "100vh" }}>
                <div className="text-white text-2xl font-bold text-center py-4 cursor-pointer">
                    Texno Ark
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    style={{ fontSize: "16px" }}
                    defaultSelectedKeys={["1"]}
                    items={adminRoutes.map((item, index) => ({
                        key: index + 1,
                        icon: item.icon,
                        label: <NavLink to={item.path}>{item.label}</NavLink>,
                    }))}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default App;