import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import './style.css'
import { Header } from 'antd/es/layout/layout';
import { UserOutlined } from '@ant-design/icons';

function NavBar(props) {
    const [current, setCurrent] = useState("");
    const location = useLocation();

    const tabNames = ["Servicios", "Certificaciones", "Contacto"];
    const items = tabNames.map((tabName, index) => (
        {
            key: index + 1,
            label: tabName,
            url: `/${tabName.toLowerCase()}`
        }
    ))

    useEffect(() => {
        // Sincroniza el estado 'current' con la ruta actual
        const currentItem = items.find(item => item.url === location.pathname);
        if (currentItem) {
            setCurrent(currentItem.key.toString());
        }
    }, [location.pathname]);



    return (
        <Layout>
            <Header className='header-content'>
                <div>
                    <Link to="/" style={{ color: "#FFF" }}>
                        <h2>SIMAP</h2>
                    </Link>
                </div>
                <div style={{ width: "60%" }}>
                    <Menu mode='horizontal' selectedKeys={[current]}
                        style={{ display: 'flex', justifyContent: 'center', flex: 1, marginRight: '20px', backgroundColor: "#387478" }}>
                        {
                            items.map(item => (
                                <Menu.Item key={item.key} onClick={() => setCurrent(item.key)}>
                                    <Link to={item.url} style={{ color: '#fff', fontWeight:"bold" }}>{item.label}</Link>
                                </Menu.Item>
                            ))
                        }
                    </Menu>
                </div>
                <div>
                    <Link to="/login" style={{ color: "#FFF" }}>
                    <UserOutlined style={{fontSize: "16px"}}/>
                    </Link>
                </div>
            </Header>
        </Layout>
    );
}

export default NavBar;