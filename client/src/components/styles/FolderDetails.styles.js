import styled from 'styled-components';

export const FolderDetailsContainer = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
`;

export const FolderTitle = styled.h1`
    font-size: 2rem;
    margin-bottom: 20px;
    color: #333;
`;

export const FolderActions = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
`;

export const FolderInput = styled.input`
    padding: 8px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 300px;
`;

export const FolderButton = styled.button`
    padding: 8px 16px;
    font-size: 1rem;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

export const EditButton = styled.button`
    padding: 8px 16px;
    font-size: 1rem;
    border: none;
    background-color: #ffb84d;
    color: white;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #ff9c1a;
    }
`;

export const FileList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

export const FileListItem = styled.li`
    margin: 10px 0;
`;

export const NoFilesMessage = styled.p`
    font-size: 1.1rem;
    color: #555;
`;

// Modal Styling
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
    z-index: 1000; // Ensure the modal stays on top
`;

export const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    width: 300px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.h2`
    margin: 0;
    font-size: 1.5rem;
    color: #333;
`;

export const ModalButtonGroup = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 15px;
`;

export const ModalButton = styled.button`
    padding: 8px 16px;
    font-size: 1rem;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    width: 45%; // Makes buttons within the modal more uniform in width

    &:hover {
        background-color: #0056b3;
    }

    &:first-child {
        background-color: #ff4d4d; // Red color for the Delete button
    }

    &:first-child:hover {
        background-color: #e60000; // Darker red when hovered
    }
`;

export const CancelButton = styled.button`
    padding: 8px 16px;
    font-size: 1rem;
    border: none;
    background-color: #ccc;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        background-color: #999;
    }
`;
