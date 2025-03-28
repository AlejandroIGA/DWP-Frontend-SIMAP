import React, { useState } from "react";
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, notification, Spin, Modal } from 'antd';
import authService from "../../../services/authService";
import { QRCodeSVG } from 'qrcode.react';
import avatar from '../../../assets/granjero.png'


function LoginForm() {
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [secretUrl, setSecretUrl] = useState('');
    const [token, setToken] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    const [code, setCode] = useState('');
    const [step, setStep] = useState('email');
    const [newPsw, setNewPsw] = useState('');


    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type, message) => {
        api[type]({
            description: message,
            placement: 'top',
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const handleCancel2 = () => {
        setIsModalOpen2(false);
    }

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await authService.login(values.email, values.password);
            setEmail(values.email);
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

    async function secureCodeForm(e) {
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

    async function pswRecovery(e) {
        e.preventDefault();
        //Enviar el código al correo del usuario
        if (step == 'email') {
            openNotification('info', "Se ha enviado un código a su correo");
            const response = await authService.sendCode(email);
            if (typeof response === "string") {
                openNotification('error', response);
            } else if (response?.data?.success) {
                setStep('code')
            } else {
                openNotification('error', response.response.data.msg);
            }
        }
        if (step == 'code') {
            const response = await authService.validateCode(email, code);
            if (typeof response === "string") {
                openNotification('error', response);
            } else if (response?.data?.success) {
                openNotification('success', response.data.msg);
                setStep('psw')
            } else {
                openNotification('error', response.response.data.msg);
            }
        }
        if (step == 'psw') {
            const response = await authService.updatePsw(email, newPsw);
            if (typeof response === "string") {
                openNotification('error', response);
            } else if (response?.data?.success) {
                openNotification('success', response.data.msg);
                setStep('email')
                setEmail('');
                setNewPsw('');
                setCode('');
                form2.resetFields();
                setIsModalOpen2(false)
            } else {
                openNotification('error', response.response.data.msg);
            }
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
                        <div className="circle">
                            <img src={avatar}></img>
                        </div>
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
                        <button style={{ margin: "0", background: "none" }} onClick={() => { setIsModalOpen2(true), setEmail(''), setCode(''), setNewPsw(''), setStep('email'), form2.resetFields() }}>
                            Recuperar contraseña
                        </button>

                    </div>
                )
            }
            <Modal
                title="MFA"
                open={isModalOpen}
                footer={[]}
                onCancel={handleCancel}
            >
                <form onSubmit={secureCodeForm} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p>Escanea el QR para obtener tu código de seguridad</p>
                    <p>Si ya tiene una instancia de esta aplicación registrada, debe borrarla y escanear nuevamente el código QR</p>
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
                        style={{ background: "#FFF", color: "#000", margin: '10px 0' }}

                    />
                    <Button
                        type="submit"
                        style={{margin: 0}}
                    >
                        Validar
                    </Button>
                </form>
            </Modal>
            <Modal
                title="Recuperación de contraseña"
                open={isModalOpen2}
                onCancel={handleCancel2}
                footer={[]}
                width={400}
                className="recovery-modal"
            >
                {/* Formulario de email */}
                <form
                    onSubmit={pswRecovery}
                    className={`step-form ${step === 'email' ? 'active' : ''}`}
                >
                    <label className="form-label">Ingresa tu correo</label>
                    <Input
                        disabled={!(step === 'email')}
                        required
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                    />
                    <Button
                        hidden={!(step === 'email')}
                        type="primary"
                        htmlType="submit"
                        style={{margin:"0"}}
                    >
                        Enviar
                    </Button>
                </form>

                {/* Formulario de código */}
                <form
                    onSubmit={pswRecovery}
                    className={`step-form ${step === 'code' ? 'active' : ''}`}
                >
                    <label className="form-label">Ingresa tu código de seguridad</label>
                    <Input
                        disabled={!(step === 'code')}
                        required
                        type="text"
                        name="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Código de verificación"
                    />
                    <Button
                        hidden={!(step === 'code')}
                        type="primary"
                        htmlType="submit"
                        style={{margin:"0"}}
                    >
                        Validar
                    </Button>
                </form>

                {/* Formulario de contraseña */}
                <Form
                    form={form}
                    className={`step-form ${step === 'psw' ? 'active' : ''}`}
                >
                    <label className="form-label">Ingresa tu nueva contraseña</label>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: "Ingrese una contraseña" },
                            { min: 10, message: "Debe tener una longitud minima de 10 caracteres" },
                            { max: 14, message: "Debe tener una longitud máxima de 14 caracteres" },
                            {
                                pattern: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                                message: 'La contraseña debe contener al menos una letra y un número',
                            },
                        ]}
                    >
                        <Input.Password
                            disabled={!(step === 'psw')}
                            onChange={(e) => setNewPsw(e.target.value)}
                            placeholder="Mínimo 10 caracteres"
                        />
                    </Form.Item>
                    <Button
                        hidden={!(step === 'psw')}
                        type="primary"
                        htmlType="submit"
                        onClick={pswRecovery}
                        style={{margin:"0"}}
                    >
                        Enviar
                    </Button>
                </Form>

                {/* Indicador de pasos */}
                <div className="step-indicator">
                    <div className={`step-dot ${step === 'email' ? 'active' : ''}`}></div>
                    <div className={`step-dot ${(step === 'code' || step === 'psw') ? 'active' : ''}`}></div>
                    <div className={`step-dot ${step === 'psw' ? 'active' : ''}`}></div>
                </div>
            </Modal>
        </>

    );

}

export default LoginForm;