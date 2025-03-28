import React from 'react';
import NavBar from '../../components/navBar/NavBar';
import Footer from '../../components/footer/Footer'
import LandingLayout from '../../layout/landingLayout/LandingLayout';
import sensores from '../../assets/medida.png'
import './style.css'

function ServicesPage(props) {
    return (
        <LandingLayout
            nav={<NavBar></NavBar>}
            content={
                <div style={{ margin: "0", padding: "0" }}>
                    <h2>Servicios</h2>
                    <div>
                        <div className='test'>
                            <div className='info-image' style={{background:"#FFF"}}>
                                <img src={sensores}></img>
                            </div>
                            <div className='info-data'>
                                <h3>Sensado</h3>
                                <p>
                                    En <strong>SIMPA</strong>, llevamos la agricultura de precisión al siguiente nivel con nuestro servicio integral de sensado. Instalamos y configuramos sensores de última generación en tus cultivos para que obtengas datos en tiempo real y tomes decisiones más inteligentes.
                                </p>
                                <p>
                                    <strong>¿Qué Ofrecemos?</strong>
                                </p>
                                <ul>
                                    <li>Instalación profesional de sensores para medir:</li>
                                    <ul>
                                        <li>Humedad y temperatura del suelo</li>
                                        <li>Condiciones climáticas (lluvia, viento, radiación solar)</li>
                                        <li>Salud vegetal (nutrientes, crecimiento)</li>
                                    </ul>
                                    <li>Configuración personalizada adaptada a tu tipo de cultivo y necesidades específicas.</li>
                                    <li>Integración con nuestra aplicación para visualizar y analizar los datos fácilmente desde tu celular o computadora.</li>
                                    <li>Soporte continuo para garantizar que el sistema funcione óptimamente.</li>
                                </ul>
                                <p>
                                    <strong>Beneficios Clave</strong>
                                </p>
                                <ul>
                                    <li>Ahorro de agua y recursos al regar y fertilizar solo donde y cuando se necesita.</li>
                                    <li>Mayor productividad al detectar problemas antes de que afecten tu cosecha.</li>
                                    <li>Monitoreo remoto para supervisar tus cultivos desde cualquier lugar.</li>
                                </ul>
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
export default ServicesPage;