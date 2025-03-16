import React from 'react';
import './style.css'
import { Link } from 'react-router-dom';
import { FacebookFilled, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';

function Footer(props) {
    return (
        <div className='footer'>
            <div className='links'>
                <Link to="/servicios" >
                    <p>Servicios</p>
                </Link>
                <Link to="/certificaciones" >
                    <p>Certificaciones</p>
                </Link>
                <Link to="/contacto" >
                    <p>Contacto</p>
                </Link>
            </div>
            <div className='icons-container'>
                <p>Redes sociales</p>
                <div className='icons'>
                <FacebookFilled style={{marginRight:"20px", fontSize:"64px"}} />
                <InstagramOutlined style={{marginRight:"20px", fontSize:"64px"}}/>
                <LinkedinOutlined style={{marginRight:"20px", fontSize:"64px"}}/>
                </div>
            </div>
        </div>
    );
}

export default Footer;