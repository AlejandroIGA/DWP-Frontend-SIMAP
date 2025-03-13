import React from 'react';
import NavBar from '../../components/navBar/NavBar';
import Footer from '../../components/footer/Footer'
import LandingLayout from '../../layout/landingLayout/LandingLayout';
import './style.css'

function ServicesPage(props) {
    return (
        <LandingLayout
            nav={<NavBar></NavBar>}
            content={
                <div style={{margin:"0", padding:"0"}}>
                    <h2>Servicios</h2>
                    <div>
                        <div className='test'>
                            <div className='info-image'>

                            </div>
                            <div className='info-data'>
                                <h3>Titulo</h3>
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
                        <div className='test'>
                            <div className='info-image'>

                            </div>
                            <div className='info-data'>
                                <h3>Titulo</h3>
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
                        
                    </div>
                </div>

            }
            footer={<Footer></Footer>}
        >

        </LandingLayout>
    );
}

export default ServicesPage;