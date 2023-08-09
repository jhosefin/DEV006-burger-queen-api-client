import React from 'react';
import ReactDOM from 'react-dom/client'
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

import NotFound from './src/components/NotFound/NotFound'
import Login from './src/components/Login/Login'
import Waiter from './src/components/Waiter/Waiter';
import Admin from './src/components/Admin/Admin'
import Chef from './src/components/Chef/Chef';
import './src/index.css'

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para verificar si el usuario está autenticado (puedes implementar tu lógica de autenticación aquí)
  const checkAuthentication = () => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  };

  // Llama a la función de verificación cuando se carga la aplicación
  useEffect(() => {
    checkAuthentication();
  }, []);

  // Componente de redirección para usuarios no autenticados
  const RedirectToLogin: React.FC = () => {
    const navigate = useNavigate();
  
    // Redirige a la página de inicio de sesión
    useEffect(() => {
      navigate('/');
    }, [navigate]);
  
    // No es necesario retornar nada en este componente, ya que la redirección se hace mediante el useEffect
    return null;
  };

  return (
    <BrowserRouter>
      <Routes> {/* Wrapper que contiene todos los componentes Route */}
        <Route path="/" element={<Login />}/>
        <Route path="/waiter" element={isAuthenticated ? <Waiter /> : <RedirectToLogin />} />
        <Route path="/admin" element={isAuthenticated ? <Admin /> : <RedirectToLogin />} />
        <Route path="/chef" element={isAuthenticated ? <Chef /> : <RedirectToLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement as HTMLElement).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
/* const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement  as HTMLElement);
root.render(<App />); */