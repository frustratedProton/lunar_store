import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FolderDetailsContainer = styled.div`
    padding: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const FolderTitle = styled.h1`
    font-size: 2rem;
    margin-bottom: 20px;
    color: #2c3e50;
`;

export const InlineFlexWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const FolderActions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-left: 10px;
`;

export const FolderInput = styled.input`
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 200px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

    &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
    }
`;

export const UploadButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    font-size: 0.9rem;
    cursor: pointer;
    border: 2px solid #ccc;
    border-radius: 8px;
    background-color: var(--primary, #007bff);
    color: white;
    transition: background-color 0.2s ease, transform 0.1s ease;

    &:hover {
        background-color: hsl(155, 39%, 60%);
        transform: scale(1.01);
    }

    &:active {
        transform: scale(0.98);
    }
`;

export const CancelButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    font-size: 0.9rem;
    cursor: pointer;
    border: 2px solid #ccc;
    border-radius: 8px;
    background-color: hsl(0, 70%, 50%);
    color: white;
    transition: background-color 0.2s ease, transform 0.1s ease;

    &:hover {
        background-color: hsl(0, 70%, 60%);
        transform: scale(1.02);
    }

    &:active {
        transform: scale(0.98);
    }
`;

export const FileList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
`;

export const FileListItem = styled.div`
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
    font-size: large;
`;

export const HeaderRow = styled.div`
    display: flex;
    padding: 1.2rem 1rem 0.8rem 1rem;
    border-bottom: 2px solid var(--accent);
    font-weight: bold;
`;

export const NoFilesMessage = styled.p`
    font-size: 1.2rem;
    color: #888;
    margin: 20px 0;
    text-align: center;
`;

export const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    padding: 30px;
    border-radius: 8px;
    width: 400px;
    text-align: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #333;
`;

export const ModalButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 15px;
    margin-top: 20px;
`;

export const ModalButton = styled(UploadButton)`
    background-color: #007bff;

    &:hover {
        background-color: #0056b3;
    }
`;

export const DeleteButton = styled(CancelButton)`
    background-color: #ff4d4d;

    &:hover {
        background-color: #e60000;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
`;

export const ErrorText = styled.p`
    color: red;
    margin-top: 10px;
    font-size: 0.9rem;
`;
