import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import MainContent from './MainContent';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [files, setFiles] = useState([]);
    const [folders, setFolders] = useState([]);
    const { searchQuery } = useOutletContext();

    useEffect(() => {
        const fetchFilesAndFolders = async () => {
            try {
                const fileResponse = await axios.get(
                    'http://localhost:3000/files/all',
                    { withCredentials: true }
                );
                const folderResponse = await axios.get(
                    'http://localhost:3000/folder',
                    { withCredentials: true }
                );
                setFiles(fileResponse.data.files || []);
                setFolders(folderResponse.data.folders || []);
            } catch (error) {
                console.error(error);
                setError(
                    error.response?.data?.message ||
                        'An error occurred while fetching data.'
                );
            }
        };

        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/auth/me',
                    { withCredentials: true }
                );
                setUser(response.data.user);
            } catch (error) {
                console.error(error);
                setError(
                    error.response?.data?.message ||
                        'An error occurred while fetching user details.'
                );
            }
        };

        fetchFilesAndFolders();
        fetchUserDetails();
    }, []);

    const filteredFiles = files.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredFolders = folders.filter((folder) =>
        folder.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (error) return <p>{error}</p>;

    return (
        <MainContent
            user={user}
            filteredFiles={filteredFiles}
            filteredFolders={filteredFolders}
        />
    );
};

export default Dashboard;
