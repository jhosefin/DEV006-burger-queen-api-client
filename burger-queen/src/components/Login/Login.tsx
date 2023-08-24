import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, getUserData } from '../../API/api';
import './Login.css'

/* import burger from '../img/Cheeseburger.png' */

export interface MyFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {

  const [formData, setFormData] = useState<MyFormData>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
  
    try {
      if (!formData.email || !formData.password) {
        setError('Por favor ingresa tus Datos.');
        return;
      }
  
      const loginResponse = await login(formData);
      const userData = await getUserData(formData.email, loginResponse.accessToken);
      console.log(loginResponse, userData)
      if (userData.role === 'admin') {
        navigate('/admin', { state: { email: formData.email } });
      } else if (userData.role === 'waiter') {
        navigate('/waiter', { state: { email: formData.email } });
      } else if (userData.role === 'chef') {
        navigate('/chef', { state: { email: formData.email } });
      }
  
      // Restableciendo el formulario después de la respuesta exitosa
      setFormData({
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Email or password incorrects.');
    }
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => {
    // Actualizar la fecha actual cuando el componente se monte
    setToday(new Date());
  }, []);

  return (
    <div className='login'>
      <img src='./src/assets/logo.png' className='logo'></img>
      <form onSubmit={handleSubmit}>
      <h1>Welcome</h1>
    {error && <p className='error'>{error}</p>}
    <div className="form-group">
    <label htmlFor="email">Email:</label>
    <input
      type="email"
      id="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
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
        required
      />
    </div>
      
      <button type="submit">Login</button>
    </form>
    <section className='fecha'>
        <img src='./src/components/img/Cheeseburger.png' alt="logo"/>
        {today && <h2 className='today'>{today.toDateString()}</h2>}
      </section>
  </div>
  );
};

export default Login;