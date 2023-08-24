import React from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';
import logo from '../../assets/logo.png'
import cancel from '../img/Cancel.png'

interface HeaderProps {
  userRole: string;
  username: string;
  userImage: string; // Nueva prop para la imagen del usuario
}

const Header: React.FC<HeaderProps> = ({ username, userImage, userRole }) => {
    const navigate = useNavigate();

const handleLogout = () => {
localStorage.removeItem('accessToken');
    navigate('/');
};

return (
<div className='componente-name'>
    <img src={userImage} alt='user' className='roleimg'></img>
    <h1>{username} {userRole}</h1>
    <img src={logo} alt='logo' className='logo'></img>
    <button className="logout-button" onClick={handleLogout}>
        <img src={cancel} alt="Exit" />
        <span>Exit</span>
    </button>
</div>
);
};

export default Header;