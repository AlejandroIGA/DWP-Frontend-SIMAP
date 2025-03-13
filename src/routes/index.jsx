import React from 'react';
import { useRoutes } from 'react-router-dom';
import Devices from '../pages/devices';
import Spaces from '../pages/spaces';
import Home from '../pages/Home/Home';
import ServicesPage from '../pages/ServicesPage/ServicesPage';
import Certifications from '../pages/Certifications/Certifications';

const AppRoutes = () => {
    let routes = useRoutes([
        {path:'/', element:<Home></Home> },
        {path:'/servicios', element:<ServicesPage></ServicesPage>},
        {path: '/certificaciones', element:<Certifications></Certifications>},
        {path: '/panel/dispositivos', element:<Devices></Devices>},
        {path:'/panel/espacios', element:<Spaces></Spaces>}
    ]);
    
    return routes;
}

export default AppRoutes;
