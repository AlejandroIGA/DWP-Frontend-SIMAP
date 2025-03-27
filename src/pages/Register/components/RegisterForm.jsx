import React, { useState } from "react";
import { Button, Form, Input, Select, notification, Spin } from 'antd';
import './style.css'
import { Link } from "react-router-dom";
import authService from "../../../services/authService";
import avatar from '../../../assets/granjero.png'


function RegisterForm() {

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
            const response = await authService.register(values.name, values.phone, values.city, values.country, values.email, values.password);
            console.log(response);
            if (typeof response === "string") {
                openNotification('error', response);
            } else if (response?.data?.msg !== undefined) {
                openNotification('success', response.data.msg);
                form.resetFields();
            } else {
                openNotification('error', response.response.data.msg);
            }
        } catch (error) {
            console.log("catch")
            openNotification('error', "Error al conectar cone le servidor");
        } finally {
            setLoading(false);
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
                        <div className="circle">
                            <img src={avatar}></img>
                        </div>
                        <h2 style={{ color: "white" }}>Registrarse</h2>
                        <Form onFinish={handleSubmit} form={form}>
                            <Form.Item
                                name="name"
                                rules={[
                                    { required: true, message: 'Ingrese su nombre completo' },
                                    { min: 10, message: "Debe tener una longitud minima de 10 caracteres" },
                                    { max: 50, message: "Debe tener una longitud máxima de 14 caracteres" }
                                ]}
                            >
                                <Input placeholder="Ingrese su nombre completo" />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                rules={[
                                    { required: true, message: 'Ingrese su número de teléfono' },
                                    { min: 10, message: "Debe tener una longitud minima de 10 caracteres" },
                                    { max: 13, message: "Debe tener una longitud máxima de 14 caracteres" },
                                    { pattern: /^\d+$/, message: "Solo puede contener numeros" }
                                ]}
                            >
                                <Input placeholder="Ingrese su número de teléfono" />
                            </Form.Item>
                            <Form.Item
                                name="country"
                                rules={[
                                    { required: true, message: 'Ingrese su país' },
                                ]}
                            >
                                <Select
                                    placeholder="Seleccione un país"
                                    allowClear
                                >
                                    <Option value="MX">MX</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="city"
                                rules={[
                                    { required: true, message: 'Ingrese su estado' },
                                ]}
                            >
                                <Select
                                    placeholder="Seleccione un estado"
                                    allowClear
                                >
                                    <Option value="Querétaro">Querétaro</Option>
                                    <Option value="Sonora">Sonora</Option>
                                    <Option value="Durango">Durango</Option>
                                    <Option value="Guadalajara">Guadalajara</Option>
                                    <Option value="Oaxaca">Oaxaca</Option>
                                    <Option value="Yucatán">Yucatán</Option>

                                </Select>
                            </Form.Item>
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
                                    { min: 8, message: "Debe tener una longitud minima de 10 caracteres" },
                                    { max: 14, message: "Debe tener una longitud máxima de 14 caracteres" },
                                    {
                                        pattern: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                                        message: 'La contraseña debe contener al menos una letra y un número',
                                    },
                                ]}
                            >
                                <Input.Password placeholder="Ingrese una contraseña" />
                            </Form.Item>
                            <Form.Item label={null}>
                                <Button htmlType="submit">
                                    Registrarse
                                </Button>
                            </Form.Item>
                        </Form>
                        <Link to="/ingresar">Iniciar sesión</Link>
                    </div>
                )
            }
        </>
    );

}

export default RegisterForm;