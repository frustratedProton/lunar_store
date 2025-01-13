import {
    Sidebar,
    SidebarItem,
    SidebarLink,
    SidebarList,
} from '../styles/Sidebar.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFile, faFolder } from '@fortawesome/free-solid-svg-icons';

const SidebarComponent = () => {
    return (
        <Sidebar>
            <SidebarList>
                <SidebarItem>
                    <SidebarLink to="/" end>
                        <FontAwesomeIcon icon={faHome} />
                        <span>Dashboard</span>
                    </SidebarLink>
                </SidebarItem>
                <SidebarItem>
                    <SidebarLink to="/files">
                        <FontAwesomeIcon icon={faFile} />
                        <span>Files</span>
                    </SidebarLink>
                </SidebarItem>
                <SidebarItem>
                    <SidebarLink to="/folders">
                        <FontAwesomeIcon icon={faFolder} />
                        <span>Folders</span>
                    </SidebarLink>
                </SidebarItem>
            </SidebarList>
        </Sidebar>
    );
};

export default SidebarComponent;
