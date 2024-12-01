import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const FolderDetails = () => {
    const { folderId } = useParams();
    const navigate = useNavigate();
    const [folder, setFolder] = useState(null);
    const [files, setFiles] = useState([]);
    const [newFile, setNewFile] = useState(null);
    const [newName, setNewName] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFolderDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/folder/${folderId}`,
                    { withCredentials: true }
                );

                setFolder(response.data.folder);
                setFiles(response.data.folder.files || []);
            } catch (err) {
                setError('Failed to fetch folder details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFolderDetails();
    }, [folderId]);

    const handleFileUpload = async () => {
        if (!newFile) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', newFile);

        try {
            const response = await axios.post(
                `http://localhost:3000/folders/${folderId}/upload`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                }
            );

            setFiles((prevFiles) => [...prevFiles, response.data.file]);
            setNewFile(null);
        } catch (err) {
            setError('Error uploading file.');
            console.error(err);
        }
    };

    const handleUpdateFolder = async () => {
        if (!newName.trim()) {
            alert('Please enter a new name for the folder.');
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:3000/folder/${folderId}`,
                { name: newName },
                { withCredentials: true }
            );

            setFolder(response.data);
            setNewName('');
        } catch (err) {
            setError('Error updating folder.');
            console.error(err);
        }
    };

    const handleDeleteFolder = async () => {
        try {
            await axios.delete(`http://localhost:3000/folder/${folderId}`, {
                withCredentials: true,
            });

            navigate('/'); // Redirect to the home page after deletion
        } catch (err) {
            setError('Error deleting folder.');
            console.error(err);
        }
    };

    if (loading) return <p>Loading folder details...</p>;
    if (error) return <p>{error}</p>;
    if (!folder) return <p>Folder not found.</p>;

    return (
        <div>
            <h1>{folder.name}</h1>
            <input
                type="file"
                onChange={(e) => setNewFile(e.target.files[0])}
            />
            <button onClick={handleFileUpload}>Upload File</button>

            <div>
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="New folder name"
                />
                <button onClick={handleUpdateFolder}>Update Folder</button>
                <button onClick={handleDeleteFolder}>Delete Folder</button>
            </div>

            <h2>Files</h2>
            <ul>
                {files.length > 0 ? (
                    files.map((file) => (
                        <li key={file.id}>
                            <Link to={`/files/${file.id}`}>{file.name}</Link>
                        </li>
                    ))
                ) : (
                    <p>No files in this folder.</p>
                )}
            </ul>
        </div>
    );
};

export default FolderDetails;
