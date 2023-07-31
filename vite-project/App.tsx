import React from 'react';
import ReactDOM from 'react-dom/client'
import Login from './src/components/Login/Login'
import './src/index.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Waiter from './src/components/Waiter/Waiter';
import Admin from './src/components/Admin/Admin'

/* ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
) */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to='/'>Inicio</Link> {/* Enlace a la página de inicio (Login) */}
        <Link to='/waiter'>Waiter</Link> {/* Enlace a la página de Waiter */}
      </div>
      <Routes> {/* Wrapper que contiene todos los componentes Route */}
        <Route path="/" element={<Login />} /> {/* Página de inicio (Login) */}
        <Route path="/waiter" element={<Waiter />} /> {/* Página de Waiter */}
        <Route path="/admin" element={<Admin />} /> {/* Página de Waiter */}
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