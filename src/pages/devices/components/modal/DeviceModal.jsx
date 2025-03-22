import React, { useEffect, useState } from 'react';
import './style.css'
import { Modal, Button, Form, Input, Select } from 'antd';
import cropService from '../../../../services/cropService';

function DeviceModal({ isModalOpen, setIsModalOpen, onSubmit, deviceToEdit, setDeviceToEdit }) {
    const [form] = Form.useForm();
    const [crops, setCrops] = useState([]);
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [typeSelected, setTypeSelected] = useState(null);

    const user_id = localStorage.getItem('user_id');

    async function getCrops(user_id) {
        try {
            const response = await cropService.get(user_id);
            if (typeof response === "string") {
                setCrops([]);
            } else if (response?.data?.data !== undefined) {
                setCrops(response.data.data);
            } else {
                setCrops([]);
            }
        } catch (error) {
            setCrops([]);
        }
    }

    function autoComplete(selectedCropName) {
        const crop = crops.find(crop => crop.name === selectedCropName); // Buscar el objeto crop
        setSelectedCrop(selectedCropName);
        if (crop) {
            if(form.getFieldValue('type') == "Temperatura"){
                form.setFieldsValue({
                    min: crop.tempMin,
                    max: crop.tempMax
                })
            }else if(form.getFieldValue('type') == "HumedadAmbiente"){
                form.setFieldsValue({
                    min: crop.humMin,
                    max: crop.humMax
                })
            }else if(form.getFieldValue('type') == "HumedadSuelo"){
                form.setFieldsValue({
                    min: crop.humFmin,
                    max: crop.humFmax
                })
            }
        }
    }
    
    const handleOk = () => {
        form.validateFields().then(values => {
            setIsModalOpen(false);
            setDeviceToEdit(null);
            onSubmit(values);
            form.resetFields();
            setSelectedCrop(null);
            setTypeSelected(null);
        }).catch(errorInfo => {
            console.log('Validación fallida:', errorInfo);
        });
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setDeviceToEdit(null);
        form.resetFields();
    }

    useEffect(()=>{
        autoComplete(selectedCrop);
    }, [typeSelected])

    useEffect(() => {
        getCrops(user_id);
        if (deviceToEdit) {
            setSelectedCrop(deviceToEdit.crop);
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
                        label="id"
                        name="id"
                        hidden
                    >
                    </Form.Item>
                    <Form.Item
                        label="Nombre"
                        name="name"
                        rules={[
                            { required: true, message: 'Ingrese un nombre para el dispositivo' },
                            { min: 5, message: 'El nombre debe tener al menos 3 caracteres' },
                            { max: 20, message: 'El nombre no puede superar los 50 caracteres' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Tipo" name="type" rules={[
                        {
                            required: true,
                            message: 'Seleccione un tipo de dispositivo'
                        }
                    ]}>
                        <Select onChange={(e)=>setTypeSelected(e)}>
                            <Select.Option value="Temperatura">Temperatura</Select.Option>
                            <Select.Option value="HumedadSuelo">Humedad del suelo</Select.Option>
                            <Select.Option value="HumedadAmbiente">Humedad ambiente</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Cultivo" name="crop" rules={[
                        {
                            required: true,
                            message: 'Seleccione un cultivo'
                        }
                    ]}>
                        <Select onChange={autoComplete}>
                            {
                                crops.map((crop, index)=>(
                                    <Select.Option key={index} value={crop.name}>{crop.name}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Valor mínimo"
                        name="min"
                        rules={[
                            { required: true, message: 'Ingrese un valor mínimo de operación' },
                            { pattern: /^[0-9]+$/, message: 'Solo se permiten números' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Valor máximo"
                        name="max"
                        rules={[
                            { required: true, message: 'Ingrese un valor máximo de operación' },
                            { pattern: /^[0-9]+$/, message: 'Solo se permiten números' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>

            </Modal>
        </>
    );
}

export default DeviceModal;