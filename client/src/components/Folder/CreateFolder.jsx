/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import {
    ModalOverlay,
    ModalContent,
    InputField,
    ErrorText,
    UploadButton,
    CancelButton,
    ButtonContainer,
} from '../styles/UploadFile.styles';

const CreateFolderModal = ({ onClose, onFolderCreated }) => {
    const [folderName, setFolderName] = useState('');
    const [error, setError] = useState(null);

    const handleFolderCreation = async () => {
        if (!folderName) {
            setError('Folder name is required.');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:3000/folder',
                { name: folderName },
                { withCredentials: true }
            );

            onFolderCreated(response.data.folder);
            setFolderName('');
            onClose();
        } catch (error) {
            setError('Error creating folder');
            console.error(error);
        }
    };

    return (
        <ModalOverlay>
            <ModalContent>
                <h2>Create New Folder</h2>

                {/* Error Message */}
                {error && <ErrorText>{error}</ErrorText>}

                {/* Folder Name Input */}
                <InputField
                    type="text"
                    placeholder="Folder Name"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                />

                {/* Buttons in Row */}
                <ButtonContainer>
                    <UploadButton onClick={handleFolderCreation}>
                        Create Folder
                    </UploadButton>
                    <CancelButton onClick={onClose}>Close</CancelButton>
                </ButtonContainer>
            </ModalContent>
        </ModalOverlay>
    );
};

export default CreateFolderModal;
