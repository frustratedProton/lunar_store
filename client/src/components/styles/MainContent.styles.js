import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const FilesSection = styled.section`
    background: var(--background);
    padding: 20px;
`;

export const FoldersSection = styled.section`
    background: var(--background);
    padding: 20px;
`;

export const FileItem = styled.div`
    text-decoration: none;
    color: hsl(158, 44%, 5%, 0.7);
    font-size: 1rem;
    display: flex;
    padding: 10px;
    margin: 5px 0;
    transition: text-decoration 0.3s;
    justify-content: space-between;
    cursor: pointer;
`;

export const FileList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
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

// export const FolderItem = styled.a`
//     text-decoration: none;
//     color: var(--primary);
//     font-size: 1rem;
//     font-weight: bold;
//     display: inline-block;
//     margin: 5px 0;
//     transition: text-decoration 0.3s;
// `;

export const StorageOptions = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    margin: 1rem;
`;

export const IconContainer = styled.div`
    display: flex;
    gap: 2rem;
    align-items: center;
    font-size: 1rem;
`;

export const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    font-size: 1rem;
    font-weight: 400;
    height: 3rem;
    border: 2px solid #ccc;
    border-radius: 8px;
    background-color: var(--primary);
    color: hsl(153, 44%, 95%);
    box-shadow: 0 4px 6px rgba(155, 155, 155, 0.4),
        0 10px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    cursor: pointer;
    gap: 10px;
    transition: background-color 0.3s ease, transform 0.2s ease,
        box-shadow 0.3s ease;

    &:hover {
        background-color: hsl(155, 39%, 60%);
        transform: scale(1.01);
        box-shadow: 0 0 15px 8px hsl(155, 39%, 70%);
    }

    &:active {
        transform: scale(0.98);
        box-shadow: 0 3px 6px rgba(155, 155, 155, 0.3),
            0 8px 15px rgba(0, 0, 0, 0.1);
    }

    svg {
        margin-right: 8px;
        font-size: 1.2rem;
    }
`;

export const StorageText = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.5rem;
`;
export const FolderCard = styled(Link)`
    height: 14rem;
    width: 100%;
    max-width: 20rem;
    background-color: hsl(155, 39%, 54%, 5%);
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.2rem;
    box-sizing: border-box;
    overflow: hidden;

    &:hover {
        box-shadow: 0 6px 12px hsl(156, 38%, 60%, 0.6);
        transform: scale(1.01);
    }

    .folder-icon {
        font-size: 3rem;
        color: hsl(155, 39%, 54%);
        margin-bottom: 10px;
    }

    .folder-name {
        font-size: 1.4rem;
        font-weight: bold;
        color: hsl(155, 39%, 10%);
    }
`;
export const FolderCardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;

    @media (min-width: 1200px) {
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }

    @media (max-width: 480px) {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
`;

export const HeaderRow = styled.div`
    display: flex;
    padding: 1.2rem 1rem 0.8rem 1rem;
    border-bottom: 2px solid var(--accent);
    font-weight: bold;
`;

export const Column = styled.div`
    flex: 1;
    text-align: left;
    padding-left: 10px;
    cursor: pointer;
`;

export const SortArrow = styled.span`
    margin-left: 5px;
    font-size: 12px;
    color: #888;
`;
