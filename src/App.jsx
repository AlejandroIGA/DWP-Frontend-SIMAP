import './App.css'
import {ConfigProvider} from 'antd'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

function App() {

  return (
    <ConfigProvider
  >
   
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  </ConfigProvider>
  )
}

export default App
