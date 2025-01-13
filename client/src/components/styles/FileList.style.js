import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const FilesSection = styled.section`
    background: var(--background);
    padding: 20px;
`;

export const HeaderRow = styled.div`
    display: flex;
    padding: 1.2rem 1rem 0.8rem 1rem;
    border-bottom: 2px solid var(--accent);
    font-weight: bold;
`;

export const FileItem = styled.div`
    color: hsl(158, 44%, 5%, 0.7);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    margin: 8px 0;
    border-radius: 8px;
    transition: background-color 0.3s ease;
    cursor: pointer;

    &:hover {
        background-color: #f1f1f1;
    }

    a {
        text-decoration: none;
        color: inherit;
        display: flex;
        width: 100%;
    }
`;

export const FileLink = styled(Link)`
    display: flex;
    width: 100%;
    text-decoration: none;
    color: inherit;
`;

export const FileColumn = styled.div`
    flex: 1;
    padding: 0 10px;
    text-align: left;
    white-space: nowrap;
`;

export const SortArrow = styled.span`
    margin-left: 5px;
    font-size: 12px;
    color: #888;
`;

export const FileList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: auto;
`;
