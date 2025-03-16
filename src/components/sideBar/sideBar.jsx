import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import {
    UserOutlined,      // Ícono para "Cuenta"
    HomeOutlined,      // Ícono para "Espacios"
    DeploymentUnitOutlined, // Ícono para "Dispositivos"
    BellOutlined,
    SunOutlined,      // Ícono para "Notificaciones"
} from '@ant-design/icons';
import './style.css';

function SideBar() {
    const [current, setCurrent] = useState("");
    const location = useLocation();

    const tabNames = [
        { name: "Cuenta", icon: <UserOutlined /> },
        { name: "Espacios", icon: <HomeOutlined /> },
        { name: "Dispositivos", icon: <DeploymentUnitOutlined /> },
        { name: "Cultivos", icon: <SunOutlined /> },
        { name: "Notificaciones", icon: <BellOutlined /> },
    ];

    const items = tabNames.map((tab, index) => ({
        key: index + 1,
        label: tab.name,
        icon: tab.icon,
        url: `/panel/${tab.name.toLowerCase()}`,
    }));

    useEffect(() => {
        // Sincroniza el estado 'current' con la ruta actual
        const currentItem = items.find(item => item.url === location.pathname);
        if (currentItem) {
            setCurrent(currentItem.key.toString());
        }
    }, [location.pathname]);

    return (
        <Menu className='side-bar'
            defaultSelectedKeys={[current]}
            mode="inline"
        >
            {
                items.map(item => (
                    <Menu.Item key={item.key} onClick={() => setCurrent(item.key)} style={{ color: '#fff' }}>
                        <Link to={item.url} className='side-bar-link'>
                            <span className="icon">{item.icon}</span> {/* Ícono */}
                            <span className="text">{item.label}</span> {/* Texto */}
                        </Link>
                    </Menu.Item>
                ))
            }
        </Menu>
    );
}

export default SideBar;