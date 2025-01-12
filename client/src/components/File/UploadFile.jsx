/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import {
    ErrorText,
    ModalContent,
    ModalOverlay,
    UploadButton,
    DropzoneArea,
    FileDetails,
    ButtonContainer,
    CancelButton,
} from '../styles/UploadFile.styles';

const FileUploadModal = ({ onClose, folderId }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const onDrop = (acceptedFiles) => {
        setSelectedFile(acceptedFiles[0]);
    };

    const onFileUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('folderId', folderId);

        try {
            setUploading(true);
            setError(null);

            await axios.post('http://localhost:3000/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            alert('File uploaded successfully!');
            onClose();
        } catch (err) {
            setUploading(false);
            setError('Error uploading file.');
            console.error(err);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
    });

    return (
        <ModalOverlay>
            <ModalContent>
                <h2>Upload a File</h2>
                <DropzoneArea {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag and drop a file here, or click to select files</p>
                </DropzoneArea>

                {selectedFile && (
                    <FileDetails>
                        <p>
                            <strong>Selected File:</strong> {selectedFile.name}
                        </p>
                    </FileDetails>
                )}

                <ButtonContainer>
                    <UploadButton onClick={onFileUpload} disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Upload'}
                    </UploadButton>
                    <CancelButton onClick={onClose} disabled={uploading}>
                        Close
                    </CancelButton>
                </ButtonContainer>

                {error && <ErrorText>{error}</ErrorText>}
            </ModalContent>
        </ModalOverlay>
    );
};

export default FileUploadModal;
