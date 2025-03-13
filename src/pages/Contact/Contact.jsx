import React from 'react';
import LandingLayout from '../../layout/landingLayout/LandingLayout';
import NavBar from '../../components/navBar/NavBar';
import Footer from '../../components/footer/Footer';
import './style.css'
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

function Contact(props) {
    return (
        <LandingLayout
        nav = {<NavBar></NavBar>}
        content={
        <div>
            <h2>Contáctanos</h2>
            <div className='info'>
                <p>
                    Lorem ipsum dolor sit amet consectetur. Aliquet scelerisque lectus molestie massa mus orci risus porttit  massa mus orci risus porttit  massa mus orci risus porttit
                    Lorem ipsum dolor sit amet consectetur. Aliquet scelerisque lectus molestie massa mus orci risus porttit  massa mus orci risus porttit  massa mus orci risus porttit
                    Lorem ipsum dolor sit amet consectetur. Aliquet scelerisque lectus molestie massa mus orci risus porttit  massa mus orci risus porttit  massa mus orci risus porttit
                    Lorem ipsum dolor sit amet consectetur. Aliquet scelerisque lectus molestie massa mus orci risus porttit  massa mus orci risus porttit  massa mus orci risus porttit
                </p>
                <div className='info-card'>
                    <div className='image'>
                    <MailOutlined style={{fontSize:"64px"}}/>
                    </div>
                    <div className='data'>
                        <p>Correo:</p>
                        <p>correo@dominio.com</p>
                    </div>
                </div>
                <div className='info-card'>
                    <div className='image'>
                    <PhoneOutlined style={{fontSize:"64px"}} rotate={90}/>
                    </div>
                    <div className='data'>
                        <p>Teléfono:</p>
                        <p>(123)-456-7890</p>
                    </div>
                </div>
            </div>
        </div>
        }
        footer={<Footer></Footer>}
        >

        </LandingLayout>
    );
}

export default Contact;