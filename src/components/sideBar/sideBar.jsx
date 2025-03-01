import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import './style.css'

function SideBar() {
    const [current, setCurrent] = useState("");
    const location = useLocation();

    const tabNames = ["Cuenta", "Espacios", "Dispositivos", "Cultivos", "Notificaciones"];
    const items = tabNames.map((tabName, index) => (
        {
            key: index + 1,
            label: tabName,
            url: `/panel/${tabName.toLowerCase()}`
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
        <Menu className='side-bar'
            defaultSelectedKeys={[current]}
            mode="inline"
        >
            {
                items.map(item => (
                    <Menu.Item key={item.key} onClick={() => setCurrent(item.key)} style={{color:'#fff'}}>
                        <Link to={item.url} className='side-bar-link'>{item.label}</Link>
                    </Menu.Item>
                ))
            }
        </Menu>
    );
}

export default SideBar;