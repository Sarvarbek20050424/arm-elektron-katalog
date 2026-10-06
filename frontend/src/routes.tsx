import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { CatalogPage } from './pages/CatalogPage';
import { BookPage } from './pages/BookPage';
import { CabinetPage } from './pages/CabinetPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { Layout } from './components/Layout';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <CatalogPage />,
          },
          {
            path: '/books/:id',
            element: <BookPage />,
          },
          {
            path: '/cabinet',
            element: <CabinetPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
