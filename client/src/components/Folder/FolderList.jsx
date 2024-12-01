import axios from 'axios';
import { useEffect, useState } from 'react';
import CreateFolder from './CreateFolder';
import { Link } from 'react-router-dom';

const FolderList = () => {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFolders = async () => {
        try {
            const response = await axios.get('http://localhost:3000/folder', {
                withCredentials: true,
            });
            setFolders(response.data.folders);
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFolders();
    }, []);

    const handleFolderCreated = (folder) => {
        setFolders((prevFolders) => [...prevFolders, folder]);
    };

    if (loading) return <p>Loading folders...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Your Folders</h1>
            <CreateFolder onFolderCreated={handleFolderCreated} />
            <ul>
                {folders.map((folder) => (
                    <li key={folder.id}>
                        <Link to={`/folders/${folder.id}`}>{folder.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FolderList;
