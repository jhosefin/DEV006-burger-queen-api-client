import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import burger from '../img/Cheeseburger.png'


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

  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      if (!formData.email || !formData.password) {
        setError('Por favor ingresa tu correo electrónico y contraseña.');
        return;
      }
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
        setError('Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.');
      });


    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.');
    }
  };
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => {
    // Actualizar la fecha actual cuando el componente se monte
    setToday(new Date());
  }, []);
  return (
    <div className='login'>
      <section className='fecha'>
        <img src={burger} alt="logo"/>
        {today && <h3 className='today'>{today.toDateString()}</h3>}
      </section>
    <h2>Login</h2>
    {error && <p className='error'>{error}</p>}
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      
      <button type="submit">Login</button>
    </form>
  </div>
  );
};

export default Login;