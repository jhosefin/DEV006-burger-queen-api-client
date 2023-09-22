import React, { useState, useEffect, FormEvent } from 'react';
import admin from '../img/Admin.png'
import plus from '../img/Plus.png'
import Header from '../header/header';
import { getProductsData, getUsersData, deleteProductData, createUser, createProduct } from '../../API/api';
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
interface User {
    _id: string;
    email: string;
    password: string;
    role: string;
}

const Admin: React.FC = () => {
    const location = useLocation();
    const email = location.state?.email || '';
    const username = email.split('@')[0]; // Obtiene la parte antes del símbolo "@"
    const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);

    
    const [selectedView, setSelectedView] = useState<'products' | 'workers'>('products');
    const [products, setProducts] = useState<Product[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [isModalOpenAddProduct, setIsModalOpenAddProduct] = useState(false);
    const [productToDeleteId, setProductToDeleteId] = useState(''); // Estado para rastrear el ID del producto a eliminar
    const [newUser, setNewUser] = useState({
        _id: "",
        email: "",
        password: "",
        role: "",
    });
    const [newProduct, setNewProduct] = useState({
        _id: "",
        name: "",
        price: 0,
        image: "",
        type: "",
        dateEntry: "",
    });
      const modalDelete = (productId:string) => {
        setIsModalOpenDelete(true);
        setProductToDeleteId(productId);
      }
      const modalAddUser = () => {
        if(selectedView === 'products'){
            setIsModalOpenAddProduct(true);
            console.log("editando a los productos")
        }else{
            setIsModalOpenAdd(true);
            console.log("editando a los trabajadores")
        }
      }

      
      const closeConfirmationModal = () => {
        setIsModalOpenAdd(false);
        setIsModalOpenAddProduct(false);
        setIsModalOpenDelete(false);
        setProductToDeleteId('');
      };

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
            getUsersData(token)
            .then((datausers) => {
                console.log(datausers)
                setUsers(datausers);
            })
            .catch((error) => {
                console.log(error,'aca es')
                console.error('Error al obtener los productos:', error);
            });

        }
    }, []);
    const handleDelete = () => {
        // Elimina el producto de la base de datos utilizando el ID del producto
        const token = localStorage.getItem('token');
        if (token && productToDeleteId) {
            deleteProductData(token, productToDeleteId)
                .then(() => {
                    console.log('Producto eliminado');
                    // También puedes recargar la lista de productos aquí si es necesario
                    closeConfirmationModal(); // Cierra el modal después de la eliminación
                    const updatedProducts = products.filter(product => product._id !== productToDeleteId);
                    setProducts(updatedProducts);
                })
                .catch((error) => {
                    console.error('Error al eliminar el producto:', error);
                    closeConfirmationModal(); // Cierra el modal en caso de error
                });
        }
    };


    const handleAddProductClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Lógica para editar el producto
        console.log('añadir')
        const token = localStorage.getItem('token');
        if (token && newUser && selectedView === "workers") {
            console.log("en trabajadores")
            createUser(token, newUser)
                .then(() => {
                    console.log('Usuario creado',newUser);
                    closeConfirmationModal(); 
                    setNewUser(newUser);
/*                     const updatedUsers = users.filter(user => user._id !== newUser._id);
                    setUsers(updatedUsers); */
                })
                .catch((error) => {
                    console.error('Error a crear usuario:', error);
                    closeConfirmationModal(); // Cierra el modal en caso de error
                });
        }else if (token && newProduct && selectedView === "products"){
            console.log("en productos")
            createProduct(token, newProduct)
                .then(() => {
                    console.log('producto creado',newProduct);
                    closeConfirmationModal(); 
                    /* setNewProduct(newProduct); */
                    const updatedProducts = products.filter(product => product._id !== productToDeleteId);
                    setProducts(updatedProducts);
                })
                .catch((error) => {
                    console.error('Error a crear producto:', error);
                    closeConfirmationModal(); // Cierra el modal en caso de error
                });
        }
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
                <div className="col ml-auto"> {/* Utiliza 'ml-auto' para alinear a la derecha */}
                    <button className="add-product-button" onClick={modalAddUser}>
                        <img src={plus} alt="Add Product" />
                    </button>
                </div>
            </div>
                 {/* Final Botones para vista de menu */}

            <div className='container' id='contenedor-principaladmin'>
                {/* tabla para ordenar el producto */}
            {selectedView === 'products' && (
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
                        {products
                            .map(product => (
                            <tr key={product._id} className='bodytable'>
                                <td className='img-cell'><img className='imgproduct' src={product.image}/></td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.type}</td>
                                <td className='buttonProduct'>
                                    <button className="editButton">Edit</button>
                                    <button className="deleteButton" onClick={() =>modalDelete(product._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                )}
                {/* Trabajadores data */}
            {selectedView === 'workers' && (
            <div className="table-container">
                <table className="table-primary">
                    <thead>
                        <tr className='headertable'>
                            <th scope="col">Email</th>
                            <th scope="col">Password</th>
                            <th scope="col">Role</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users
                        .map(user => (
                        <tr key={user._id} className='bodytable'>
                            <td>{user.email}</td>
                            <td>XXXX</td>
                            <td>{user.role}</td>
                            <td className='buttonProduct'>
                                <button className="editButton" /* onClick={() => {
                                    setEditedUser({ ...user}); // Configuramos editedUser con los datos del usuario
                                    setIsModalOpenAdd(true); // Abrimos el modal de edición
                                    }} */>Edit</button>
                                <button className="deleteButton" onClick={() =>modalDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                )}
            </div>
            {isModalOpenAdd && (
                <div className="modal">
                <div className="modal-content">
                  <h2>Create User</h2>
                  <form onSubmit={handleAddProductClick}>
                  <label>Email:</label>
                    <input
                    type="text"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                    <label>Password:</label>
                    <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                    <label>Role:</label>
                    <input
                    type="text"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    />
                    <button type="submit">Create</button> {/* Cambia el texto del botón a "Create" */}
                    <button onClick={closeConfirmationModal}>Cancel</button>
                  </form>
                </div>
              </div>
            )}
            {isModalOpenAddProduct && (
                <div className="modal">
                <div className="modal-content">
                  <h2>Create Product</h2>
                  <form onSubmit={handleAddProductClick}>
                  <label>Img:</label>
                    <input
                    type="img"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    />
                    <label>Name:</label>
                    <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                    <label>Price:</label>
                    <input
                    type= "number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                    />
                    <label>Category:</label>
                    <input
                    type= "text"
                    value={newProduct.type}
                    onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                    />
                    <button type="submit">Create</button> {/* Cambia el texto del botón a "Create" */}
                    <button onClick={closeConfirmationModal}>Cancel</button>
                  </form>
                </div>
              </div>
            )}
            {isModalOpenDelete && (
                <div className="modal">
                <div className="modal-content">
                    <p>Are you sure you want to cancel the product?</p>
                    <button id='no' onClick={closeConfirmationModal}>No</button>
                    <button id='yes' onClick={handleDelete}>Yes, Cancel</button>
                </div>
                </div>
            )}
        </div>
    );
};
export default Admin;