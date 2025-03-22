import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../layout/dashboardLayout/dashboardLayout';
import SideBar from '../../components/sideBar/sideBar';
import DashboardHeader from '../../components/dashboardHeader/dashboardHeader';
import NestedList from './components/nestedList/NestedList';
import deviceService from '../../services/deviceService';
import './style.css'
import DeviceModal from './components/modal/DeviceModal';
import {notification, Spin} from 'antd';

function Devices(props) {

    const [devices, setDevices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deviceToEdit, setDeviceToEdit] = useState(null);

    const [loading, setLoading] = useState(false);

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type, message) => {
        api[type]({
          description: message,
          placement: 'top',
        });
      };

    let user_id = '85';

    async function getDevices(user_id) {
        setLoading(true); 
        try {
            const response = await deviceService.get(user_id);
            if (typeof response === "string") {
                openNotification('error', response);
            } else if (response?.data?.data !== undefined) {
                setDevices(response.data.data);
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

    async function handleSubmit(data) {
        setLoading(true); 
        try {
            const response = deviceToEdit
                ? await deviceService.update(data.name, data.crop, data.min, data.max, data.type)
                : await deviceService.add(data.name, data.crop, data.min, data.max, user_id, data.type);
    
            if (typeof response === "string") {
                openNotification('error', response);
            } else if (response?.data?.data !== undefined) {
                await getDevices(user_id); 
                openNotification('success', response.data.msg);
            } else {
                openNotification('error', response.response.data.msg);
            }
        } catch (error) {
            openNotification('error', "Error al procesar la solicitud");
        } finally {
            setLoading(false); 
        }
    }

    function handleEdit(device){
        setDeviceToEdit(device);
        setIsModalOpen(true);
    }

    async function handleDelete(id) {
        setLoading(true);
        try {
            const response = await deviceService.delete(id);
            if (typeof response === "string") {
                openNotification('error', response);
            } else if (response?.data?.data !== undefined) {
                await getDevices(user_id); 
                openNotification('success', response.data.msg);
            } else {
                openNotification('error', response.response.data.msg);
            }
        } catch (error) {
            openNotification('error', "Error al eliminar el espacio");
        } finally {
            setLoading(false); 
        }
    }

    useEffect(() => {
        getDevices(user_id)
    }, []);

    return (
        <>
            <DashboardLayout
                header={<DashboardHeader />}
                nav={<SideBar></SideBar>}
                title={"Dispositivos"}
                content={
                    <>
                        {contextHolder}
                        {loading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                <Spin size="large" tip="Cargando..." fullscreen />
                            </div>
                        ) : devices.length === 0 ? (
                            <>
                                <p style={{ color: '#000', marginLeft: '20px' }}>No hay dispositivos registrados</p>
                                <button className='floating-button' onClick={() => setIsModalOpen(true)}>Agregar dispositivo</button>
                            </>
                        ) : (
                            <>
                                <button className='floating-button' onClick={() => setIsModalOpen(true)}>Agregar dispositivo</button>
                                {devices.map((device, index) => (
                                    <NestedList
                                        key={index}
                                        name={device.name}
                                        crop={device.crop}
                                        min={device.min}
                                        max={device.max}
                                        type={device.type}
                                        onEdit={() => handleEdit(device)}
                                        onDelete={() => handleDelete(device.id)}
                                    ></NestedList>
                                ))}
                            </>
                        )}
                    </>
                }
            />
            <DeviceModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                deviceToEdit={deviceToEdit}
                setDeviceToEdit={setDeviceToEdit}
                onSubmit={handleSubmit}
            />
        </>
    );
}

export default Devices;