import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/auth/me',
                    {
                        withCredentials: true,
                    }
                );
                setUser(response.data.user);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Welcome, {user.username}</h1>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default Dashboard;
