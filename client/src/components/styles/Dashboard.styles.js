import styled from 'styled-components';

export const DashboardContainer = styled.div`
    padding-top: 70px;
    display: flex;
    flex-direction: column;
    background-color: var(--background);
    color: var(--text);
    height: 100%; 
    box-sizing: border-box;
`;

export const DashboardContent = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    overflow-x: hidden;
`;

export const MainContainer = styled.main`
    /* border: 2px solid red; */
    margin-left: 220px;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    box-sizing: border-box;
`;
