import { render } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa Router para envolver el componente
import Waiter from '../components/Waiter/Waiter';

describe('Login Component', () => {

    test('renders login form', () => {
        // Crea una historia de navegación en memoria
        render(
            <BrowserRouter>
            <Routes>
                <Route path="/waiter" element={<Waiter />} />
            </Routes>
            </BrowserRouter>
        );
        
    });
});