import styled from 'styled-components';

export const Navbar = styled.nav`
    position: fixed;
    z-index: 1000;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px;
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
    width: 170px;
    object-fit: contain;
    display: block;
`;

export const FlexWrapper = styled.div`
    margin-left: 1.25em;
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
    position: relative;
`;

export const DropdownMenu = styled.div`
    position: absolute;
    top: 35px; 
    right: 0;
    padding: 20px 30px;
    background-color: var(--background);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    border: 2px solid var(--accent);
    border-radius: 8px;
    width: 250px;
    display: block;
    visibility: visible;
    opacity: 1;
    transition: opacity 0.3s ease;
`;

export const DropdownHeader = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 15px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 15px;
    justify-content: flex-start;
`;

export const ProfilePicture = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
`;

export const ProfileName = styled.div`
    font-size: 1.1rem;
    font-weight: 500;
    color: #555;
`;

export const DropdownItem = styled.div`
    padding: 10px 0;
    color: #555;
    font-size: 1rem;
    cursor: pointer;
    border-bottom: 1px solid #ddd;

    &:hover {
        background-color: hsl(155, 39%, 60%, 10%);
        color: var(--primary);
    }

    &:last-child {
        border-bottom: none;
    }
`;
