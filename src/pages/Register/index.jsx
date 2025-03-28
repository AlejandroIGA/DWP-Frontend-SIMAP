import React, { useEffect } from 'react';
import RegisterForm from './components/RegisterForm';
import './style.css'
import { useNavigate } from 'react-router-dom';

function Register(props) {
    const navigate = useNavigate();
        useEffect(()=>{
            if(localStorage.getItem('user_id')){
                navigate('/panel/espacios')
            }
        },[])
    return (
        <div className='form-container'>
            <RegisterForm></RegisterForm>
        </div>
    );
}

export default Register;