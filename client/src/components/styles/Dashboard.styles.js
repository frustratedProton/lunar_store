import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: var(--background);
    color: var(--text);
`;

export const DashboardHeader = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: var(--primary);
    color: white;
`;

export const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
`;

export const SearchBar = styled.input`
    width: 200px;
    padding: 5px;
    border: 1px solid var(--secondary);
    border-radius: 4px;
    background-color: var(--background);
    color: var(--text);

    &:focus {
        outline: none;
        border-color: var(--accent);
    }
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
`;

export const ProfilePicture = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 10px;
`;

export const DashboardContent = styled.div`
    display: flex;
    flex: 1;
    padding: 20px;
`;

export const Sidebar = styled.nav`
    width: 200px;
    background-color: var(--secondary);
    padding: 10px;
`;

export const SidebarList = styled.ul`
    list-style: none;
    padding: 0;
`;

export const SidebarItem = styled.li`
    margin-bottom: 10px;
`;

export const SidebarLink = styled.a`
    text-decoration: none;
    color: var(--text);

    &:hover {
        color: var(--accent);
    }
`;

export const MainContent = styled.main`
    flex: 1;
    padding-left: 20px;
`;

export const FilesSection = styled.section`
    margin-bottom: 30px;
`;

export const FoldersSection = styled.section`
    margin-bottom: 30px;
`;

export const FileItem = styled.a`
    text-decoration: none;
    color: var(--primary);
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
`;

export const FolderItem = styled.a`
    text-decoration: none;
    color: var(--primary);
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
`;

export const CreateButton = styled(Link)`
    display: inline-block;
    padding: 10px 20px;
    margin-bottom: 20px;
    background-color: var(--accent);
    color: white;
    text-decoration: none;
    font-weight: bold;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;

    &:hover {
        background-color: var(--primary);
    }

    &:focus {
        outline: none;
        border: 2px solid var(--accent);
    }
`;
