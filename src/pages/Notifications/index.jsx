import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layout/dashboardLayout/dashboardLayout';
import SideBar from '../../components/sideBar/sideBar';
import DashboardHeader from '../../components/dashboardHeader/dashboardHeader';
import Card from './components/card/NotificationCard';

function Notifications(props) {

    const [notifications, setNotifications] = useState([]);

    let notificationTest = [{
        name: "Temperatura baja",
        date: "15/03/2025",
        description: "La temperatura del cultivo x se encuentra por debajo de la temperatura mínima definida.",
        id: 1
    },
    {
        name: "Humedad alta",
        date: "15/03/2025",
        description: "La humedad del cultivo y se encuentra por encima de la humedad máxima definida.",
        id: 2
    }]

    async function getNotifications(user) {
    }

    function handleDelete(id) {
        console.log(id)
    }

    useEffect(() => {
        //getDevices(user)
        setNotifications(notificationTest)
    }, []);

    return (
        <>
            <DashboardLayout
                header={<DashboardHeader />}
                nav={<SideBar></SideBar>}
                title={"Notificaciones"}
                content={
                    <>
                        {notifications.length == 0 ?
                            (
                                <>
                                    <p style={{ color: '#000', marginLeft: '20px' }}>No hay notificaciones</p>
                                </>
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

                }
            >
            </DashboardLayout>

        </>
    );
}

export default Notifications;