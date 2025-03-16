import React, { useEffect } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';

function SpaceModal({ isModalOpen, setIsModalOpen, onSubmit, spaceToEdit, setSpaceToEdit }) {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields().then(values => {
            setIsModalOpen(false);
            setSpaceToEdit(null);
            onSubmit(values);
            form.resetFields();
        }).catch(errorInfo => {
            console.log('Validación fallida:', errorInfo);
        });
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setSpaceToEdit(null);
        form.resetFields();
    }

    useEffect(() => {
        if (spaceToEdit) {
            form.setFieldsValue({
                name: spaceToEdit.name
            });
        }
    }, [spaceToEdit])

    return (
        <>
            <Modal title={spaceToEdit != null ? "Editar espacio" : "Agregar espacio"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancelar</Button>,
                    <Button key="submit" onClick={handleOk}>
                        {spaceToEdit ? "Actualizar" : "Crear"}
                    </Button>,
                ]}
            >
                <Form form={form}>
                    <Form.Item
                        label="Nombre"
                        name="name"
                        rules={[
                                { required: true, message: 'Ingrese un nombre para el espacio' },
                                { min: 3, message: 'El nombre debe tener al menos 5 caracteres' },
                                { max: 50, message: 'El nombre no puede superar los 20 caracteres' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>

            </Modal>
        </>
    );
}

export default SpaceModal;