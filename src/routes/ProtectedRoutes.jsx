import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token'); 
    if (!token) { //cambiar a !token cuando se tenga el backen listo
        return <Navigate to="/ingresar" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;