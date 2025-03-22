import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layout/dashboardLayout/dashboardLayout';
import SideBar from '../../components/sideBar/sideBar';
import DashboardHeader from '../../components/dashboardHeader/dashboardHeader';
import Card from './components/card/Card';
import SpaceModal from './components/modal/SpaceModal';
import spaceService from '../../services/spaceService';
import {notification, Spin} from 'antd';


function Spaces(props) {

    const [spaces, setSpaces] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [spaceToEdit, setSpaceToEdit] = useState(null);

    const [loading, setLoading] = useState(false);

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type, message) => {
        api[type]({
          description: message,
          placement: 'top',
        });
      };

    let user_id = '85';

    async function getSpaces(user_id) {
        setLoading(true); 
        try {
            const response = await spaceService.get(user_id);
            if (typeof response === "string") {
                openNotification('error', response);
            } else if (response?.data?.data !== undefined) {
                setSpaces(response.data.data);
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
            const response = spaceToEdit
                ? await spaceService.update(data.name, data.id)
                : await spaceService.add(data.name, user_id);
    
            if (typeof response === "string") {
                openNotification('error', response);
            } else if (response?.data?.data !== undefined) {
                await getSpaces(user_id); 
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

    function handleEdit(device) {
        setSpaceToEdit(device);
        setIsModalOpen(true);
    }

    async function handleDelete(id) {
        setLoading(true);
        try {
            const response = await spaceService.delete(id);
            if (typeof response === "string") {
                openNotification('error', response);
            } else if (response?.data?.data !== undefined) {
                await getSpaces(user_id); 
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
        getSpaces(user_id)
    }, []);

    return (
        <>
            <DashboardLayout
                header={<DashboardHeader />}
                nav={<SideBar></SideBar>}
                title={"Espacios"}
                content={
                    <>
                        {contextHolder}
                        {loading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                <Spin size="large" tip="Cargando..." fullscreen/>
                            </div>
                        ) : (
                            <>
                                {spaces.length === 0 ? (
                                    <>
                                        <p style={{ color: '#000', marginLeft: '20px' }}>No hay espacios registrados</p>
                                        <button className='floating-button' onClick={() => setIsModalOpen(true)}>Agregar espacio</button>
                                    </>
                                 ) : (
                                    <>
                                        <button className='floating-button' onClick={() => setIsModalOpen(true)}>Agregar espacio</button>
                                        {spaces.map((item, index) => (
                                            <Card
                                                key={index}
                                                name={item.name}
                                                crops={item.members}
                                                onEdit={() => handleEdit(item)}
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
            <SpaceModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                spaceToEdit={spaceToEdit}
                setSpaceToEdit={setSpaceToEdit}
                onSubmit={handleSubmit}
            />
        </>
    );
}

export default Spaces;