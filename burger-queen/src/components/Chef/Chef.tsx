import React from 'react';
import chef from '../img/Chef.png'
import { useLocation } from 'react-router-dom';

const Chef: React.FC = () => {
    const location = useLocation();
    const email = location.state?.email || '';
    const username = email.split('@')[0]; // Obtiene la parte antes del símbolo "@"
    const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
    return(
        <div>
            <div className='componente-name'>
                <img src={chef} alt='Chef'></img>
                <h6>{capitalizedUsername} Chef</h6>
            </div>
            <h2 > Vista de Chef </h2>
        </div>
    );
};
export default Chef;