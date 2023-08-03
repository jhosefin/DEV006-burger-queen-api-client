import React from 'react';
import ReactDOM from 'react-dom/client'
import Login from './src/components/Login/Login'
import './src/index.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Waiter from './src/components/Waiter/Waiter';
import Admin from './src/components/Admin/Admin'
import Chef from './src/components/Chef/Chef';
import { useEffect, useState } from 'react';
import NotFound from './src/components/NotFound/NotFound'


/* ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
) */

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para verificar si el usuario está autenticado (puedes implementar tu lógica de autenticación aquí)
  const checkAuthentication = () => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  };

  // Llama a la función de verificación cuando se carga la aplicación
  // (puedes llamar a esta función en otros lugares, por ejemplo, después de un inicio de sesión exitoso)
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
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);