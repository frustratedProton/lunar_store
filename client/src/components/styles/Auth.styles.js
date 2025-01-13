import styled from 'styled-components';

export const BackgroundContainer = styled.div`
    height: 100vh;
    width: 100%;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url(../public/colin-watts-unsplash.webp);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const StyledHeading = styled.h2`
    font-size: 1.5rem;
    color: var(--text);
`;

const commonTransition = `
    opacity: 0;
    pointer-events: none;
    transform: translateY(100px);
    transition: 0.3s ease-in-out;
    
    &.is-open {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
    }
`;

export const SignUpContainer = styled.div`
    max-width: 400px;
    padding: 2rem;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
    color: var(--text);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

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

export const SignUpFormContainer = styled.div`
    display: flex;
    max-width: 720px;
    width: 100%;
    height: 500px;
    border-radius: 30px;
    background: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(0);
    transition: 0.3s ease-in-out;
    overflow: hidden;
`;

export const SignInContainer = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    ${commonTransition}
`;

export const SignInFormContainer = styled.div`
    display: flex;
    max-width: 720px;
    width: 100%;
    height: 500px;
    border-radius: 30px;
    background: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(0);
    transition: 0.3s ease-in-out;
    overflow: hidden;
`;

export const LeftSection = styled.div`
    flex: 1.5;
    padding: 40px 30px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;

    h2 {
        margin-bottom: 2rem;
        font-size: 1.5rem;
        color: var(--text);
    }

    p {
        font-size: 0.875rem;
        margin-bottom: 1rem;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`;

export const RightSection = styled.div`
    flex: 2;
    position: relative;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(60%);
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
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
    background-color: #f9f9f9;
    color: #333;

    ::placeholder {
        color: hsl(155, 50%, 70%, 95%);
    }

    &:focus {
        border-color: #8c7569;
    }

    &:focus,
    &:valid {
        ~ label {
            top: -0.75rem;
            left: 0.5rem;
            font-size: 0.75rem;
            color: hsl(150, 17%, 5%, 80%);
            background: #f9f9f9;
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
    color: #8c7569;
    pointer-events: none;
    transition: all 0.2s ease-in-out;
`;

export const SubmitButton = styled.button`
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

export const LinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75em;
    margin-top: 20px;
    text-align: center;

    a {
        color: var(--accent);
        font-size: 14px;
        text-decoration: none;

        &:hover {
            color: hsl(155, 61%, 65%, 90%);
        }
    }
`;

export const ErrorMessage = styled.p`
    color: #e74c3c;
    font-size: 0.875rem;
    margin-bottom: 1rem;
`;
