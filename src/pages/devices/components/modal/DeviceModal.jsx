import React, { useEffect, useState } from 'react';
import './style.css'
import { Modal, Button, Form, Input, Select } from 'antd';

function DeviceModal({ isModalOpen, setIsModalOpen, onSubmit, deviceToEdit, setDeviceToEdit, user}) {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields().then(values => {
            setIsModalOpen(false);
            setDeviceToEdit(null);
            onSubmit(values);
            form.resetFields();
        }).catch(errorInfo => {
            console.log('Validación fallida:', errorInfo);
        });
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setDeviceToEdit(null);
        form.resetFields();
    }

    useEffect(() => {
        if(deviceToEdit){
            form.setFieldsValue({
                name: deviceToEdit.name,
                min: deviceToEdit.min,
                max: deviceToEdit.max,
                crop: deviceToEdit.crop,
                type: deviceToEdit.type,
                id: deviceToEdit.id,
                user: deviceToEdit.user,
            });
        }
    }, [deviceToEdit])

    return (
        <>
            <Modal title={deviceToEdit != null ? "Editar dispositivo" : "Agregar dispostivo"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancelar</Button>,
                    <Button key="submit" onClick={handleOk}>
                        {deviceToEdit ? "Actualizar" : "Crear"}
                    </Button>,
                ]}
            >
                <Form form={form}>
                    <Form.Item
                        label="Nombre"
                        name="name"
                        rules={[
                            { required: true, message: 'Ingrese un nombre para el dispositivo' },
                            { min: 5, message: 'El nombre debe tener al menos 3 caracteres' },
                            { max: 20, message: 'El nombre no puede superar los 50 caracteres' },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Tipo" name="type" rules={[
                            {
                                required: true,
                                message: 'Seleccione un tipo de dispositivo'
                            }
                        ]}>
                        <Select>
                            <Select.Option value="Temperatura">Temperatura</Select.Option>
                            <Select.Option value="Humedad">Humedad</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Cultivo" name="crop" rules={[
                            {
                                required: true,
                                message: 'Seleccione un cultivo'
                            }
                        ]}>
                        <Select>
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Valor mínimo"
                        name="min"
                        rules={[
                            {required: true, message: 'Ingrese un valor mínimo de operación'},
                            { pattern: /^[0-9]+$/, message: 'Solo se permiten números' },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Valor máximo"
                        name="max"
                        rules={[
                            { required: true,message: 'Ingrese un valor máximo de operación'},
                            { pattern: /^[0-9]+$/, message: 'Solo se permiten números' },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>

            </Modal>
        </>
    );
}

export default DeviceModal;