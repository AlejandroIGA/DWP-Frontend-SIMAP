import { Col, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import './style.css';
import sun from '../../assets/sun.png';
import humidityIcon from '../../assets/humidity.png';
import precipitationIcon from '../../assets/precipitation.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DashboardHeader() {
    const navigate = useNavigate();
    const [temperature, setTemperature] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [precipitation, setPrecipitation] = useState(0);

    function logout(){
        localStorage.removeItem('user_id');
        localStorage.removeItem('token');
        navigate("/ingresar");
    }

    useEffect(() => {
        let timeoutId;
    
        const fetchWeatherWithDelay = async () => {
            await getWeather();
            timeoutId = setTimeout(fetchWeatherWithDelay, 90000);
        };
    
        fetchWeatherWithDelay(); 
    
        return () => clearTimeout(timeoutId); 
    }, []);

    async function getWeather(){
        const state = localStorage.getItem('state');
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
            );
            setTemperature(Math.round(response.data.main.temp));
            setHumidity(response.data.main.humidity);
            setPrecipitation(response.data.rain ? response.data.rain['1h'] || 0 : 0);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

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
                    <img src={humidityIcon} alt="humidity"></img><p>{humidity}%</p>
                </div>
                <div className='metric'>
                    <img src={precipitationIcon} alt="precipitation"></img><p>{precipitation}%</p>
                </div>
            </Col>
            <Col xs={24} sm={24} md={4} lg={4} xl={4} className='exit'>
                <button style={{background:"none"}} onClick={logout}><LogoutOutlined /></button>
            </Col>
        </Row>
    );
}

export default DashboardHeader;