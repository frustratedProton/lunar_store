import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

export const ModalContent = styled.div`
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    width: 600px;
    text-align: center;
    max-width: 90%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

export const DropzoneArea = styled.div`
    border: 2px dashed #ccc;
    padding: 20px;
    margin: 20px 0;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    background-color: #f9f9f9;
    transition: background-color 0.3s;

    &:hover {
        background-color: #eaeaea;
    }
`;

export const FileDetails = styled.div`
    margin-top: 10px;
    font-size: 14px;
    color: #333;
`;

export const UploadButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: 400;
    height: 2.8rem;
    border: 2px solid #ccc;
    border-radius: 8px;
    background-color: var(--primary);
    color: hsl(153, 44%, 95%);
    cursor: pointer;
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
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: 400;
    height: 2.8rem;
    border: 2px solid #ccc;
    border-radius: 8px;
    background-color: hsl(185, 19%, 55%);
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;

    &:hover {
        background-color: hsl(185, 19%, 65%);
        transform: scale(1.01);
    }

    &:active {
        transform: scale(0.98);
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
`;

export const ErrorText = styled.div`
    color: red;
    margin-top: 10px;
    font-size: 14px;
`;

// for createfolder.jsx since im lazy

export const InputField = styled.input`
    width: 100%;
    padding: 12px;
    margin-top: 20px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    box-sizing: border-box;
`;
