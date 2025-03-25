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
            nav = {<NavBar></NavBar>}
            content={
            <div style={{margin:"0", padding:"0"}}>
                <div className='image-container'>
                    <img src={homeImg}></img>
                </div>
                <div className='row' style={{margin:"0", padding:"0"}}>
                    <div className='izquierda'>
                        <div className='card-home'>
                            <h2>¿Quienes Somos?</h2>
                            <p>
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                            </p>
                        </div>
                        <div className='card-home'>
                            <h2>¿Por qué nosotros?</h2>
                            <p>
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                            </p>
                        </div>
                        <div className='card-home'>
                            <h2>Extra Info</h2>
                            <p>
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                            </p>
                        </div>
                        <div className='card-home'>
                            <h2>Extra Info</h2>
                            <p>
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                                data data data data data data data data data data data
                            </p>
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