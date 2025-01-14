import styled from 'styled-components';

export const Container = styled.div`
    padding: 16px;
`;

export const Header = styled.h2`
    display: flex;
    flex-direction: row-reverse;
    font-size: 1.5rem;
    margin-bottom: 16px;
    gap: 0.4em;
`;

export const ImagePreviewContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 16px;
    transition: transform 0.5s ease;
    margin-top: 16px;

    ${(props) => props.$isDetailsVisible && `transform: translateX(-25%);`}
`;

export const ImageContainer = styled.div`
    margin-top: 2em;
    flex-shrink: 0;
    width: calc(100% - 220px);
    position: relative;
    transition: transform 0.5s ease;
    display: flex;
    justify-content: center;

    .image-frame {
        display: inline-block;
        padding: 0.8em;
        border-radius: 10px;
        box-shadow: -50px -50px 0 -40px var(--accent),
            50px 50px 0 -40px var(--accent);
        position: relative;
        overflow: hidden;
        transition: margin-left 0.5s ease;

        ${(props) =>
            props.$isDetailsVisible &&
            `margin-left: ${props.$imageWidth + 30}px;`}
    }

    img {
        max-width: 100%;
        max-height: 400px;
        object-fit: contain;
        display: block;
        margin: 0 auto;
    }

    .text-overlay {
        position: absolute;
        top: 0;
        right: 0;
        width: 60%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        color: white;
        padding: 30px;
        box-sizing: border-box;
        transform: translateX(100%);
        opacity: 0;
        transition: transform 0.5s ease, opacity 0.5s ease;
        font-size: 1.5rem;
        line-height: 1.8;
    }

    .image-frame:hover .text-overlay {
        transform: translateX(0);
        opacity: 1;
    }

    .text-overlay p {
        margin: 12px 0;
    }

    .text-overlay strong {
        font-weight: bold;
    }
`;

export const Details = styled.div`
    flex-shrink: 1;
    width: 60%;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
    border: 1px solid var(--accent);
    border-radius: 8px;

    p {
        margin: 8px 0;
    }

    strong {
        font-weight: bold;
    }
`;

export const DownloadButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    font-size: 0.9rem;
    cursor: pointer;
    border: 2px solid #ccc;
    border-radius: 8px;
    background-color: var(--primary);
    gap: 0.5em;
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
