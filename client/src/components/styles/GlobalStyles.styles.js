import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

    :root {
        --text: hsl(156, 42%, 5%);
        --background: hsl(150, 11%, 96%);
        --primary: hsl(155, 39%, 54%);
        --secondary: hsl(185, 19%, 75%);
        --accent: hsl(155, 23%, 60%);
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body {
        height: 100%;
        font-family: 'Roboto', sans-serif;
        font-weight: 400; /* Default weight */
    }


    html {
        font-size: 100%; /* 16px */
    }

    body {
        color: var(--text);
        background-color: var(--background);
    }

    /* Heading styles */
    h1, h2, h3, h4, h5 {
        font-family: 'Roboto', sans-serif;
        font-weight: 700; /* Bold weight for all headings */
    }

    h1 {
        font-size: 4.210rem; /* 67.36px */
    }

    h2 {
        font-size: 3.158rem; /* 50.56px */
    }

    h3 {
        font-size: 2.369rem; /* 37.92px */
    }

    h4 {
        font-size: 1.777rem; /* 28.48px */
    }

    h5 {
        font-size: 1.333rem; /* 21.28px */
    }

    small {
        font-size: 0.750rem; /* 12px */
    }

    a {
        color: var(--primary);
        text-decoration: none;
    }

    button {
        background-color: var(--accent);
        color: var(--text);
        font-family: 'Roboto', sans-serif; /* Optional: Apply to button text */
    }
    
    ul {
        list-style-type: none;
        padding-left: 0;
    }
`;

export default GlobalStyles;
