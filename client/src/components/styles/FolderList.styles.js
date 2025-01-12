import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FoldersSection = styled.section`
    background: var(--background);
    padding: 20px;
`;

export const FoldersList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
`;

export const FolderItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: hsl(158, 44%, 5%, 0.7);
    padding: 12px 16px;
    margin: 8px 0;
    border-radius: 8px;
    transition: background-color 0.3s ease;
    cursor: pointer;

    a {
        text-decoration: none;
        color: inherit;
        display: flex;
        width: 100%;
    }
`;

export const FolderLink = styled(Link)`
    display: flex;
    width: 100%;
    text-decoration: none;
    color: inherit;
`;

export const FolderColumn = styled.div`
    flex: 1;
    padding: 0 10px;
    text-align: left;
    white-space: nowrap;
`;

export const HeaderRow = styled.div`
    display: flex;
    padding: 1.2rem 1rem 0.8rem 1rem;
    border-bottom: 2px solid var(--accent);
    font-weight: bold;
`;