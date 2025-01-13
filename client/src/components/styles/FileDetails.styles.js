import styled from 'styled-components';

export const Container = styled.div`
    padding: 16px;
`;

export const Header = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 16px;
`;

export const ImagePreviewContainer = styled.div`
    position: relative;
    margin-bottom: 16px;

    img {
        max-width: 100%;
        max-height: 400px;
        border-radius: 8px;
        display: block;
        margin: 0 auto; /* Center the image */
    }

    .maximize-button-container {
        margin-top: 8px;
        text-align: center; /* Center align the button */
    }

    .maximize-button-container button {
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px;
        cursor: pointer;

        &:hover {
            background: rgba(0, 0, 0, 0.8);
        }

        svg {
            width: 16px;
            height: 16px;
            fill: currentColor; /* Ensures SVG uses the color of the text */
        }
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;

    button {
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 4px;

        &:hover {
            background: #0056b3;
        }

        svg {
            width: 20px;
            height: 20px;
            fill: currentColor;
            transition: fill 0.3s ease;

            &:hover {
                fill: #fff;
            }
        }
    }
`;

export const Details = styled.div`
    background: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;

    p {
        margin: 8px 0;
    }

    strong {
        font-weight: bold;
    }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: white;
    padding: 16px;
    border-radius: 8px;
    position: relative;

    img {
        max-width: 100%;
        max-height: 80vh;
    }

    button {
        position: absolute;
        top: 8px;
        right: 8px;
        background: #ff4d4d;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px;
        cursor: pointer;

        &:hover {
            background: #cc0000;
        }

        svg {
            width: 16px;
            height: 16px;
            fill: currentColor; /* Ensure the close icon is white */
        }
    }
`;

export const PreviewBarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f1f1f1;
    padding: 8px 16px;
    border-radius: 8px;
    margin-bottom: 8px;

    h3 {
        margin: 0;
        font-size: 1rem;
        color: #333;
        flex-grow: 1;
        text-align: left;
    }

    .ButtonGroup {
        display: flex;
        align-items: center;
        gap: 8px;

        svg {
            width: 20px;
            height: 20px;
            fill: currentColor;
            transition: fill 0.3s ease;

            &:hover {
                fill: #fff;
            }
        }
    }
`;
