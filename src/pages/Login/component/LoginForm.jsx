import React from "react";
import { useState } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, notification, Spin } from 'antd';
import authService from "../../../services/authService";


function LoginForm() {
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

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
            console.log(response);
            if (typeof response === "string") {
                openNotification('error', response);
            } else if (response?.data?.msg !== undefined) {
                openNotification('success', response.data.msg);
                //De momento en lo que se aplica multifactor
                localStorage.setItem('user_id', response.data.user)
                localStorage.setItem('token', response.headers['token'])
                form.resetFields();
            } else {
                openNotification('error', response.response.data.msg);
            }
        } catch (error) {
            console.log(error)
            openNotification('error', "Error al conectar cone le servidor");
        } finally {
            setLoading(false);
            navigate("/panel/espacios");
        }
    };

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
        </>

    );

}

export default LoginForm;