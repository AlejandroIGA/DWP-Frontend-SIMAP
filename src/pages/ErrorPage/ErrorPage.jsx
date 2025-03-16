import React from 'react';
import NavBar from '../../components/navBar/NavBar';
import Footer from '../../components/footer/Footer'
import LandingLayout from '../../layout/landingLayout/LandingLayout';
import errorImg from '../../assets/plantando (2).png'
import './style.css'

function ErrorPage(props) {
    return (
        <LandingLayout
            nav={<NavBar></NavBar>}
            content={
                <div style={{marginTop:"50px", padding:"0"}} className='error-container'>
                <img src={errorImg} style={{width:"256px", height:"256px"}}></img>
                <div className='error-data'>
                    <h2>¡Ups! Nos perdimos en el campo...</h2>
                    <p>Mientras tanto, ve pensando en tu próximo proyecto agricola.</p>
                    <p>¡Que aquí las ideas siempre germinan!</p>
                </div>
                    
                </div>
            }
            footer={<Footer></Footer>}
        >

        </LandingLayout>
    );
}

export default ErrorPage;