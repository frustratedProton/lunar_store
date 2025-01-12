/* eslint-disable react/prop-types */
import {
    IconContainer,
    IconWrapper,
    Logo,
    LogoContainer,
    Navbar,
    SearchContainer,
    SearchInput,
    FlexWrapper,
} from '../styles/Navbar.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faCog,
    faUserCircle,
    faBell,
} from '@fortawesome/free-solid-svg-icons';

const NavbarComponent = ({ searchQuery, handleSearch }) => {
    return (
        <Navbar>
            <LogoContainer>
                <Logo
                    src="../..//public/Lunar_Store.png"
                    alt="Lunar Store Logo"
                />
            </LogoContainer>

            <FlexWrapper>
                <SearchContainer>
                    <FontAwesomeIcon icon={faSearch} />
                    <SearchInput
                        type="text"
                        placeholder="Search Drive"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </SearchContainer>

                <IconContainer>
                    <IconWrapper>
                        <FontAwesomeIcon icon={faCog} />
                    </IconWrapper>
                    <IconWrapper>
                        <FontAwesomeIcon icon={faBell} />
                    </IconWrapper>
                    <IconWrapper>
                        <FontAwesomeIcon icon={faUserCircle} />
                    </IconWrapper>
                </IconContainer>
            </FlexWrapper>
        </Navbar>
    );
};

export default NavbarComponent;
