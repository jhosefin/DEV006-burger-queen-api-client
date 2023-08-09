import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa Router para envolver el componente
import Login from '../components/Login/Login';

describe('Login Component', () => {

  test('renders login form', () => {
    // Crea una historia de navegación en memoria

      render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      );
    
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
    
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
  });

  test('submits login form with valid data', async () => {
  
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByText(/login/i);
  
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
  
    fireEvent.click(loginButton);
  
    expect(window.location.pathname).toBe('/');
  });

/*   test('displays error message when form data is not entered', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );

    // Simula enviar el formulario sin ingresar datos
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    // Verifica que se muestra el mensaje de error
    const errorMessage = screen.queryByText((content) => {
      return content === 'Por favor ingresa tus Datos.';
    });
    expect(errorMessage).toBeInTheDocument();
  }); */
});