import { Col, Row } from 'antd';
import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import './style.css';
import sun from '../../assets/sun.png';
import humidityIcon from '../../assets/humidity.png';
import precipitationIcon from '../../assets/precipitation.png';

function DashboardHeader({ temperature = "0.0", humidity = "0.0", precipitation = "0.0" }) {
    return (
        <Row className='header-dashboard'>
            <Col xs={24} sm={24} md={4} lg={4} xl={4} className='logo'>
                <h2>SIMAP</h2>
            </Col>
            <Col xs={24} sm={24} md={16} lg={16} xl={16} className='metrics'>
                <div className='metric'>
                    <img src={sun} alt="sun"></img><p>{temperature}°C</p>
                </div>
                <div className='metric'>
                    <img src={humidityIcon} alt="sun"></img><p>{humidity}%</p>
                </div>
                <div className='metric'>
                    <img src={precipitationIcon} alt="sun"></img><p>{precipitation}%</p>
                </div>
            </Col>
            <Col xs={24} sm={24} md={4} lg={4} xl={4} className='exit'>
                <a><LogoutOutlined /></a>
            </Col>
        </Row>
    );
}

export default DashboardHeader;