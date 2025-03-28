import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layout/dashboardLayout/dashboardLayout';
import SideBar from '../../components/sideBar/sideBar';
import DashboardHeader from '../../components/dashboardHeader/dashboardHeader';
import './style.css'
import ProfileModal from './components/ProfileModal/ProfileModal';
import { notification, Spin } from 'antd';
import profileService from '../../services/profileService';

function Profile(props) {

    const [accountInfo, setAccountInfo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [accountToEdit, setAccountToEdit] = useState(null);

    const [loading, setLoading] = useState(false);

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type, message) => {
        api[type]({
            description: message,
            placement: 'top',
        });
    };

    let user_id = localStorage.getItem('user_id');

    async function getAccountInfo(user_id) {
        setLoading(true);
        try {
            const response = await profileService.get(user_id);
            if (typeof response === "string") {
                openNotification('error', response);
                setAccountInfo([]);
            } else if (response?.data?.data !== undefined) {
                setAccountInfo(response.data.data);
                localStorage.setItem('state', response.data.data.city)
                console.log(localStorage.getItem('state'));
            } else {
                openNotification('error', response.response.data.msg);
                setAccountInfo([]);
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
            const response = await profileService.update(data.name, data.phone, data.city, data.country, data.email,user_id);
            if (typeof response === "string") {
                openNotification('error', response);
                setAccountInfo([]);
            } else if (response?.data?.msg !== undefined) {
                getAccountInfo(user_id)
            } else {
                openNotification('error', response.response.data.msg);
                setAccountInfo([]);
            }
        } catch (error) {
            openNotification('error', "Error al obtener los espacios");
        } finally {
            setLoading(false);
        }
    }

    function updateData(){
        const accountCopy = {...accountInfo};
        setAccountToEdit(accountCopy);
        setIsModalOpen(true);
    }

    useEffect(() => {
        getAccountInfo(user_id)
    }, []);

    return (
        <>
            <DashboardLayout
                header={<DashboardHeader />}
                nav={<SideBar></SideBar>}
                title={"Cuenta"}
                content={
                    loading ?
                    <Spin size="large" tip="Cargando..." fullscreen/>
                    :
                    <div className='profile'>
                        {contextHolder}
                        <button className='floating-button' onClick={updateData}>Modificar datos</button>
                        {accountInfo != null ? (
                            <>
                                <strong>Nombre:</strong> {accountInfo.name} <p></p>
                                <strong>Correo:</strong> {accountInfo.email} <p></p>
                                <strong>Teléfono:</strong> {accountInfo.phone} <p></p>
                                <strong>País:</strong> {accountInfo.country} <p></p>
                                <strong>Ciudad:</strong> {accountInfo.city} <p></p>
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