import React, { use, useEffect, useState } from 'react';
import DashboardLayout from '../../layout/dashboardLayout/dashboardLayout';
import SideBar from '../../components/sideBar/sideBar';
import DashboardHeader from '../../components/dashboardHeader/dashboardHeader';
import NestedList from './components/nestedList/NestedList';
import './style.css'
import CropModal from './components/modal/CropModal';
import spaceService from '../../services/spaceService';

import { Select, notification, Spin } from 'antd';
import cropService from '../../services/cropService';

function Crops(props) {

    const [crops, setCrops] = useState([]);

    const [space, setSpace] = useState('');
    const [spaces, setSpaces] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cropToEdit, setCropToEdit] = useState(null);

    const [loading, setLoading] = useState(false);

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type, message) => {
        api[type]({
            description: message,
            placement: 'top',
        });
    };

    let user_id = localStorage.getItem('user_id');

    let cropTest = [{
        name: "cultivo 1",
        crop: "Jitomate",
        tempMin: 25,
        tempMax: 35,
        humMin: 40,
        humMax: 50,
        humFmin: 35,
        humFmax: 50,
        type: "Sombra",
        id: 1
    },
    {
        name: "cultivo 2",
        crop: "Lechuga",
        tempMin: 25,
        tempMax: 35,
        humMin: 40,
        humMax: 50,
        humFmin: 35,
        humFmax: 50,
        type: "Sombra",
        id: 2
    }]

    async function getSpaces(user_id) {
        setLoading(true);
        try {
            const response = await spaceService.get(user_id);
            if (typeof response === "string") {
                openNotification('error', response);
                setSpaces([]);
            } else if (response?.data?.data !== undefined) {
                setSpaces(response.data.data);
            } else {
                openNotification('error', response.response.data.msg);
                setSpaces([]);
            }
        } catch (error) {
            openNotification('error', "Error al obtener los espacios");
        } finally {
            setLoading(false);
        }
    }

    async function getCrops(user_id) {
        setLoading(true);
        try {
            const response = await cropService.get(user_id);
            if (typeof response === "string") {
                openNotification('error', response);
                setCrops([]);
            } else if (response?.data?.data !== undefined) {
                setCrops(response.data.data);
            } else {
                openNotification('error', response.response.data.msg);
                setCrops([]);
            }
        } catch (error) {
            openNotification('error', "Error al obtener los cultivos");
        } finally {
            setLoading(false);
        }
    }

    async function getCropsBySpace(e){
        const space = e;
        setLoading(true);
        try {
            const response = await cropService.getBySpace(user_id,space);
            if (typeof response === "string") {
                openNotification('error', response);
                setCrops([]);
            } else if (response?.data?.data !== undefined) {
                setCrops(response.data.data);
            } else {
                openNotification('error', response.response.data.msg);
                setCrops([]);
            }
        } catch (error) {
            openNotification('error', "Error al obtener los cultivos");
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(data) {
        setLoading(true);
        try {
            const response = cropToEdit
                ? await cropService.update(data.name, data.crop, data.tempMin, data.tempMax, data.humMin, data.humMax, data.humFmin, data.humFmax, data.type, data.space, data.id)
                : await cropService.add(data.name, data.crop, data.tempMin, data.tempMax, data.humMin, data.humMax, data.humFmin, data.humFmax, data.type, data.space, user_id);

            if (typeof response === "string") {
                openNotification('error', response);
            } else if (response?.data?.msg !== undefined) {
                await getCrops(user_id);
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

    function handleEdit(crop) {
        setCropToEdit(crop);
        setIsModalOpen(true);
    }

    async function handleDelete(id) {
        setLoading(true);
        try {
            const response = await cropService.delete(id);
            if (typeof response === "string") {
                openNotification('error', response);
            } else if (response?.data?.msg !== undefined) {
                await getCrops(user_id);
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
        getSpaces(user_id);
        getCrops(user_id);
    }, []);

    return (
        <>
            <DashboardLayout
                header={<DashboardHeader />}
                nav={<SideBar></SideBar>}
                title={<div>
                    Cultivos
                    <Select style={{ width: "300px", marginLeft: "20px" }} placeholder="Seleccione un espacio" onChange={getCropsBySpace}>
                        <Select.Option value="all">Todos los espacios</Select.Option>
                        {
                            spaces.map((space, index) => (
                                <Select.Option key={index} value={space.name}>{space.name}</Select.Option>
                            ))
                        }
                    </Select>
                </div>}
                content={
                    <>
                        {contextHolder}
                        {loading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                <Spin size="large" tip="Cargando..." fullscreen />
                            </div>
                        ) : (
                            crops.length === 0 ? (
                                <>
                                    <p style={{ color: '#000', marginLeft: '20px' }}>No hay cultivos registrados</p>
                                    <button className='floating-button' onClick={() => setIsModalOpen(true)}>Agregar cultivo</button>
                                </>
                            ) : (
                                <>
                                    <button className='floating-button' onClick={() => setIsModalOpen(true)}>Agregar cultivo</button>
                                    {crops.map((crop, index) => (
                                        <NestedList
                                            key={index}
                                            name={crop.name}
                                            space={crop.space}
                                            crop={crop.crop}
                                            tempMin={crop.tempMin}
                                            tempMax={crop.tempMax}
                                            humMin={crop.humMin}
                                            humMax={crop.humMax}
                                            humFmin={crop.humFmin}
                                            humFmax={crop.humFmax}
                                            type={crop.type}
                                            onEdit={() => handleEdit(crop)}
                                            onDelete={() => handleDelete(crop.id)}
                                        ></NestedList>
                                    ))}
                                </>
                            ))}
                    </>
                }
            >
            </DashboardLayout>
            <CropModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                cropToEdit={cropToEdit}
                setCropToEdit={setCropToEdit}
                onSubmit={handleSubmit}
                spaces={spaces}
            />
        </>
    );
}

export default Crops;