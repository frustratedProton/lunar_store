import { Outlet } from 'react-router-dom';
import {
    DashboardContainer,
    DashboardContent,
    MainContainer,
} from './styles/Dashboard.styles';
import NavbarComponent from './Utils/Navbar';
import SidebarComponent from './Utils/Sidebar';
import { useState } from 'react';

const DashboardLayout = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <DashboardContainer>
            <NavbarComponent
                searchQuery={searchQuery}
                handleSearch={handleSearch}
            />
            <DashboardContent>
                <SidebarComponent />
                <MainContainer>
                    <Outlet context={{ searchQuery }} />
                </MainContainer>
            </DashboardContent>
        </DashboardContainer>
    );
};

export default DashboardLayout;
