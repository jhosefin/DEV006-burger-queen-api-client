import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css'

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };
  return (
    <div className="d-flex align-items-center justify-content-center">
      <img src='./src/components/img/404.gif' alt="404" />
      <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
          <p className="lead">
              The page you’re looking for doesn’t exist.
            </p>
            <button onClick={handleGoHome}>Go Home</button>
      </div>
    </div>
  );
};

export default NotFound;