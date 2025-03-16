import React, { use, useEffect, useState } from 'react';
import DashboardLayout from '../../layout/dashboardLayout/dashboardLayout';
import SideBar from '../../components/sideBar/sideBar';
import DashboardHeader from '../../components/dashboardHeader/dashboardHeader';
import NestedList from './components/nestedList/NestedList';
import './style.css'
import CropModal from './components/modal/CropModal';
import { Select } from 'antd';

function Crops(props) {

    const [crops, setCrops] = useState([]);
    const [space, setSpace] = useState('');
    const [user, setUser] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cropToEdit, setCropToEdit] = useState(null);

    let cropTest = [{
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

    async function getDevices(user) {
        const data = await deviceService.get(user)
        setDevices(data)
    }

    async function handleSubmit(data) {
        console.log("HandleSubmit", data)
    }

    function handleEdit(crop) {
        setCropToEdit(crop);
        setIsModalOpen(true);
    }

    function handleDelete(id) {
        console.log(id)
    }

    useEffect(() => {
        //getDevices(user)
        setCrops(cropTest)
    }, []);

    return (
        <>
            <DashboardLayout
                header={<DashboardHeader />}
                nav={<SideBar></SideBar>}
                title={<div>
                    Cultivos
                    <Select style={{width:"300px", marginLeft:"20px"}} placeholder="Seleccione un espacio" onChange={(e)=> setSpace(e.target.value)}>
                        <Select.Option value="espacio1">espacio 1</Select.Option>
                        <Select.Option value="todos">Todos</Select.Option>
                    </Select>
                </div>}
                content={
                    <>
                        {crops.length === 0 ? (
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
                        )}
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
            />
        </>
    );
}

export default Crops;