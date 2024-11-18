import axios from 'axios';
import { useState } from 'react';

const CreateFolder = ({ onFolderCreated }) => {
    const [folderName, setFolderName] = useState('');
    const [error, setError] = useState(null);

    const handleFolderCreation = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3000/folder',
                { name: folderName },
                { withCredentials: true }
            );
            onFolderCreated(response.data.folder);
            setFolderName('');
        } catch (error) {
            console.error(error);
            setError('Error creating folder');
        }
    };

    return (
        <div>
            <h2>Create New Folder</h2>
            {error && <p>{error}</p>}
            <input
                type="text"
                placeholder="Folder Name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
            />
            <button onClick={handleFolderCreation}>Create Folder</button>
        </div>
    );
};

export default CreateFolder;
