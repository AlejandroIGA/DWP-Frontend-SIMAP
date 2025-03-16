import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layout/dashboardLayout/dashboardLayout';
import SideBar from '../../components/sideBar/sideBar';
import DashboardHeader from '../../components/dashboardHeader/dashboardHeader';
import './style.css'
import ProfileModal from './components/ProfileModal/ProfileModal';

function Profile(props) {

    const [accountInfo, setAccountInfo] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [accountToEdit, setAccountToEdit] = useState(null);

    let accountTest = [{
        name: "Alejandro Infante Galván Álvarez" ,
        email: "2022371049@uteq.edu.mx",
        phone: "1234567890",
        country: "MX",
        city: "Querétaro",
        id: 1,  
    }]

    async function getAccountInfo(user) {
    }


    async function handleSubmit(data) {
        console.log("HandleSubmit", data)
    }

    useEffect(() => {
        setAccountInfo(accountTest);
    }, []);

    return (
        <>
            <DashboardLayout
                header={<DashboardHeader />}
                nav={<SideBar></SideBar>}
                title={"Cuenta"}
                content={
                    <div className='profile'>
                    <button className='floating-button' onClick={() => {setIsModalOpen(true) ,setAccountToEdit(accountTest[0])}}>Modificar datos</button>
                    {accountInfo.length > 0 ? (
                        <>
                            <strong>Nombre:</strong> {accountInfo[0].name} <p></p>
                            <strong>Correo:</strong> {accountInfo[0].email} <p></p>
                            <strong>Teléfono:</strong> {accountInfo[0].phone} <p></p>
                            <strong>País:</strong> {accountInfo[0].country} <p></p>
                            <strong>Ciudad:</strong> {accountInfo[0].city} <p></p>
                        </>
                    ) : (
                        <p>Cargando información...</p>
                    )}
                </div>
                }
            >
            </DashboardLayout>
            <ProfileModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            accountToEdit={accountToEdit}
            setAccountToEdit={setAccountToEdit}
            onSubmit={handleSubmit}
            />
        </>
    );
}

export default Profile;