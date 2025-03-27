// src/routes/AppRoutes.js
import React from 'react';
import { useRoutes } from 'react-router-dom';
import Devices from '../pages/devices';
import Spaces from '../pages/spaces';
import Home from '../pages/Home/Home';
import ServicesPage from '../pages/ServicesPage/ServicesPage';
import Certifications from '../pages/Certifications/Certifications';
import Contact from '../pages/Contact/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Crops from '../pages/Crops';
import Notifications from '../pages/Notifications';
import Profile from '../pages/Profile';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import ProtectedRoute from './ProtectedRoutes'; // Asegúrate de que la ruta de importación sea correcta

const AppRoutes = () => {
    let routes = useRoutes([
        { path: '/', element: <Home /> },
        { path: '/servicios', element: <ServicesPage /> },
        { path: '/contacto', element: <Contact /> },
        { path: '/ingresar', element: <Login /> },
        { path: '/registrarse', element: <Register /> },
        { path: '/certificaciones', element: <Certifications /> },
        {
            element: <ProtectedRoute />, // Protege todas las rutas dentro de este bloque
            children: [
                { path: '/panel/dispositivos', element: <Devices /> },
                { path: '/panel/espacios', element: <Spaces /> },
                { path: '/panel/cultivos', element: <Crops /> },
                { path: '/panel/notificaciones', element: <Notifications /> },
                { path: '/panel/cuenta', element: <Profile /> },
            ],
        },
        { path: '*', element: <ErrorPage /> },
    ]);

    return routes;
};

export default AppRoutes;