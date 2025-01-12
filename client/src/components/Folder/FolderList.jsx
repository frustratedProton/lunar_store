import axios from 'axios';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Heading1 } from '../styles/Headings.styles';
import {
    FolderItem,
    FolderLink,
    FoldersList,
    FolderColumn,
    HeaderRow,
    FoldersSection,
} from '../styles/FolderList.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

const FolderList = () => {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { searchQuery } = useOutletContext();

    const fetchFolders = async () => {
        try {
            const response = await axios.get('http://localhost:3000/folder', {
                withCredentials: true,
            });
            setFolders(response.data.folders);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFolders();
    }, []);

    const filteredFolders = folders.filter((folder) =>
        folder.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <p>Loading folders...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <FoldersSection>
            <Heading1>Your Folders</Heading1>
            <HeaderRow>
                <FolderColumn>
                    Folder Name
                </FolderColumn>
                <FolderColumn>Last Modified</FolderColumn>
                <FolderColumn>Size</FolderColumn>
            </HeaderRow>

            <FoldersList>
                {filteredFolders.length > 0 ? (
                    filteredFolders.map((folder) => (
                        <FolderItem key={folder.id}>
                            <FolderLink to={`/folders/${folder.id}`}>
                                <FontAwesomeIcon icon={faFolder} />
                                <FolderColumn>{folder.name}</FolderColumn>
                                <FolderColumn>{folder.modified}</FolderColumn>
                                <FolderColumn>{folder.size}</FolderColumn>
                            </FolderLink>
                        </FolderItem>
                    ))
                ) : (
                    <p>No folders found.</p>
                )}
            </FoldersList>
        </FoldersSection>
    );
};

export default FolderList;
