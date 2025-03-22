import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layout/dashboardLayout/dashboardLayout';
import SideBar from '../../components/sideBar/sideBar';
import DashboardHeader from '../../components/dashboardHeader/dashboardHeader';
import Card from './components/card/NotificationCard';
import { notification, Spin } from 'antd';
import notificationService from '../../services/notificationService';

function Notifications(props) {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type, message) => {
        api[type]({
            description: message,
            placement: 'top',
        });
    };

    let user_id = 85;

    async function getNotifications(user_id) {
        setLoading(true);
        try {
            const response = await notificationService.get(user_id);
            if (typeof response === "string") {
                openNotification('error', response);
            } else if (response?.data?.data !== undefined) {
                setNotifications(response.data.data);
                openNotification('success', response.data.msg);
            } else {
                openNotification('error', response.response.data.msg);
            }
        } catch (error) {
            openNotification('error', error.response.data.msg);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        setLoading(true);
        try {
            const response = await notificationService.delete(id);
            if (typeof response === "string") {
                openNotification('error', response);
            } else if (response?.data?.data !== undefined) {
                setNotifications(response.data.data);
                openNotification('success', response.data.msg);
            } else {
                openNotification('error', response.response.data.msg);
            }
        } catch (error) {
            openNotification('error', "Error al obtener los espacios");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getNotifications(user_id);
    }, []);

    return (
            <DashboardLayout
                header={<DashboardHeader />}
                nav={<SideBar></SideBar>}
                title={"Notificaciones"}
                content={
                    <>
                        {contextHolder}
                        {loading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                <Spin size="large" tip="Cargando..." fullscreen />
                            </div>
                        ) : (
                            <>
                                {notifications.length == 0 ?
                                    (
                                            <p style={{ color: '#000', marginLeft: '20px' }}>No hay notificaciones</p>
                                    )
                                    :
                                    (
                                        <>
                                            {notifications.map((item, index) => (
                                                <Card
                                                    key={index}
                                                    name={item.name}
                                                    date={item.date}
                                                    description={item.description}
                                                    onDelete={() => handleDelete(item.id)}
                                                ></Card>
                                            ))}
                                        </>
                                    )}
                            </>
                        )}
                    </>
                }
            />
    );
}

export default Notifications;