/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../../api';

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await api.get('/auth/me');
                if (res.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch {
                setIsAuthenticated(false); 
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) return <p>Loading...</p>;

    if (!isAuthenticated) return <Navigate to="/signin" />;

    return children;
};

export default PrivateRoute;
