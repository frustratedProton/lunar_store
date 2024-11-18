import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(true);
    const [files, setFiles] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/files/all',
                    {
                        withCredentials: true,
                    }
                );
                setFiles(response.data.files || []);
            } catch (error) {
                console.error(error);
                setError(error);
            }
        };

        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/auth/me',
                    {
                        withCredentials: true,
                    }
                );
                setUser(response.data.user);
            } catch (error) {
                console.error(error);
                setError(error);
            }
        };

        fetchFiles();
        fetchUserDetails();
    }, [id]);

    // if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    console.log(files)
    return (
        <div>
            <h1>Welcome, {user?.username}</h1>
            <p>Email: {user?.email}</p>
            {files ? (
                <ul>
                    {files.map((file) => (
                        <li key={file.id}>
                            <Link to={`/files/${file.id}`}>{file.name}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading file details...</p>
            )}
        </div>
    );
};

export default Dashboard;
