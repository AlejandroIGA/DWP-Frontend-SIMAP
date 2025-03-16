import React, { useEffect } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';

function ProfileModal({ isModalOpen, setIsModalOpen, onSubmit, accountToEdit, setAccountToEdit }) {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields().then(values => {
            setIsModalOpen(false);
            onSubmit(values);
            form.resetFields();
        }).catch(errorInfo => {
            console.log('Validación fallida:', errorInfo);
        });
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    }



    useEffect(() => {
        if (accountToEdit) {
            form.setFieldsValue({
                name: accountToEdit.name,
                phone: accountToEdit.phone,
                city: accountToEdit.city,
                country: accountToEdit.country,
                email: accountToEdit.email,
            });
        }
    }, [accountToEdit])

    return (
        <>
            <Modal title={accountToEdit != null ? "Editar Perfil" : "Agregar espacio"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancelar</Button>,
                    <Button key="submit" onClick={handleOk}>
                        {accountToEdit ? "Actualizar" : "Crear"}
                    </Button>,
                ]}
            >
                <Form form={form}>
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
                </Form>

            </Modal>
        </>
    );
}

export default ProfileModal;