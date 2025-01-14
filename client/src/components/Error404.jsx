import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const scaleUp = keyframes`
    0% {
        transform: scale(0.9);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
`;

const slideIn = keyframes`
    0% {
        transform: translateY(-30px);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background: var(--background);
    animation: ${fadeIn} 0.8s ease-out;
`;

const Content = styled.div`
    text-align: center;
    background: #fff;
    border-radius: 15px;
    padding: 40px 60px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    animation: ${scaleUp} 0.8s ease-out;
`;

const ErrorCode = styled.h1`
    font-size: 100px;
    color: var(--primary);
    margin-bottom: 10px;
    animation: ${slideIn} 0.8s ease-out;
`;

const ErrorMessage = styled.h2`
    font-size: 24px;
    color: var(--text);
    margin-bottom: 20px;
`;

const ErrorDescription = styled.p`
    font-size: 16px;
    color: var(--secondary);
    margin-bottom: 30px;
`;

const GoHomeButton = styled.a`
    font-size: 18px;
    color: #fff;
    background: var(--primary);
    padding: 12px 25px;
    text-decoration: none;
    border-radius: 30px;
    transition: background 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    &:hover {
        background: var(--accent);
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(1px);
    }
`;

const Error404 = () => {
    return (
        <Container>
            <Content>
                <ErrorCode>404</ErrorCode>
                <ErrorMessage>Oops! Page Not Found</ErrorMessage>
                <ErrorDescription>
                    Sorry, the page you&apos;re looking for doesn&apos;t exist
                    or has been moved.
                </ErrorDescription>
                <GoHomeButton href="/">Go to Homepage</GoHomeButton>
            </Content>
        </Container>
    );
};

export default Error404;
