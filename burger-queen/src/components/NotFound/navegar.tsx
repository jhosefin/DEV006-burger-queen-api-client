import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navegar: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div>
      <button onClick={handleGoHome}>Go Home</button>
    </div>
  );
};

export default Navegar;