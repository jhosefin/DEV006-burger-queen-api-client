import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from '../components/NotFound/NotFound';

describe('NotFound Component', () => {
  test('displays the correct content', () => {
    render(
      <BrowserRouter>
      <Routes> {/* Wrapper que contiene todos los componentes Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    );

    // Verificar que se muestren los elementos de la página de error 404
    const imageElement = screen.getByAltText('404');
    const headingElement = screen.getByText('404');
    const pageNotFoundMessage = screen.getByText(/The page you’re looking for doesn’t exist./i);
    const goHomeButton = screen.getByRole('button', { name: /go home/i });

    // Verificar que los elementos tengan el contenido esperado
    expect(imageElement).toBeInTheDocument();
    expect(headingElement).toBeInTheDocument();
    expect(pageNotFoundMessage).toBeInTheDocument(); 
    expect(goHomeButton).toBeInTheDocument();
  });
});