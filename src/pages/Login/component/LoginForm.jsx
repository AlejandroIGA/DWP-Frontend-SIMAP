import React from "react";
import { useState } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, notification, Spin, Modal } from 'antd';
import authService from "../../../services/authService";
import {QRCodeSVG} from 'qrcode.react';


function LoginForm() {
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [secretUrl, setSecretUrl] = useState('');
    const [token, setToken] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type, message) => {
        api[type]({
            description: message,
            placement: 'top',
        });
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await authService.login(values.email, values.password);
            setEmail(values.email);
            //console.log(response);
            if (typeof response === "string") {
                openNotification('error', response);
            } else if (response?.data?.msg !== undefined) {
                openNotification('success', response.data.msg);
                setSecretUrl(response.data.secret);
                form.resetFields();
                setIsModalOpen(true);
            } else {
                openNotification('error', response.response.data.msg);
            }
        } catch (error) {
            console.log(error)
            openNotification('error', "Error al conectar cone le servidor");
        } finally {
            setLoading(false);
        }
    };

    async function secureCodeForm(e){
        e.preventDefault();
        const response = await authService.verify(email, token)
        if (typeof response === "string") {
            openNotification('error', response);
        } else if (response?.data?.success) {
            setIsModalOpen(false);
            console.log(response);
            localStorage.setItem('user_id', response.data.user)
            localStorage.setItem('token', response.headers['token'])
            localStorage.setItem('state', response.data.state)
            setEmail('');
            setToken('');
            navigate("/panel/espacios");
        } else {
            openNotification('error', response.response.data.msg);
        }
    }

    return (
        <>
            {contextHolder}
            {
                loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <Spin size="large" tip="Cargando..." fullscreen />
                    </div>
                ) : (
                    <div className="form">
                        <div className="circle"></div>
                        <h2 style={{ color: "#FFF", fontSize: "32px" }}>Iniciar sesión</h2>
                        <Form onFinish={handleSubmit} form={form}>
                            <Form.Item
                                name="email"
                                rules={[
                                    { type: 'email', message: "Ingrese un correo válido" },
                                    { required: true, message: "Ingrese su correo" }
                                ]}
                            >
                                <Input placeholder="Ingrese su correo" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: 'Ingrese su contraseña' },
                                    { min: 10, message: "Debe tener una longitud minima de 10 caracteres" },
                                    { max: 14, message: "Debe tener una longitud máxima de 14 caracteres" },
                                    {
                                        pattern: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                                        message: 'La contraseña debe contener al menos una letra y un número',
                                    },
                                ]}
                            >
                                <Input.Password placeholder="Ingrese su contraseña" />
                            </Form.Item>
                            <Form.Item label={null}>
                                <Button htmlType="submit">
                                    Ingresar
                                </Button>
                            </Form.Item>
                        </Form>
                        <Link to="/registrarse">Crear una cuenta</Link>
                    </div>
                )
            }
            <Modal 
    title="MFA" 
    open={isModalOpen}
    footer={[]}
>
    <form onSubmit={secureCodeForm} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p>Escanea el QR para obtener tu código de seguridad</p>
        <div style={{ margin: '20px 0' }}>
            <QRCodeSVG value={secretUrl} />
        </div>
        <label>Ingresa tu código de seguridad</label>
        <input 
            required 
            type="text" 
            name="secureCode" 
            value={token} 
            onChange={(e) => setToken(e.target.value)} 
            style={{background: "#FFF", color: "#000", margin: '10px 0'}}
        />
        <button 
            type="submit" 
            style={{ 
                padding: '8px 16px', 
                background: '#1890ff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer',
                margin: 0
            }}
        >
            Validar
        </button>
    </form>
</Modal>
        </>

    );

}

export default LoginForm;