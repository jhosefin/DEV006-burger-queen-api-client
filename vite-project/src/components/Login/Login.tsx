import React, { useState, ChangeEvent, FormEvent } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';


interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Realizando la petición HTTP a la API
      const response = await fetch('https://dev-006-burger-queen-api.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Manejando el error si la petición no fue exitosa
        throw new Error('No se pudo iniciar sesión. Verifica tus credenciales.');
      }

      // Convirtiendo la respuesta a JSON
      const data = await response.json();
      console.log('Respuesta de la API:', data);

      // Restableciendo el formulario después de la respuesta exitosa
      setFormData({
        email: '',
        password: '',
      });

      const headers = {
        'Authorization': `Bearer ${data.accessToken}`
      };

      await fetch('https://dev-006-burger-queen-api.vercel.app/users/'+formData.email, {
        method: 'GET',
        headers: headers
      })
      .then(response => response.json())
      .then(data => {
        // Aquí obtengo los datos del usuario desde la respuesta de la API
        console.log('Datos del usuario:', data);
        if(data.role === 'admin'){
          navigate('/admin');
        }else if (data.role === 'waiter'){
          navigate('/waiter');
        }else if (data.role === 'chef'){
          navigate('/chef');
        }
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });


    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className='login'>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;