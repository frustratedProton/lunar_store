import { useLocation } from 'react-router-dom';
import {
    Sidebar,
    SidebarItem,
    SidebarLink,
    SidebarList,
} from '../styles/Sidebar.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFile, faFolder } from '@fortawesome/free-solid-svg-icons';

const SidebarComponent = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <Sidebar>
            <SidebarList>
                <SidebarItem>
                    {/* $isActive is a transient prop, not be consumed by DOM -- https://styled-components.com/docs/api#transient-props */}
                    <SidebarLink to="/" $isActive={isActive('/')}>
                        <FontAwesomeIcon icon={faHome} />
                        <span>Dashboard</span>
                    </SidebarLink>
                </SidebarItem>
                <SidebarItem>
                    <SidebarLink to="/files" $isActive={isActive('/files')}>
                        <FontAwesomeIcon icon={faFile} />
                        <span>Files</span>
                    </SidebarLink>
                </SidebarItem>
                <SidebarItem>
                    <SidebarLink to="/folders" $isActive={isActive('/folders')}>
                        <FontAwesomeIcon icon={faFolder} />
                        <span>Folders</span>
                    </SidebarLink>
                </SidebarItem>
            </SidebarList>
        </Sidebar>
    );
};

export default SidebarComponent;
