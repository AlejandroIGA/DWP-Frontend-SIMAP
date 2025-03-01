import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../layout/dashboardLayout/dashboardLayout';
import SideBar from '../../components/sideBar/sideBar';
import DashboardHeader from '../../components/dashboardHeader/dashboardHeader';
import NestedList from './components/nestedList/NestedList';
import deviceService from '../../services/deviceService';
import './style.css'
import DeviceModal from './components/modal/DeviceModal';

function Devices(props) {

    const [devices, setDevices] = useState([]);
    const [user, setUser] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deviceToEdit, setDeviceToEdit] = useState(null);

    let deviceTest = [{
        name : "Dispositivo",
        crop : "Jitomate",
        min : 25,
        max: 35,
        type: "Temperatura",
        id : 1
    },
    {
        name : "Dispositivo 3",
        crop : "Lechuga",
        min : 40,
        max: 60,
        type: "Humedad",
        id: 2
    }]

    async function getDevices(user) {
        const data = await deviceService.get(user)
        setDevices(data)
    }

    async function handleSubmit(data){
        console.log("HandleSubmit",data)
    }

    function handleEdit(device){
        setDeviceToEdit(device);
        setIsModalOpen(true);
    }

    function handleDelete(id){
        console.log(id)
    }

    useEffect(() => {
        //getDevices(user)
        setDevices(deviceTest)
    }, []);

    return (
        <>
            <DashboardLayout
                header={<DashboardHeader />}
                nav={<SideBar></SideBar>}
                title={"Dispositivos"}
                content={
                    <>
                        {devices.length === 0 ? (
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
                                        onEdit={()=>handleEdit(device)}
                                        onDelete={()=>handleDelete(device.id)}
                                    ></NestedList>
                                ))}
                            </>
                        )}
                    </>
                }
            >
            </DashboardLayout>
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