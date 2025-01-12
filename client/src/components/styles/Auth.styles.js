import styled from 'styled-components';

export const SignUpContainer = styled.div`
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 8px;
    background-color: var(--background);
    text-align: center;
    color: var(--text);

    /* Light and dark mode shadows */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    @media (prefers-color-scheme: dark) {
        box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
    }

    h2 {
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
        color: var(--text);
    }

    p {
        color: red;
        font-size: 0.875rem;
        margin-bottom: 1rem;
    }
`;


export const FloatingLabelContainer = styled.div`
    position: relative;
    margin-bottom: 1.5rem;
`;

export const InputField = styled.input`
    width: 100%;
    padding: 0.75rem 0.5rem;
    font-size: 1rem;
    border: 1px solid var(--secondary);
    border-radius: 4px;
    outline: none;
    box-sizing: border-box;
    background-color: var(--background);
    color: var(--text);

    /* When focused, change border color */
    &:focus {
        border-color: var(--accent);
    }

    /* Remove browser default styles */
    &:focus,
    &:valid {
        ~ label {
            top: -0.75rem;
            left: 0.5rem;
            font-size: 0.75rem;
            color: var(--accent);
            background: var(--background);
            padding: 0 0.25rem;
        }
    }
`;

export const FloatingLabel = styled.label`
    position: absolute;
    top: 50%;
    left: 0.5rem;
    transform: translateY(-50%);
    font-size: 1rem;
    color: var(--secondary);
    pointer-events: none;
    transition: all 0.2s ease-in-out;
`;

export const SubmitButton = styled.button`
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    color: var(--background);
    background-color: var(--accent);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: var(--primary);
    }
`;
