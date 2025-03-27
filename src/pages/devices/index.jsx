import React, { useEffect, useState, useRef } from 'react';
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

    const [realTimeData, setRealTimeData] = useState(null); // Nuevo estado para datos en tiempo real
    const ws = useRef(null); // Referencia para el WebSocket

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type, message) => {
        api[type]({
          description: message,
          placement: 'top',
        });
      };

    let user_id = localStorage.getItem('user_id');

    // Función para conectar WebSocket
    const connectWebSocket = (deviceId) => {
        const wsUrl = import.meta.env.VITE_WS_URL

        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
            console.log('WebSocket conectado');
            openNotification("info", "Esperando datos de los sensores, esto puede demorar hasta 30s. \nPor temas prácticos solo se hace una simulación del primer sensor obtenido de la base de datos, los valores del sensor son refrescados cada 30s")
            ws.current.send(JSON.stringify({ 
                device_id: deviceId,
                user_id: localStorage.getItem('user_id')
            }));
        };

        ws.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setRealTimeData({
                value: data.value,
                id: data.device_id
            });
        };

        ws.current.onclose = () => {
            console.log('WebSocket desconectado');
        };
    };

    async function getDevices(user_id) {
        setLoading(true); 
        try {
            const response = await deviceService.get(user_id);
            if (typeof response === "string") {
                openNotification('error', response);
                setDevices([])
            } else if (response?.data?.data !== undefined) {
                setDevices(response.data.data);
                connectWebSocket(response.data.data[0].id)
                openNotification('success', response.data.msg);
            } else {
                openNotification('error', response.response.data.msg);
                setDevices([])
            }
        } catch (error) {
            console.log(error);
            openNotification('error', "Error al obtener los espacios");
            setDevices([])
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(data) {
        setLoading(true); 
        try {
            const response = deviceToEdit
                ? await deviceService.update(data.name, data.crop, data.min, data.max, data.id, data.type)
                : await deviceService.add(data.name, data.crop, data.min, data.max, user_id, data.type);
    
            if (typeof response === "string") {
                openNotification('error', response);
            } else if (response?.data?.msg !== undefined) {
                if(ws.current != null){
                    ws.current.close();
                }
                await getDevices(user_id); 
                openNotification('success', response.data.msg);
            } else {
                openNotification('error', response.response.data.msg);
            }
        } catch (error) {
            console.log(error);
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
            } else if (response?.data?.msg !== undefined) {
                ws.current.close();
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

    // Desconectar al desmontar el componente
    useEffect(() => {
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

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
                                        realTimeData = {index == 0 ? realTimeData?.value: null}
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