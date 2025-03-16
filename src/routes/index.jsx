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

const AppRoutes = () => {
    let routes = useRoutes([
        {path:'/', element:<Home></Home> },
        {path:'/servicios', element:<ServicesPage></ServicesPage>},
        {path:'/contacto', element:<Contact></Contact>},
        {path:'/ingresar', element:<Login></Login>},
        {path:'/registrarse',element:<Register></Register>},
        {path: '/certificaciones', element:<Certifications></Certifications>},
        {path: '/panel/dispositivos', element:<Devices></Devices>},
        {path:'/panel/espacios', element:<Spaces></Spaces>},
        {path: "/panel/cultivos", element: <Crops></Crops>},
        {path: "/panel/notificaciones", element:<Notifications></Notifications>},
        {path: "/panel/cuenta", element: <Profile></Profile>},
        {path: "/error", element:<ErrorPage></ErrorPage>}
    ]);
    
    return routes;
}

export default AppRoutes;
