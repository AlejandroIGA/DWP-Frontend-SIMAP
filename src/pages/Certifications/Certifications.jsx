import React from 'react';
import NavBar from '../../components/navBar/NavBar';
import Footer from '../../components/footer/Footer'
import LandingLayout from '../../layout/landingLayout/LandingLayout';
import ISO9001 from '../../assets/ISO9001.png';
import ISO14001 from '../../assets/ISO14001.png';
import ISO27001 from '../../assets/ISO27001.png';
import './style.css'

function Certifications(props) {
    return (
        <LandingLayout
            nav={<NavBar></NavBar>}
            content={
                <div style={{margin:"0", padding:"0"}}>
                    <h2>Certificaciones</h2>
                    <div>
                        <div className='test'>
                            <div className='info-image'>
                                <img src={ISO9001}></img>
                            </div>
                            <div className='info-data'>
                                <h3>ISO9001</h3>
                                <p>
                                Es una norma de gestión de calidad que establece requisitos para optimizar procesos, mejorar la satisfacción del cliente y aumentar la eficiencia operativa. Se basa en un enfoque de mejora continua y gestión por procesos. Su certificación demuestra compromiso con la calidad y la excelencia empresarial.
                                </p>
                            </div>
                        </div>
                        <div className='test'>
                            <div className='info-image'>
                                <img src={ISO27001}></img>
                            </div>
                            <div className='info-data'>
                                <h3>ISO27001</h3>
                                <p>
                                Se enfoca en la gestión de seguridad de la información, estableciendo controles para proteger datos sensibles contra amenazas. Incluye evaluación de riesgos, implementación de medidas de seguridad y mejora continua. Su certificación garantiza la confidencialidad, integridad y disponibilidad de la información.
                                </p>
                            </div>
                        </div>
                        <div className='test'>
                            <div className='info-image'>
                                <img src={ISO14001}></img>
                            </div>
                            <div className='info-data'>
                                <h3>ISO14001</h3>
                                <p>
                                Regula la gestión ambiental en organizaciones, promoviendo prácticas sostenibles y la reducción del impacto ecológico. Incluye identificación y control de riesgos ambientales, cumplimiento normativo y mejora continua. Su certificación demuestra compromiso con la sostenibilidad y responsabilidad ambiental.
                                </p>
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

export default Certifications;