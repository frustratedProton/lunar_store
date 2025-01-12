import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';

import {
    DownloadButton,
    FileDetailItem,
    FileDetailsContainer,
    FileEmbed,
    FileImage,
    FilePreviewContainer,
    FilePreviewTitle,
    FileTitle,
} from '../styles/FileDetails.styles';

const FileDetails = () => {
    const { id } = useParams();
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/files/${id}`,
                    {
                        withCredentials: true,
                    }
                );
                setFile(response.data.fileDetails);
            } catch (error) {
                console.error(error);
                setError('Failed to load file details');
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    const handleDownload = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/files/download/${id}`,
                {
                    responseType: 'blob',
                }
            );

            const link = document.createElement('a');
            const url = window.URL.createObjectURL(new Blob([response.data]));
            link.href = url;
            link.setAttribute('download', file.name);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const getFileType = (filename) => {
        const extension = filename.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) {
            return 'image';
        }
        if (['pdf'].includes(extension)) {
            return 'pdf';
        }
        return 'other';
    };

    if (loading) return <p>Loading file details...</p>;
    if (error) return <p>{error}</p>;

    const fileUrl = `http://localhost:3000/${file.url}`;
    const fileType = getFileType(file.name);

    return (
        <FileDetailsContainer>
            <FileTitle>File Details</FileTitle>
            <FileDetailItem>
                <strong>Name:</strong> {file.name}
            </FileDetailItem>
            <FileDetailItem>
                <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
            </FileDetailItem>
            <FileDetailItem>
                <strong>Uploaded by:</strong> {file.owner.username}
            </FileDetailItem>
            <FileDetailItem>
                <strong>Upload Time:</strong>{' '}
                {new Date(file.uploadTime).toLocaleString()}
            </FileDetailItem>

            {fileType === 'image' && (
                <FilePreviewContainer>
                    <FilePreviewTitle>Preview:</FilePreviewTitle>
                    <div style={{ position: 'relative' }}>
                        <FileImage src={fileUrl} alt={file.name} />
                        <DownloadButton onClick={handleDownload}>
                            <FontAwesomeIcon icon={faFileArrowDown} />
                        </DownloadButton>
                    </div>
                </FilePreviewContainer>
            )}

            {fileType === 'pdf' && (
                <FilePreviewContainer>
                    <FilePreviewTitle>Preview:</FilePreviewTitle>
                    <FileEmbed
                        src={fileUrl}
                        type="application/pdf"
                        width="100%"
                        height="600px"
                    />
                </FilePreviewContainer>
            )}

            {fileType === 'other' && (
                <div>
                    <p>Unable to preview this file type.</p>
                </div>
            )}
        </FileDetailsContainer>
    );
};

export default FileDetails;
