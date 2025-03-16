import React from 'react';
import RegisterForm from './components/RegisterForm';
import './style.css'

function Register(props) {
    return (
        <div className='form-container'>
            <RegisterForm></RegisterForm>
        </div>
    );
}

export default Register;