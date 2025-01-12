import styled from 'styled-components';

export const FileDetailsContainer = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
`;

export const FileTitle = styled.h1`
    font-size: 2rem;
    margin-bottom: 20px;
`;

export const FileDetailItem = styled.p`
    font-size: 1.1rem;
    margin: 10px 0;
`;

export const FilePreviewContainer = styled.div`
    margin-top: 20px;
`;

export const FilePreviewTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 10px;
`;

export const FileImage = styled.img`
    max-width: 60%;
    height: auto;
    display: block;
    margin: 0 auto;
`;

export const FileEmbed = styled.embed`
    width: 100%;
    height: 600px;
`;

export const DownloadButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    font-size: 1.2rem;

    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
    }

    svg {
        font-size: 1.5rem;
    }
`;
