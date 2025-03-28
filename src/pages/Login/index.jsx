import React, { useEffect } from 'react';
import LoginForm from './component/LoginForm';
import './style.css'
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('user_id')){
            navigate('/panel/espacios')
        }
    },[])
    return (
        <div className='form-container'>
            <LoginForm></LoginForm>
        </div>
    );
}

export default Login;