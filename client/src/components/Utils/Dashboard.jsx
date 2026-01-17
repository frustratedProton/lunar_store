import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
// import axios from 'axios';
import MainContent from './MainContent';
import api from '../../api';

const Dashboard = () => {
    const [error, setError] = useState(null);
    const [files, setFiles] = useState([]);
    const [folders, setFolders] = useState([]);
    const { searchQuery } = useOutletContext();

    useEffect(() => {
        const fetchFilesAndFolders = async () => {
            try {
                const fileResponse = await api.get('/files/all');
                const folderResponse = await api.get('/folder')

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
        fetchFilesAndFolders();
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
            filteredFiles={filteredFiles}
            filteredFolders={filteredFolders}
        />
    );
};

export default Dashboard;
