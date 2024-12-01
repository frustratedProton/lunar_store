import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    DashboardContainer,
    DashboardHeader,
    Logo,
    SearchBar,
    Profile,
    ProfilePicture,
    DashboardContent,
    Sidebar,
    SidebarList,
    SidebarItem,
    SidebarLink,
    MainContent,
    FilesSection,
    FoldersSection,
    FileItem,
    FolderItem,
    CreateButton,
} from '../styles/Dashboard.styles';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [files, setFiles] = useState([]);
    const [folders, setFolders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const fetchFilesAndFolders = async () => {
            try {
                const fileResponse = await axios.get(
                    'http://localhost:3000/files/all',
                    { withCredentials: true }
                );
                const folderResponse = await axios.get(
                    'http://localhost:3000/folder',
                    { withCredentials: true }
                );
                setFiles(fileResponse.data.files || []);
                setFolders(folderResponse.data.folders || []);
            } catch (error) {
                console.error(error);
                setError(
                    error.response?.data?.message ||
                        'An error occurred while fetching data.'
                );
            }
        };

        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/auth/me',
                    { withCredentials: true }
                );
                setUser(response.data.user);
            } catch (error) {
                console.error(error);
                setError(
                    error.response?.data?.message ||
                        'An error occurred while fetching user details.'
                );
            }
        };

        fetchFilesAndFolders();
        fetchUserDetails();
    }, [id]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredFiles = files.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredFolders = folders.filter((folder) =>
        folder.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (error) return <p>{error}</p>;

    return (
        <DashboardContainer>
            <DashboardHeader>
                <Logo>My Drive</Logo>
                <SearchBar
                    type="text"
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <Profile>
                    <p>Welcome, {user?.username}</p>
                    <ProfilePicture src={user?.profilePicture} alt="Profile" />
                </Profile>
            </DashboardHeader>

            <DashboardContent>
                <Sidebar>
                    <SidebarList>
                        <SidebarItem>
                            <SidebarLink to="/">Dashboard</SidebarLink>
                        </SidebarItem>
                        <SidebarItem>
                            <SidebarLink to="/files">Files</SidebarLink>
                        </SidebarItem>
                        <SidebarItem>
                            <SidebarLink to="/folders">Folders</SidebarLink>
                        </SidebarItem>
                    </SidebarList>
                </Sidebar>

                <MainContent>
                    <CreateButton to="/create-folder">
                        Create New Folder
                    </CreateButton>{' '}
                    <FilesSection>
                        <h2>Files</h2>
                        {filteredFiles.length > 0 ? (
                            <ul>
                                {filteredFiles.map((file) => (
                                    <li key={file.id}>
                                        <FileItem to={`/files/${file.id}`}>
                                            {file.name}
                                        </FileItem>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No files found.</p>
                        )}
                    </FilesSection>
                    <FoldersSection>
                        <h2>Folders</h2>
                        {filteredFolders.length > 0 ? (
                            <ul>
                                {filteredFolders.map((folder) => (
                                    <li key={folder.id}>
                                        <FolderItem
                                            to={`/folders/${folder.id}`}
                                        >
                                            {folder.name}
                                        </FolderItem>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No folders found.</p>
                        )}
                    </FoldersSection>
                </MainContent>
            </DashboardContent>
        </DashboardContainer>
    );
};

export default Dashboard;
