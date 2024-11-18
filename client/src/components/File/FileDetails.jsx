import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FileDetails = () => {
    const { id } = useParams();
    const [file, setFile] = useState(null);
    const [downloadLink, setDownloadLink] = useState(null);
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
                setDownloadLink(response.data.downloadLink);
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
            const response = await axios.get(downloadLink, {
                responseType: 'blob', 
            });

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

    if (loading) return <p>Loading file details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>File Details</h1>
            <p>Name: {file.name}</p>
            <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
            <p>Uploaded by: {file.owner.username}</p>
            <p>Upload Time: {new Date(file.uploadTime).toLocaleString()}</p>
            <button onClick={handleDownload}>Download</button>{' '}
        </div>
    );
};

export default FileDetails;
