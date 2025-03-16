import React from 'react';
import { Col, Row } from 'antd';
import './style.css';

function DashboardLayout({ header, nav, content, title = "Prueba" }) {
    return (
        <div className='layout-container'>
            <Row>
                <Col span={24} className='header'>
                    {header}
                </Col>
                <Col xs={24} sm={24} md={4} lg={4} xl={4} className='nav'>
                    {nav}
                </Col>
                <Col xs={24} sm={24} md={20} lg={20} xl={20} className='content'>
                    <h2>{title}</h2>
                    {content}
                </Col>
            </Row>
        </div>
    );
}

export default DashboardLayout;