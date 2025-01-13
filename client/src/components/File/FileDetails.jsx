import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileArrowDown,
    faExpand,
    faCompress,
} from '@fortawesome/free-solid-svg-icons';
import {
    Container,
    Header,
    ImagePreviewContainer,
    ButtonGroup,
    Details,
    ModalOverlay,
    ModalContent,
    PreviewBarContainer,
} from '../styles/FileDetails.styles';

const FileDetails = () => {
    const { id } = useParams();
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/files/${id}`,
                    { withCredentials: true }
                );
                setFile(response.data.fileDetails);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    const handleDownload = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/files/download/${id}`,
                { responseType: 'blob' }
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
        if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension))
            return 'image';
        if (['pdf'].includes(extension)) return 'pdf';
        return 'other';
    };

    if (loading) return <p>Loading file details...</p>;
    if (error) return <p>{error}</p>;

    const fileUrl = `http://localhost:3000/${file.url}`;
    const fileType = getFileType(file.name);

    return (
        <Container>
            <Header>File Details</Header>

            {fileType === 'image' && (
                <>
                    <ImagePreviewContainer>
                        <PreviewBarContainer>
                            <h3>Preview:</h3>
                            <div className="ButtonGroup">
                                {/* Maximize Icon */}
                                <button onClick={() => setIsModalOpen(true)}>
                                    <FontAwesomeIcon icon={faExpand} />
                                </button>
                                {/* Show/Hide Details */}
                                <button
                                    onClick={() =>
                                        setIsDetailsVisible((prev) => !prev)
                                    }
                                >
                                    {isDetailsVisible
                                        ? 'Hide Details'
                                        : 'Show Details'}
                                </button>
                                {/* Download Icon */}
                                <button onClick={handleDownload}>
                                    <FontAwesomeIcon icon={faFileArrowDown} />
                                </button>
                            </div>
                        </PreviewBarContainer>

                        <img src={fileUrl} alt={file.name} />
                    </ImagePreviewContainer>
                </>
            )}

            {fileType === 'pdf' && (
                <div>
                    <h3>Preview:</h3>
                    <embed
                        src={fileUrl}
                        type="application/pdf"
                        width="100%"
                        height="600px"
                    />
                </div>
            )}

            {fileType === 'other' && <p>Unable to preview this file type.</p>}

            {isDetailsVisible && (
                <Details>
                    <p>
                        <strong>Name:</strong> {file.name}
                    </p>
                    <p>
                        <strong>Size:</strong> {(file.size / 1024).toFixed(2)}{' '}
                        KB
                    </p>
                    <p>
                        <strong>Uploaded by:</strong> {file.owner.username}
                    </p>
                    <p>
                        <strong>Upload Time:</strong>{' '}
                        {new Date(file.uploadTime).toLocaleString()}
                    </p>
                </Details>
            )}

            {isModalOpen && (
                <ModalOverlay onClick={() => setIsModalOpen(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setIsModalOpen(false)}>
                            <FontAwesomeIcon icon={faCompress} />
                        </button>
                        <img src={fileUrl} alt={file.name} />
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default FileDetails;
