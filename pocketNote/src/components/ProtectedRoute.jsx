import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth(); // Retrieve user info from context
    const navigate = useNavigate();

    useEffect(() => {
        // If user is not logged in, navigate to home page
        if (!user?.token) {
            navigate('/'); // Redirect to home or login page
        }
    }, [user, navigate]); // Dependency array to trigger when user or navigate changes

    // If user is not logged in, return null (to prevent rendering of children)
    if (!user?.token) {
        return null; // Prevent rendering of children while redirecting
    }

    // If user is logged in, render the children (protected component)
    return children;
};

export default ProtectedRoute;