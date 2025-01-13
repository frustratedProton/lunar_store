/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Column,
    FileColumn,
    FileItem,
    FileLink,
    FileList,
    FilesSection,
    FolderCard,
    FolderCardContainer,
    FoldersSection,
    HeaderRow,
    IconContainer,
    SortArrow,
    StorageOptions,
} from '../styles/MainContent.styles.js';
import { Heading2 } from '../styles/Headings.styles.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileLines,
    faFolder,
    faFolderPlus,
    faSort,
    faUpload,
} from '@fortawesome/free-solid-svg-icons';
import FileUploadModal from '../File/UploadFile.jsx';
import CreateFolderModal from '../Folder/CreateFolder.jsx';

const MainContent = ({ filteredFiles, filteredFolders }) => {
    const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
    const [folders, setFolders] = useState(filteredFolders || []);
    const [loadingFolders, setLoadingFolders] = useState(false);
    const [error, setError] = useState(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [selectedFolderId, setSelectedFolderId] = useState(null);

    useEffect(() => {
        if (filteredFolders) {
            setFolders(filteredFolders);
        } else {
            fetchFolders();
        }
    }, [filteredFolders]);

    const fetchFolders = async () => {
        setLoadingFolders(true);
        try {
            const response = await axios.get('http://localhost:3000/folder', {
                withCredentials: true,
            });
            setFolders(response.data.folders);
        } catch (err) {
            setError(err);
        } finally {
            setLoadingFolders(false);
        }
    };

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

    const handleFolderCreated = (newFolder) => {
        setFolders((prevFolders) => [newFolder, ...prevFolders]);
        setIsCreateFolderOpen(false);
    };

    const handleUploadClick = () => {
        setIsUploadModalOpen(true);
    };

    return (
        <div>
            {/* <div>
                <Heading1>Welcome, {user?.username}</Heading1>
            </div> */}

            <StorageOptions>
                <Heading2>My Storage</Heading2>
                <IconContainer>
                    <Box onClick={handleUploadClick}>
                        <FontAwesomeIcon icon={faUpload} />
                        Upload
                    </Box>
                    <Box
                        onClick={() =>
                            setIsCreateFolderOpen(!isCreateFolderOpen)
                        }
                    >
                        <FontAwesomeIcon icon={faFolderPlus} />
                        Create
                    </Box>
                </IconContainer>
            </StorageOptions>

            {isCreateFolderOpen && (
                <CreateFolderModal
                    onClose={() => setIsCreateFolderOpen(false)}
                    onFolderCreated={handleFolderCreated}
                />
            )}

            {isUploadModalOpen && (
                <FileUploadModal
                    onClose={() => setIsUploadModalOpen(false)}
                    folderId={selectedFolderId}
                />
            )}

            <div>
                <FoldersSection>
                    <Heading2>Recent Folders</Heading2>
                    {loadingFolders ? (
                        <p>Loading folders...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : folders.length > 0 ? (
                        <FolderCardContainer>
                            {folders.map((folder) => (
                                <FolderCard
                                    key={folder.id}
                                    to={`/folders/${folder.id}`}
                                    onClick={() =>
                                        setSelectedFolderId(folder.id)
                                    }
                                >
                                    <div className="folder-icon">
                                        <FontAwesomeIcon icon={faFolder} />
                                    </div>
                                    <div className="folder-name">
                                        {folder.name}
                                    </div>
                                </FolderCard>
                            ))}
                        </FolderCardContainer>
                    ) : (
                        <p>No folders found.</p>
                    )}
                </FoldersSection>

                <FilesSection>
                    <Heading2>Recent Files</Heading2>
                    <HeaderRow>
                        <Column>
                            Filename
                            <SortArrow>
                                <FontAwesomeIcon icon={faSort} />
                            </SortArrow>
                        </Column>
                        <Column>
                            Size
                            <SortArrow>
                                <FontAwesomeIcon icon={faSort} />
                            </SortArrow>
                        </Column>
                        <Column>
                            Upload Time
                            <SortArrow>
                                <FontAwesomeIcon icon={faSort} />
                            </SortArrow>
                        </Column>
                    </HeaderRow>

                    <FileList>
                        {filteredFiles.length > 0 ? (
                            <ul>
                                {filteredFiles.map((file) => (
                                    <FileItem key={file.id}>
                                        <FileLink to={`/files/${file.id}`}>
                                            <FontAwesomeIcon
                                                icon={faFileLines}
                                            />
                                            <FileColumn>{file.name}</FileColumn>
                                            <FileColumn>
                                                {formatFileSize(file.size)}
                                            </FileColumn>
                                            <FileColumn>
                                                {formatUploadDate(
                                                    file.uploadTime
                                                )}
                                            </FileColumn>
                                        </FileLink>
                                    </FileItem>
                                ))}
                            </ul>
                        ) : (
                            <p>No files found.</p>
                        )}
                    </FileList>
                </FilesSection>
            </div>
        </div>
    );
};

export default MainContent;
