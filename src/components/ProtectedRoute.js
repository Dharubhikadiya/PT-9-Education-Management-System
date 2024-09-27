// src/components/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, role, ...rest }) => {
    const userRole = localStorage.getItem('userRole'); // Example for getting user role from localStorage

    return (
        <Route
            {...rest}
            element={userRole === role ? element : <Navigate to="/" />} // Redirect if role does not match
        />
    );
};

export default ProtectedRoute;
