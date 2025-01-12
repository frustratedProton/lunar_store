import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSyncAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
    FolderDetailsContainer,
    FolderTitle,
    FolderActions,
    FolderInput,
    FolderButton,
    FileList,
    FileListItem,
    NoFilesMessage,
    EditButton,
    ModalBackground,
    ModalContent,
    ModalButton,
} from '../styles/FolderDetails.styles';

const FolderDetails = () => {
    const { folderId } = useParams();
    const navigate = useNavigate();
    const [folder, setFolder] = useState(null);
    const [files, setFiles] = useState([]);
    const [newName, setNewName] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            setIsEditing(false);
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

            navigate('/');
        } catch (err) {
            setError('Error deleting folder.');
            console.error(err);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (loading) return <p>Loading folder details...</p>;
    if (error) return <p>{error}</p>;
    if (!folder) return <p>Folder not found.</p>;

    return (
        <FolderDetailsContainer>
            <FolderTitle>{folder.name}</FolderTitle>

            <div>
                <EditButton onClick={() => setIsEditing((prev) => !prev)}>
                    <FontAwesomeIcon icon={faPen} />
                    {isEditing ? 'Cancel Edit' : 'Edit Folder'}
                </EditButton>
            </div>

            {isEditing && (
                <FolderActions>
                    <FolderInput
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="New folder name"
                    />
                    <FolderButton
                        onClick={handleUpdateFolder}
                        disabled={!newName.trim()}
                    >
                        <FontAwesomeIcon icon={faSyncAlt} />
                        Update Folder
                    </FolderButton>
                    <FolderButton onClick={openModal}>
                        <FontAwesomeIcon icon={faTrash} />
                        Delete Folder
                    </FolderButton>
                </FolderActions>
            )}

            <h2>Files</h2>
            <FileList>
                {files.length > 0 ? (
                    files.map((file) => (
                        <FileListItem key={file.id}>
                            <Link to={`/files/${file.id}`}>{file.name}</Link>
                        </FileListItem>
                    ))
                ) : (
                    <NoFilesMessage>No files in this folder.</NoFilesMessage>
                )}
            </FileList>

            {isModalOpen && (
                <ModalBackground>
                    <ModalContent>
                        <h3>Are you sure you want to delete this folder?</h3>
                        <ModalButton onClick={handleDeleteFolder}>
                            Yes, Delete
                        </ModalButton>
                        <ModalButton onClick={closeModal}>Cancel</ModalButton>
                    </ModalContent>
                </ModalBackground>
            )}
        </FolderDetailsContainer>
    );
};

export default FolderDetails;
