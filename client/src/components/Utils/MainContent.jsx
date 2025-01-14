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
import { Heading1, Heading2, NoneFound } from '../styles/Headings.styles.js';
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
    const [files, setFiles] = useState(filteredFiles || []);
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

        if (filteredFiles) {
            setFiles(filteredFiles);
        }
    }, [filteredFolders, filteredFiles]);

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

    const fetchFiles = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/files/all',
                {
                    withCredentials: true,
                }
            );
            setFiles(response.data.files);
        } catch (err) {
            console.error(err);
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

    const handleFolderCreated = async (newFolder) => {
        try {
            if (newFolder && newFolder.id) {
                setFolders((prevFolders) => [newFolder, ...prevFolders]);
            }

            await fetchFolders();
        } catch (error) {
            console.error('Error fetching folders after creation:', error);
        }
        setIsCreateFolderOpen(false);
    };

    const handleUploadClick = () => {
        setIsUploadModalOpen(true);
    };

    const handleFileUpload = async () => {
        try {
            await fetchFiles();
        } catch (error) {
            console.error('Error fetching files after upload:', error);
        }
    };

    return (
        <div>
            <StorageOptions>
                <Heading1>My Storage</Heading1>
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
                    onFileUpload={handleFileUpload}
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
                            {folders.slice(0, 5).map((folder) => (
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
                        <NoneFound>No folders found.</NoneFound>
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
                        {files.length > 0 ? (
                            <ul>
                                {files
                                    .sort(
                                        (a, b) =>
                                            new Date(b.uploadTime) -
                                            new Date(a.uploadTime)
                                    )
                                    .slice(0, 5)
                                    .map((file) => (
                                        <FileItem key={file.id}>
                                            <FileLink to={`/files/${file.id}`}>
                                                <FontAwesomeIcon
                                                    icon={faFileLines}
                                                />
                                                <FileColumn>
                                                    {file.name}
                                                </FileColumn>
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
                            <NoneFound>No files found.</NoneFound>
                        )}
                    </FileList>
                </FilesSection>
            </div>
        </div>
    );
};

export default MainContent;
