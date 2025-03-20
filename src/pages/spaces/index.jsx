import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layout/dashboardLayout/dashboardLayout';
import SideBar from '../../components/sideBar/sideBar';
import DashboardHeader from '../../components/dashboardHeader/dashboardHeader';
import Card from './components/card/Card';
import SpaceModal from './components/modal/SpaceModal';
import spaceService from '../../services/spaceService';

function Spaces(props) {

    const [spaces, setSpaces] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [spaceToEdit, setSpaceToEdit] = useState(null);
    const [msg, setMsg] = useState('');

    let response = null;
    let user_id = 85;

    async function getSpaces(user_id) {
        response = await spaceService.get(user_id);
        if (typeof response == "string"){
            setMsg(response);
            console.log(response);
        }else{
            if(response?.data?.data !== undefined){
                setSpaces(response.data.data)
                setMsg(response.data.msg)
            }else{
                console.log(response.response.data.msg)
                setMsg(response.response.data.msg);
            }
        }
    }

    async function handleSubmit(data) {
        if(spaceToEdit == null){
            response = await spaceService.add(data.name, user_id);
        }else{
            response = await spaceService.update(data.name, data.id);
        }
        console.log(response);
        if (typeof response == "string"){
            setMsg(response);
            console.log(response);
        }else{
            if(response?.data?.msg !== undefined){
                setMsg(response.data.msg)
                getSpaces(user_id)
            }else{
                console.log(response.response.data.msg)
                setMsg(response.response.data.msg);
            }
        }
    }

    function handleEdit(device) {
        setSpaceToEdit(device);
        setIsModalOpen(true);
    }

    async function handleDelete (id) {
        response = await spaceService.delete(id);
        if (typeof response == "string"){
            setMsg(response);
            console.log(response);
        }else{
            if(response?.data?.msg !== undefined){
                setMsg(response.data.msg)
                getSpaces(user_id)
            }else{
                console.log(response.response.data.msg)
                setMsg(response.response.data.msg);
            }
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
                        {spaces.length == 0 ?
                            (
                                <>
                                    <p style={{ color: '#000', marginLeft: '20px' }}>No hay espacios registrados</p>
                                    <button className='floating-button' onClick={() => setIsModalOpen(true)}>Agregar dispositivo</button>
                                </>
                            )
                            :
                            (
                                <>
                                    <button className='floating-button' onClick={() => setIsModalOpen(true)}>Agregar dispositivo</button>
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

                }
            >
            </DashboardLayout>
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