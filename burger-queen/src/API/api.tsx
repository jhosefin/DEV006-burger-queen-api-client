const BASE_URL = 'https://dev-006-burger-queen-api.vercel.app';
import { MyFormData } from '../components/Login/Login';

interface LoginResponse {
  accessToken: string;
}

interface UserData {
  role: string;
  // Puedes agregar más propiedades según los datos que necesitas obtener del usuario
}
interface User {
  _id: string;
  email: string;
  password: string;
  role: string;
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

export const getUsersData = async (accessToken: string): Promise<User[]> => {

  const headers = {
    'Authorization': `Bearer ${accessToken}`
  };

  const response = await fetch(`${BASE_URL}/users`, {
    method: 'GET',
    headers: headers
  });

  if (!response.ok) {
    throw new Error('Error al obtener los usuarios.');
  }

  const data = await response.json(); // Esperar a que se resuelva la promesa
  return data;
};

export const deleteProductData = async (accessToken: string, productId: string) => {
  const headers = {
    'Authorization': `Bearer ${accessToken}`
  };

  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: 'DELETE',
    headers: headers
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el producto.');
  }

  // No es necesario devolver datos si la eliminación fue exitosa.
};


export const createUser = async (accessToken: string, newUser: User): Promise<User> => {
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json', // Especifica el tipo de contenido
  };

  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(newUser), // Convierte el objeto newUser a una cadena JSON
  });

  if (!response.ok) {
    throw new Error('Error al crear un nuevo usuario.');
  }

  const data = await response.json(); // Esperar a que se resuelva la promesa
  return data;
};

export const createProduct = async (accessToken: string, newProduct: Product): Promise<Product> => {
  try {
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(newProduct),
    });

    if (!response.ok) {
      throw new Error('Error al crear un nuevo producto.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Manejo de errores
    console.error('Error en la función createProduct:', error);
    throw error; // Lanza el error nuevamente para que pueda ser manejado por el código que llama a esta función
  }
};