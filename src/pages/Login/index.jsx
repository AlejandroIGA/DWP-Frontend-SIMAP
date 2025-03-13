import React from 'react';
import LoginForm from './component/LoginForm';
import './style.css'

function Login(props) {
    return (
        <div className='form-container'>
            <LoginForm></LoginForm>
        </div>
    );
}

export default Login;