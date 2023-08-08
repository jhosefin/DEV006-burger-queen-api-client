const BASE_URL = 'https://dev-006-burger-queen-api.vercel.app';
import { MyFormData } from '../components/Login/Login';

interface LoginResponse {
  accessToken: string;
}

interface UserData {
  role: string;
  // Puedes agregar más propiedades según los datos que necesitas obtener del usuario
}

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  type: string;
  dateEntry: string;
}
export const login = async (formData: MyFormData): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('No se pudo iniciar sesión. Verifica tus credenciales.');
  }
  return response.json();
};

export const getUserData = async (email: string, accessToken: string): Promise<UserData> => {
  const headers = {
    'Authorization': `Bearer ${accessToken}`
  };

  const response = await fetch(`${BASE_URL}/users/${email}`, {
    method: 'GET',
    headers: headers
  });

  if (!response.ok) {
    throw new Error('Error al obtener los datos del usuario.');
  }
  return response.json();
};

export const getProductsData = async (accessToken: string): Promise<Product[]> => {

  const headers = {
    'Authorization': `Bearer ${accessToken}`
  };

  const response = await fetch(`${BASE_URL}/products`, {
    method: 'GET',
    headers: headers
  });

  if (!response.ok) {
    throw new Error('Error al obtener los productos.');
  }

  const data = await response.json(); // Esperar a que se resuelva la promesa
  return data;
};