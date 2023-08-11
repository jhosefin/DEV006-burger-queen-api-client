import React from 'react';
import admin from '../img/Admin.png'
import { useLocation } from 'react-router-dom';
const Admin: React.FC = () => {
    const location = useLocation();
    const email = location.state?.email || '';
    const username = email.split('@')[0]; // Obtiene la parte antes del símbolo "@"
    const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
    return(
        <div>
            <div className='componente-name'>
                <img src={admin} alt='Admin'></img>
                <h6>{capitalizedUsername} Admin</h6>
            </div>
            <h2> Vista de Admin </h2>
        </div>
    );
};
export default Admin;