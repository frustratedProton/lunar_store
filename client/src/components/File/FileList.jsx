import axios from 'axios';
import { useEffect, useState } from 'react';
import { Heading1 } from '../styles/Headings.styles';
import {
    FileItem,
    FileLink,
    FileColumn,
    FileList,
    HeaderRow,
    SortArrow,
    FilesSection,
} from '../styles/FileList.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { useOutletContext } from 'react-router-dom';

const FilesList = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { searchQuery } = useOutletContext();

    const fetchAllFiles = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/files/all',
                { withCredentials: true }
            );

            if (JSON.stringify(response.data.files) !== JSON.stringify(files)) {
                setFiles(response.data.files);
            }
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllFiles();
    }, []);

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return `${bytes} B`;
        else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        else if (bytes < 1024 * 1024 * 1024)
            return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
        else return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    };

    const formatUploadDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const filteredFiles = files.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <p>Loading files...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <FilesSection>
            <Heading1>All Files</Heading1>
            <HeaderRow>
                <FileColumn>
                    Filename
                    <SortArrow>
                        <FontAwesomeIcon icon={faSort} />
                    </SortArrow>
                </FileColumn>
                <FileColumn>
                    Size
                    <SortArrow>
                        <FontAwesomeIcon icon={faSort} />
                    </SortArrow>
                </FileColumn>
                <FileColumn>
                    Upload Time
                    <SortArrow>
                        <FontAwesomeIcon icon={faSort} />
                    </SortArrow>
                </FileColumn>
            </HeaderRow>

            <FileList>
                {filteredFiles.length > 0 ? (
                    filteredFiles.map((file) => (
                        <FileItem key={file.id}>
                            <FileLink to={`/files/${file.id}`}>
                                <FontAwesomeIcon icon={faFileLines} />
                                <FileColumn>{file.name}</FileColumn>
                                <FileColumn>
                                    {formatFileSize(file.size)}
                                </FileColumn>
                                <FileColumn>
                                    {formatUploadDate(file.uploadTime)}
                                </FileColumn>
                            </FileLink>
                        </FileItem>
                    ))
                ) : (
                    <p>No files found.</p>
                )}
            </FileList>
        </FilesSection>
    );
};

export default FilesList;
