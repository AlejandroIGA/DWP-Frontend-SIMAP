import React from 'react';
import NavBar from '../../components/navBar/NavBar';
import Footer from '../../components/footer/Footer'
import LandingLayout from '../../layout/landingLayout/LandingLayout';
import homeImg from '../../assets/image.png'
import ISO9001 from '../../assets/ISO9001.png';
import ISO14001 from '../../assets/ISO14001.png';
import ISO27001 from '../../assets/ISO27001.png';
import './style.css'

function Home(props) {
    return (
        <LandingLayout
            nav={<NavBar></NavBar>}
            content={
                <div style={{ margin: "0", padding: "0" }}>
                    <div className='image-container'>
                        <img src={homeImg}></img>
                    </div>
                    <div className='row' style={{ margin: "0", padding: "0" }}>
                        <div className='izquierda'>
                            <div className='card-home'>
                                <h2>¿Quienes Somos?</h2>
                                <p>
                                    En <strong>SIMAP</strong>, fusionamos tecnología y agricultura para revolucionar el campo. Somos un equipo de expertos en agrotecnología, ingenieros y agrónomos apasionados por crear soluciones que hagan los cultivos más eficientes, sostenibles y rentables.
                                </p>
                                <p>
                                    Desarrollamos un sistema integral de monitoreo de cultivos que, mediante sensores inteligentes y análisis de datos en tiempo real, permite:
                                </p>
                                <ul>
                                    <li>
                                        Monitorear variables clave: humedad del suelo, temperatura, clima y salud de las plantas.
                                    </li>
                                    <li>
                                        Acceder a datos desde cualquier lugar con nuestra aplicación móvil/web, diseñada para agricultores modernos.
                                    </li>
                                    <li>
                                        Tomar decisiones basadas en datos para optimizar riego, fertilización y prevenir riesgos.
                                    </li>
                                </ul>
                            </div>
                            <div className='card-home'>
                                <h2>¿Por qué nosotros?</h2>
                                <ul>
                                    <li>
                                        Soluciones certificadas (ISO 9001, 27001, 14001) que garantizan calidad, seguridad y sostenibilidad.
                                    </li>
                                    <li>
                                        Tecnología adaptada a pequeños y grandes productores.
                                    </li>
                                    <li>
                                        Soporte personalizado para integrar innovación en tu campo.
                                    </li>
                                </ul>
                            </div>
                            <div className='card-home'>
                                <h2>Nuestro compromiso</h2>
                                <ul>
                                    <li>
                                    Tecnología confiable: respaldada por certificaciones de calidad y seguridad.
                                    </li>
                                    <li>
                                    Sostenibilidad: ayudamos a reducir el desperdicio de recursos y mejorar el rendimiento.
                                    </li>
                                    <li>
                                    Soporte continuo: acompañamos a los agricultores en cada etapa.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='derecha'>
                            <h2>Certificaciones</h2>
                            <div className='certificacion'> <img src={ISO9001}></img></div>
                            <div className='certificacion'> <img src={ISO27001}></img></div>
                            <div className='certificacion'> <img src={ISO14001}></img></div>
                        </div>
                    </div>
                </div>
            }
            footer={<Footer></Footer>}
        >

        </LandingLayout>
    );
}

export default Home;