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
                                <h3>Titulo</h3>
                                <p>
                                Lorem ipsum dolor sit amet consectetur. Aliquet scelerisque lectus molestie massa mus orci risus porttit massa mus orci risus porttit massa mus orci risus porttit Lorem ipsum dolor sit amet consectetur. 
                                Aliquet scelerisque lectus molestie massa mus orci risus porttit massa mus orci risus porttit massa mus orci risus porttit Lorem ipsum dolor sit amet consectetur. 
                                Aliquet scelerisque lectus molestie massa mus orci risus porttit massa mus orci risus porttit massa mus orci risus porttit Lorem ipsum dolor sit amet consectetur. 
                                Aliquet scelerisque lectus molestie massa mus orci risus porttit massa mus orci risus porttit massa mus orci risus porttit.
                                Aliquet scelerisque lectus molestie massa mus orci risus porttit massa mus orci risus porttit massa mus orci risus porttit.
                                Aliquet scelerisque lectus molestie massa mus orci risus porttit massa mus orci risus porttit massa mus orci risus porttit.
                                Aliquet scelerisque lectus molestie massa mus orci risus porttit massa mus orci risus porttit massa mus orci risus porttit.
                                </p>
                            </div>
                        </div>
                        <div className='test'>
                            <div className='info-image'>
                                <img src={ISO27001}></img>
                            </div>
                            <div className='info-data'>
                                <h3>Titulo</h3>
                                <p>
                                Lorem ipsum dolor sit amet consectetur. Aliquet scelerisque lectus molestie massa mus orci risus porttit massa mus orci risus porttit massa mus orci risus porttit Lorem ipsum dolor sit amet consectetur. 
                                Aliquet scelerisque lectus molestie massa mus orci risus porttit massa mus orci risus porttit massa mus orci risus porttit Lorem ipsum dolor sit amet consectetur. 
                                Aliquet scelerisque lectus molestie massa mus orci risus porttit massa mus orci risus porttit massa mus orci risus porttit Lorem ipsum dolor sit amet consectetur. 
                                Aliquet scelerisque lectus molestie massa mus orci risus porttit massa mus orci risus porttit massa mus orci risus porttit.
                                Aliquet scelerisque lectus molestie massa mus orci risus porttit massa mus orci risus porttit massa mus orci risus porttit.
                                Aliquet scelerisque lectus molestie massa mus orci risus porttit massa mus orci risus porttit massa mus orci risus porttit.
                                Aliquet scelerisque lectus molestie massa mus orci risus porttit massa mus orci risus porttit massa mus orci risus porttit.
                                </p>
                            </div>
                        </div>
                        <div className='test'>
                            <div className='info-image'>
                                <img src={ISO14001}></img>
                            </div>
                            <div className='info-data'>
                                <h3>Titulo</h3>
                                <p>
                                Lorem ipsum dolor sit amet consectetur. Aliquet scelerisque lectus molestie massa mus orci risus porttit massa mus orci risus porttit massa mus orci risus porttit Lorem ipsum dolor sit amet consectetur. 
                                Aliquet scelerisque lectus molestie massa mus orci risus porttit massa mus orci risus porttit massa mus orci risus porttit Lorem ipsum dolor sit amet consectetur. 
                                Aliquet scelerisque lectus molestie massa mus orci risus porttit massa mus orci risus porttit massa mus orci risus porttit Lorem ipsum dolor sit amet consectetur. 
                                Aliquet scelerisque lectus molestie massa mus orci risus porttit massa mus orci risus porttit massa mus orci risus porttit.
                                Aliquet scelerisque lectus molestie massa mus orci risus porttit massa mus orci risus porttit massa mus orci risus porttit.
                                Aliquet scelerisque lectus molestie massa mus orci risus porttit massa mus orci risus porttit massa mus orci risus porttit.
                                Aliquet scelerisque lectus molestie massa mus orci risus porttit massa mus orci risus porttit massa mus orci risus porttit.
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