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
	DropdownMenu,
	DropdownItem,
	DropdownHeader,
	ProfilePicture,
	ProfileName,
} from '../styles/Navbar.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faSearch,
	faCog,
	faUserCircle,
	faBell,
	faEdit,
	faQuestionCircle,
	faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const NavbarComponent = ({ searchQuery, handleSearch }) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const [dropdownVisible, setDropdownVisible] = useState(false);

	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				// const response = await axios.get(
				//     'http://localhost:3000/auth/me',
				//     { withCredentials: true }
				// );

				const response = await api.get('/auth/me');
				setUser(response.data.user);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUserDetails();
	}, []);

	const handleLogout = async () => {
		try {
			// await axios.post(
			//     'http://localhost:3000/auth/log-out',
			//     {},
			//     { withCredentials: true }
			// );
			await api.post('/auth/log-out');

			setUser(null);
			navigate('/signin');
		} catch (error) {
			console.error('Logout failed', error);
		}
	};

	const handleDropdownToggle = () => {
		setDropdownVisible((prev) => !prev);
	};

	return (
		<Navbar>
			<LogoContainer>
				<Logo src="/lunar_store_trial2.svg" alt="Lunar Store Logo" />
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
					<IconWrapper onClick={handleDropdownToggle}>
						<FontAwesomeIcon icon={faUserCircle} />
						{dropdownVisible && (
							<DropdownMenu>
								<DropdownHeader>
									<ProfilePicture
										src="https://placehold.co/128x128/000000/FFFFFF.png"
										alt="Profile"
									/>
									<ProfileName>
										Hi, {user?.username}!
									</ProfileName>
								</DropdownHeader>
								<DropdownItem>
									<FontAwesomeIcon
										icon={faEdit}
										style={{ marginRight: '10px' }}
									/>
									Edit profile
								</DropdownItem>
								<DropdownItem>
									<FontAwesomeIcon
										icon={faQuestionCircle}
										style={{ marginRight: '10px' }}
									/>
									Help
								</DropdownItem>
								<DropdownItem onClick={handleLogout}>
									<FontAwesomeIcon
										icon={faSignOutAlt}
										style={{ marginRight: '10px' }}
									/>
									Logout
								</DropdownItem>
							</DropdownMenu>
						)}
					</IconWrapper>
				</IconContainer>
			</FlexWrapper>
		</Navbar>
	);
};

export default NavbarComponent;
