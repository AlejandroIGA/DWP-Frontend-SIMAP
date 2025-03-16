import React, { useEffect, useState } from 'react';
import './style.css'
import { Modal, Button, Form, Input, Select, InputNumber } from 'antd';

function CropModal({ isModalOpen, setIsModalOpen, onSubmit, cropToEdit, setCropToEdit, user}) {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields().then(values => {
            setIsModalOpen(false);
            setCropToEdit(null);
            onSubmit(values);
            form.resetFields();
        }).catch(errorInfo => {
            console.log('Validación fallida:', errorInfo);
        });
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setCropToEdit(null);
        form.resetFields();
    }

    useEffect(() => {
        if(cropToEdit){
            form.setFieldsValue({
                crop: cropToEdit.crop,
                tempMin: cropToEdit.tempMin,
                tempMax: cropToEdit.tempMax,
                humMin: cropToEdit.humMin,
                humMax: cropToEdit.humMax,
                humFmin: cropToEdit.humFmin,
                humFmax: cropToEdit.humFmax,
                type: cropToEdit.type,
                space: cropToEdit.space,
                id: cropToEdit.id,
                user: cropToEdit.user,
            });
        }
    }, [cropToEdit])

    return (
        <>
            <Modal title={cropToEdit != null ? "Editar cultivo" : "Agregar cultivo"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancelar</Button>,
                    <Button key="submit" onClick={handleOk}>
                        {cropToEdit ? "Actualizar" : "Crear"}
                    </Button>,
                ]}
            >
                <Form form={form}>
                    <Form.Item
                        label="Cultivo"
                        name="crop"
                        rules={[
                            { required: true, message: 'Ingrese el cultivo' },
                            { min: 5, message: 'Debe tener al menos 3 caracteres' },
                            { max: 30, message: 'No puede superar los 30 caracteres' },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Espacio" name="space">
                        <Select>
                            <Select.Option value="espacio1">espacio1</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Humead ambiente mínima"
                        name="humMin"
                        rules={[
                            {required: true, message: 'Ingrese un valor mínimo'},
                        ]}
                    >
                        <InputNumber
                            style={{width:"100%"}}
                            min="-100"
                            max="100"
                            step="0.00"
                            stringMode
                        />
                    </Form.Item>
                    <Form.Item
                        label="Humead ambiente máxima"
                        name="humMax"
                        rules={[
                            { required: true,message: 'Ingrese un valor máximo'},
                        ]}
                    >
                        <InputNumber
                            style={{width:"100%"}}
                            min="-100"
                            max="100"
                            step="0.00"
                            stringMode
                        />
                    </Form.Item>
                    <Form.Item
                        label="Humead suelo mínima"
                        name="humFmin"
                        rules={[
                            {required: true, message: 'Ingrese un valor mínimo'},
                        ]}
                    >
                        <InputNumber
                            style={{width:"100%"}}
                            min="-100"
                            max="100"
                            step="0.00"
                            stringMode
                        />
                    </Form.Item>
                    <Form.Item
                        label="Humead suelo máxima"
                        name="humFmax"
                        rules={[
                            { required: true,message: 'Ingrese un valor máximo'},
                        ]}
                    >
                        <InputNumber
                            style={{width:"100%"}}
                            min="-100"
                            max="100"
                            step="0.00"
                            stringMode
                        />
                    </Form.Item>
                    <Form.Item
                        label="Temperatura ambiente mínima"
                        name="tempMin"
                        rules={[
                            { required: true,message: 'Ingrese un valor mínimo'},
                        ]}
                    >
                        <InputNumber
                            style={{width:"100%"}}
                            min="-100"
                            max="100"
                            step="0.00"
                            stringMode
                        />
                    </Form.Item>
                    <Form.Item
                        label="Temperatura ambiente maxíma"
                        name="tempMin"
                        rules={[
                            { required: true,message: 'Ingrese un valor máximo'},
                        ]}
                    >
                        <InputNumber
                            style={{width:"100%"}}
                            min="-100"
                            max="100"
                            step="0.00"
                            stringMode
                        />
                    </Form.Item>
                    <Form.Item label="Tipo" name="type">
                        <Select>
                            <Select.Option value="sol">sol</Select.Option>
                            <Select.Option value="sombra">sombra</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>

            </Modal>
        </>
    );
}

export default CropModal;