import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from '../components/Home';
import BookDetail from '../components/BookDetail';
import Cart from '../components/Cart';
import { BookProvider } from '../contexts/BookContext';
import App from '../App';
import ProtectedRoute from '../utils/ProtectedRoute';
import AuthRoute from '../utils/AuthRoute';
import WishlistContainer from '../components/WishlistContainer';
import Auth from '../components/Auth';

const RoutingModule = () => {
    const route = createBrowserRouter([
        {
            path: '/',
            element: <Navigate to="/auth" replace />,
        },
        {
            path: '/auth',
            element: <ProtectedRoute element={<Auth />} />,
        },
        {
            path: '/dashboard',
            element: (
                <AuthRoute component={() => (
                    <BookProvider>
                        <App />
                    </BookProvider>
                )} />
            ),
            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: 'book/:id',
                    element: <BookDetail />
                },
                {
                    path: 'cart',
                    element: <Cart />
                },
                {
                    path: 'wishlist',
                    element: <WishlistContainer />
                }
            ]
        }
    ]);

    return (
        <RouterProvider router={route} />
    );
}

export default RoutingModule; 