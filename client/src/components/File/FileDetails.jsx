import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Heading2 } from '../styles/Headings.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleInfo,
    faFileArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import {
    Container,
    Header,
    ImagePreviewContainer,
    Details,
    DownloadButton,
    ImageContainer,
} from '../styles/FileDetails.styles';

const FileDetails = () => {
    const { id } = useParams();
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const [imageWidth, setImageWidth] = useState(0);

    const imageRef = useRef(null); // Ref for the image

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

    const handleImageLoad = () => {
        if (imageRef.current) {
            setImageWidth(imageRef.current.offsetWidth);
        }
    };

    if (loading) return <p>Loading file details...</p>;
    if (error) return <p>{error}</p>;

    const fileUrl = `http://localhost:3000/${file.url}`;
    const fileType = getFileType(file.name);

    return (
        <Container>
            <Heading2>File Details</Heading2>

            {fileType === 'image' && (
                <Header>
                    <DownloadButton onClick={handleDownload}>
                        <FontAwesomeIcon icon={faFileArrowDown} />
                        Download
                    </DownloadButton>
                    <DownloadButton
                        onClick={() => setIsDetailsVisible(!isDetailsVisible)}
                    >
                        <FontAwesomeIcon icon={faCircleInfo} />
                        Details
                    </DownloadButton>
                </Header>
            )}

            <ImagePreviewContainer $isDetailsVisible={isDetailsVisible}>
                <ImageContainer
                    $isDetailsVisible={isDetailsVisible}
                    $imageWidth={imageWidth}
                >
                    <div className="image-frame">
                        <img
                            ref={imageRef}
                            src={fileUrl}
                            alt={file.name}
                            onLoad={handleImageLoad}
                        />
                        <div className="text-overlay">
                            <p>{file.name}</p>
                        </div>
                    </div>
                </ImageContainer>
                {isDetailsVisible && (
                    <Details>
                        <p>
                            <strong>Name:</strong> {file.name}
                        </p>
                        <p>
                            <strong>Size:</strong>{' '}
                            {(file.size / 1024).toFixed(2)} KB
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
            </ImagePreviewContainer>

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
        </Container>
    );
};

export default FileDetails;
