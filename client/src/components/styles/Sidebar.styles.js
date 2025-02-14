import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Sidebar = styled.nav`
    height: 100vh;
    width: 220px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.03);
    overflow-x: hidden;
    overflow-y: hidden;
    padding: 1em;
    padding-top: 6em;
    box-sizing: border-box;
`;

export const SidebarList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const SidebarItem = styled.li`
    margin-bottom: 15px;
`;

export const SidebarLink = styled(NavLink)`
    display: flex;
    align-items: center;
    padding: 12px 20px;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 50px;
    gap: 10px;
    position: relative;
    transition: background-color 0.3s ease, color 0.3s ease;

    &.active {
        background-color: hsl(155, 23%, 60%, 60%);
        animation: pulse 1s infinite;
        box-shadow: 0 0 3px rgba(155, 23, 60, 0.3);
        color: hsl(156, 42%, 5%, 90%);
        border-right: 2px solid var(--accent);
        transform: scale(1.01);

        span {
            color: hsl(156, 42%, 5%, 95%);
        }

        svg {
            color: hsl(135, 31%, 5%);
        }

        &:hover {
            svg {
                color: hsl(135, 31%, 5%);
            }
        }
    }

    &:hover {
        span {
            color: hsl(156, 42%, 5%, 95%);
        }

        svg {
            color: hsl(155, 23%, 60%, 80%);
        }
    }

    span {
        color: hsl(156, 42%, 5%, 65%);
        transition: color 0.3s ease;

        &.active {
            color: hsl(156, 42%, 5%, 95%);
        }
    }

    svg {
        color: hsl(155, 23%, 60%, 65%);
        font-size: 1.2rem;
        transition: color 0.3s ease;

        &.active {
            color: var(--accent);
        }
    }
`;

export const CreateButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    background-color: var(--accent);
    color: white;
    text-decoration: none;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 6px;
    border: none;
    transition: background-color 0.3s, transform 0.2s;

    &:hover {
        background-color: var(--primary);
    }

    svg {
        font-size: 1.2rem;
    }
`;
