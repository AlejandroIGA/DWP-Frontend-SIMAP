import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layout/dashboardLayout/dashboardLayout';
import SideBar from '../../components/sideBar/sideBar';
import DashboardHeader from '../../components/dashboardHeader/dashboardHeader';
import Card from './components/card/Card';
import SpaceModal from './components/modal/SpaceModal';
import spaceService from '../../services/spaceService';

function Spaces(props) {

    const [spaces, setSpaces] = useState([]);
    const [user, setUser] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [spaceToEdit, setSpaceToEdit] = useState(null);

    let response = null;

    let spaceTest = [{
        name: "Area 1",
        members: 2,
        id: 1
    },
    {
        name: "Area 2",
        members: 0,
        id: 2
    }]

    async function getSpaces(user) {
        
    }

    async function handleSubmit(data) {
        if(spaceToEdit == null){
            response = await spaceService.add(data.name);
        }else{
            response = await spaceService.update(data.name, data.id);
        }
        if(typeof response == "string"){
            console.log(response)
        }else{
            console.log(typeof response,response.data, response.msg);
        }
    }

    function handleEdit(device) {
        setSpaceToEdit(device);
        setIsModalOpen(true);
    }

    function handleDelete(id) {
        console.log(id)
    }

    useEffect(() => {
        //getDevices(user)
        setSpaces(spaceTest)
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