import React from 'react';
import { useRoutes } from 'react-router-dom';
import Devices from '../pages/devices';
import Spaces from '../pages/spaces';
import Home from '../pages/landingPage/Home';

const AppRoutes = () => {
    let routes = useRoutes([
        {path:'/', element:<Home></Home> },
        {path: '/panel/dispositivos', element:<Devices></Devices>},
        {path:'/panel/espacios', element:<Spaces></Spaces>}
    ]);
    
    return routes;
}

export default AppRoutes;
