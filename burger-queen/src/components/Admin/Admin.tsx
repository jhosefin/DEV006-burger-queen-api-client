import React, { useState, useEffect } from 'react';
import admin from '../img/Admin.png'
import Header from '../header/header';
import { getProductsData } from '../../API/api';
import { useLocation } from 'react-router-dom';
import './Admin.css'

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    type: string;
    dateEntry: string;
}

const Admin: React.FC = () => {
    const location = useLocation();
    const email = location.state?.email || '';
    const username = email.split('@')[0]; // Obtiene la parte antes del símbolo "@"
    const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);

    
    const [selectedView, setSelectedView] = useState<'products' | 'workers'>('products');
    const [products, setProducts] = useState<Product[]>([]);

    const handleMenuClick = (view: 'products' | 'workers') => {
        setSelectedView(view);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('aqui el token para productos',token)
        if (token) {
            // Obtén los productos utilizando el token
            getProductsData(token)
            .then((data) => {
                console.log(data)
                setProducts(data);
            })
            .catch((error) => {
                console.log(error,'aca es')
                console.error('Error al obtener los productos:', error);
            });
        }
    }, []);

    const handleEdit = () => {
        // Lógica para editar el producto
        console.log('editando')
    };

    const handleDelete = () => {
    // Lógica para eliminar el producto
    console.log('eliminando')
    };
    return(
        <div className='container'>
            <Header username={capitalizedUsername} userImage={admin} userRole='Admin' />

                 {/* Botones para vista de menu */}
            <div className="container text-center" id='menu'>
                <div className="col">
                    <button id='products' className={`menu-button ${selectedView === 'products' ? 'active' : ''}`} onClick={() => handleMenuClick('products')}>
                        Products
                    </button>
                </div>
                <div className="col">
                    <button id='workers' className={`menu-button ${selectedView === 'workers' ? 'active' : ''}`} onClick={() => handleMenuClick('workers')}>
                        Workers
                    </button>
                </div>
            </div>
                 {/* Final Botones para vista de menu */}

            <div className='container' id='contenedor-principal'>
                {/* tabla para ordenar el producto */}
            <div className="table-container">
                <table className="table-primary">
                    <thead>
                        <tr className='headertable'>
                            <th scope="col">Img</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id} className='bodytable'>
                                <td className='img-cell'><img className='imgproduct' src={product.image}/></td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.type}</td>
                                <td className='buttonProduct'>
                                    <button className="editButton" onClick={() => handleEdit()}>Edit</button>
                                    <button className="deleteButton" onClick={() => handleDelete()}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
};
export default Admin;