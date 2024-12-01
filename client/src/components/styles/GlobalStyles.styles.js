import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --text: hsl(220, 9%, 7%);
    --background: hsl(216, 16%, 94%);
    --primary: hsl(212, 25%, 30%);
    --secondary: hsl(211, 35%, 70%);
    --accent: hsl(212, 43%, 44%);
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --text: hsl(220, 9%, 93%);
      --background: hsl(216, 16%, 6%);
      --primary: hsl(212, 25%, 70%);
      --secondary: hsl(211, 35%, 30%);
      --accent: hsl(212, 43%, 56%);
    }
  }

  body {
    color: var(--text);
    background-color: var(--background);
  }
  
  a {
    color: var(--primary);
  }
  
  button {
    background-color: var(--accent);
    color: var(--text);
  }
`;

export default GlobalStyles;
