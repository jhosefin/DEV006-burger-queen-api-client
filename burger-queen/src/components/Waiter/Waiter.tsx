import React from 'react';
import './Waiter.css';

const Waiter: React.FC = () => {
    return(
        // Contenedor de la tabla para pedidos
        <div className="container">

     {/* Botones para vista de menu */}
            <div className="container text-center" id='menu'>
            <div className="row">
                <div className="col" id='breackfast'>
                Breakfast
                </div>
                <div className="col" id='lunch'>
                Lunch & Dinner
                </div>
            </div>
            </div>
    {/* Final Botones para vista de menu */}

    {/* Contenido de la parte izq. cards de productos */}
    <div className='container' id='contenedor-principal'>
        <section className='izquierda'>
            <h2> Name client__________</h2>
            <div className='cards-breakfast'>
                <div className="card">
                    <img src="..." className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                    </div>
                </div>
                <div className="card">
                    <img src="..." className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                    </div>
                </div>
            </div>
            <div className='cards-lunch'>
            <div className="card">
                    <img src="..." className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                    </div>
                </div>
                <div className="card">
                    <img src="..." className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                    </div>
                </div>
            </div>
            </section>
            {/* Fin del Contenido de la parte izq. cards de productos */}

            {/* Contenido de la parte Derecha tabla d einformación */}
            <section className='derecha'>
                <h2>ORDER</h2>
                <h3>nombre</h3>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Cant.</th>
                <th scope="col">Product</th>
                <th scope="col">Cost.</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">Delete</th>
                <td>2</td>
                <td>Café</td>
                <td>$2500</td>
                </tr>
                <tr>
                <th scope="row">Delete</th>
                <td>1</td>
                <td>Sandwich</td>
                <td>$5000</td>
                </tr>
                <tr>
                <th scope="row">Delete</th>
                <td>1</td>
                <td>Jugo</td>
                <td>$1000</td>
                </tr>
            </tbody>
            </table>
            {/* Fin del Contenido de la parte Derecha tabla de información */}

            {/* Botones de parte derecha al final de la tabla */}
                <nav className='botones'>
                    <input type="radio" className="btn-check" name="options-outlined" id="success-outlined" autoComplete='off' checked={true}/>
                    <label className="btn btn-outline-success" /* for="success-outlined" */>Checked</label>
                    <input type="radio" className="btn-check" name="options-outlined" id="danger-outlined" autoComplete="off" checked={true}/>
                    <label className="btn btn-outline-danger" /* for="danger-outlined" */>Cancel</label>
                </nav>
                </section>
            </div>
        </div>
    );
};
export default Waiter;