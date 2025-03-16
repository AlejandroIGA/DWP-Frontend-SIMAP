import React from "react";
import { useState } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';


function LoginForm() {

    const [mensaje, setMensaje] = useState("");
    const [mostrar, setMostrar] = useState(false);

    const navigate = useNavigate();

    const [form] = Form.useForm();


    const handleSubmit = async (values) => {
        fetch(`/login`, {
            method: 'POST',
            mode: "cors",
            headers: {
                'user': values.user,
                'psw': values.psw
            },
        }).then(response => response.json())
            .then(data => {
                setMensaje(data.msg);
                setMostrar(true);
                if (data.msg == "Credenciales correctas") {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', data.user);
                    localStorage.setItem('rol', data.rol);
                    //console.log(localStorage.getItem('rol'))
                    navigate('/tablero');
                }
            });
    };

    return (
        <div className="form">
            <div className="circle"></div>
            <h2 style={{color:"#FFF",fontSize:"32px"}}>Iniciar sesión</h2>
            <Form onFinish={handleSubmit} form={form}>
                {
                    mostrar == true ? <p>{mensaje}</p> : <></>
                }
                <Form.Item
                    name="user"
                    rules={[
                        { required: true, message: 'Ingrese un nombre de usuario' },
                        { min: 10, message: "Debe tener una longitud minima de 10 caracteres" },
                        { max: 14, message: "Debe tener una longitud máxima de 14 caracteres" }
                    ]}
                >
                    <Input placeholder="Ingrese su usuario" />
                </Form.Item>

                <Form.Item
                    name="psw"
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
                    <Input.Password placeholder="Ingrese su contraseña"/>
                </Form.Item>
                <Form.Item label={null}>
                    <Button htmlType="submit">
                        Ingresar
                    </Button>
                </Form.Item>
            </Form>
            <Link to="/registrarse">Crear una cuenta</Link>
        </div>
    );

}

export default LoginForm;