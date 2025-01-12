import styled from 'styled-components';

export const Navbar = styled.nav`
    position: fixed;
    z-index: 1000;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: var(--background);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    color: var(--text);
`;

export const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 50px;
    flex-shrink: 0;
    margin-right: 20px;
`;

export const Logo = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: block;
    height: 50px;
`;

export const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    gap: 10px;
`;

export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 250px;
    padding: 6px 12px;
    border: 2px solid var(--accent); 
    background-color: var(--background);
    transition: border-color 0.3s;
    border-radius: 16px;
    height: 35px;
    color: var(--text);
`;

export const SearchInput = styled.input`
    border: none;
    outline: none;
    background: transparent;
    padding: 6px 8px;
    width: 100%;
    font-size: 0.9rem;
    color: var(--text);
`;

export const IconContainer = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
    font-size: 1.2rem;
    justify-content: flex-end;
    color: var(--primary);
`;

export const IconWrapper = styled.div`
    cursor: pointer;
    font-size: 1.2rem;
    transition: color 0.3s;
    color: hsl(155, 39%, 54%, 95%);
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
`;

export const ProfilePicture = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    margin-left: 15px;
    border: 2px solid var(--accent);
`;
