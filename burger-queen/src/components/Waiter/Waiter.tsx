import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Waiter.css';
import remove from '../img/Remove.png'
import waiter from '../img/Waiter.png'
import { getProductsData } from '../../API/api';
import Header from '../header/header';

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    type: string;
    dateEntry: string;
}
interface OrderItem {
    product: Product;
    quantity: number;
}

const Waiter: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState('');
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const location = useLocation();
    const email = location.state?.email || '';
    const username = email.split('@')[0]; // Obtiene la parte antes del símbolo "@"
    const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);

    const openConfirmationModal = () => {
        setIsConfirmationModalOpen(true);
      };
      
      const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
      };

      const handleCancelOrder = () => {
        // Lógica para limpiar la orden
        setOrderItems([]);
        setName('');
        // Cierra el modal de confirmación
        closeConfirmationModal();
      };
    const addToOrder = (product: Product) => {
        const existingItem = orderItems.find(item => item.product._id === product._id);

        if (existingItem) {
            const updatedOrderItems = orderItems.map(item =>
            item.product._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            setOrderItems(updatedOrderItems);
        } else {
            const newOrderItem: OrderItem = { product, quantity: 1 };
            setOrderItems([...orderItems, newOrderItem]);
        }
    };

    const removeFromOrder = (index: number) => {
        const updatedOrderItems = orderItems.filter((_, i) => i !== index);
        setOrderItems(updatedOrderItems);
      };
/*     const handleProductAdd = (product: Product) => {
        setOrderItems((prevItems) => [...prevItems, { product, quantity: 1 }]);
    }; */
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleNameBlur = () => {
        setName(name);
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

    const [selectedView, setSelectedView] = useState<'breakfast' | 'lunch'>('breakfast');

    const handleMenuClick = (view: 'breakfast' | 'lunch') => {
        setSelectedView(view);
        setOrderItems([]);
        setName('');
    };

    return(
        // Contenedor de la tabla para pedidos
        <div className="container">
            <Header username={capitalizedUsername} userImage={waiter} userRole='Waiter' />
            
     {/* Botones para vista de menu */}
            <div className="container text-center" id='menu'>
                <div className="col">
                    <button id='breackfast' className={`menu-button ${selectedView === 'breakfast' ? 'active' : ''}`} onClick={() => handleMenuClick('breakfast')}>
                        Breakfast
                    </button>
                </div>
                <div className="col">
                    <button id='lunch' className={`menu-button ${selectedView === 'lunch' ? 'active' : ''}`} onClick={() => handleMenuClick('lunch')}>
                        Lunch & Dinner
                    </button>
                </div>
            </div>
    {/* Final Botones para vista de menu */}

    {/* Contenido de la parte izq. cards de productos */}
    <div className='container' id='contenedor-principal'>
        <section className='izquierda'>
            <h3>Name:</h3>
            <input
                type="text"
                value={name}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
                className='name-input'
                placeholder="Client"
            />
            {selectedView === 'breakfast' && (
            <div className='cards-breakfast'>
            {products
                    .filter(product => product.type === 'breakfast') // Filtra los productos de desayuno
                    .map((product) => (
                <div key={product._id} className="card" onClick={() => addToOrder(product)}>
                    <img src={product.image} className="card-img-top" alt={product.name} />
                    <div className="card-body">
                        <h6 className="card-title">{product.name}</h6>
                    </div>
                </div>
            ))}
            </div>)}
            {selectedView === 'lunch' && (
                <div className='cards-lunch'>
                    {products
                        .filter(product => product.type === 'lunch') // Filtra los productos de almuerzo
                        .map((product) => (
                            <div key={product._id} className="card" onClick={() => addToOrder(product)}>
                                <img src={product.image} className="card-img-top" alt={product.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                </div>
                            </div>
                    ))}
                </div>)}
            </section>
            {/* Fin del Contenido de la parte izq. cards de productos */}

            <div className='divider'></div> {/* Línea divisora */}

            {/* Contenido de la parte Derecha tabla d einformación */}
            <section className='derecha'>
                <h2>ORDER</h2>
                <h3>{name}</h3>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">Delete</th>
                <th scope="col">Cant.</th>
                <th scope="col">Product</th>
                <th scope="col">Cost.</th>
                </tr>
            </thead>
            <tbody>
            {orderItems.map((orderItem, index) => (
                <tr key={index}>
                    <td><img className='remove' src={remove} alt='remove' onClick={() => removeFromOrder(index)}/></td>
                    <td>{orderItem.quantity}</td>
                    <td>{orderItem.product.name}</td>
                    <td>${orderItem.product.price * orderItem.quantity}</td>
                </tr>
            ))}
             <tr>
                <td>Total: ${orderItems.reduce((total, orderItem) => total + orderItem.product.price * orderItem.quantity, 0)}</td>
            </tr>
            </tbody>
            </table>
            {/* Fin del Contenido de la parte Derecha tabla de información */}

            {/* Botones de parte derecha al final de la tabla */}
                <nav className='botones'>
                    <input type="radio" className="btn-check" name="options-outlined" id="danger-outlined" autoComplete="off" />
                    <label className="btn btn-outline-danger" /* for="danger-outlined" */ onClick={openConfirmationModal}>Cancel</label>
                    <input type="radio" className="btn-check" name="options-outlined" id="success-outlined" autoComplete='off' />
                    <label className="btn btn-outline-success" /* for="success-outlined" */>Send</label>
                </nav>
                {isConfirmationModalOpen && (
                    <div className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to cancel the order?</p>
                        <button id='no' onClick={closeConfirmationModal}>No</button>
                        <button id='yes' onClick={handleCancelOrder}>Yes, Cancel</button>
                    </div>
                    </div>
                )}
                </section>
            </div>
        </div>
    );
};
export default Waiter;