import React from "react";
import { useState } from 'react'
import { Button, Form, Input, Select } from 'antd';
import './style.css'
import { Link } from "react-router-dom";

function RegisterForm() {

    const [form] = Form.useForm();

    const [mensaje, setMensaje] = useState("");
    const [mostrar, setMostrar] = useState(false);

    const handleSubmit = async (values) => {
        console.log(values);
        return false;
        fetch(`/register`, {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                user: values.user,
                psw: values.psw,
                email: values.email,
                rol: "Trabajador"
            })
        }).then(response => response.json())
            .then(data => {
                setMensaje(data.msg);
                setMostrar(true);
            });
    };

    return (
        <div className="form">
            <div className="circle"></div>
            <h2 style={{ color: "white" }}>Registrarse</h2>
            <Form onFinish={handleSubmit} form={form}>
                {
                    mostrar == true ? <p>{mensaje}</p> : <></>
                }
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
                        { required: true, message: 'Ingrese su número de teléfono' },
                    ]}
                >
                    <Select
                        placeholder="Seleccione una opción"
                        allowClear
                    >
                        <Option value="MX">MX</Option>
                        <Option value="US">US</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="city"
                    rules={[
                        { required: true, message: 'Ingrese su número de teléfono' },
                    ]}
                >
                    <Select
                        placeholder="Seleccione una opción"
                        allowClear
                    >
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
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
                    name="psw"
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
    );

}

export default RegisterForm;