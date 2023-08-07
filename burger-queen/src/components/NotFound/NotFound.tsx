import React from 'react';
import './NotFound.css'
import Navegar from './navegar'
const NotFound: React.FC = () => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <img src='./src/components/img/404.gif' alt="404" />
      <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
          <p className="lead">
              The page you’re looking for doesn’t exist.
            </p>
          <Navegar data-testid="navegar-component"/>
      </div>
    </div>
  );
};

export default NotFound;