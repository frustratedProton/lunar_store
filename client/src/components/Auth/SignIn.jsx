import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    SignInContainer,
    SignInFormContainer,
    LeftSection,
    RightSection,
    InputField,
    SubmitButton,
    ErrorMessage,
    FloatingLabel,
    FloatingLabelContainer,
    BackgroundContainer,
    LinksContainer,
    StyledHeading,
} from '../styles/Auth.styles';

const SignInForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = formData;

        try {
            const response = await axios.post(
                'http://localhost:3000/auth/sign-in',
                { username, password },
                { withCredentials: true }
            );
            if (response.status === 200) {
                navigate('/');
            }
        } catch (err) {
            setError('Invalid username or password');
            console.error(err);
        }
    };

    useEffect(() => {
        setIsOpen(true);
    }, []);

    return (
        <BackgroundContainer>
            <SignInContainer className={isOpen ? 'is-open' : ''}>
                <SignInFormContainer>
                    <LeftSection>
                        <StyledHeading>Sign In</StyledHeading>
                        <form onSubmit={handleSubmit}>
                            <FloatingLabelContainer>
                                <InputField
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                                <FloatingLabel htmlFor="username">
                                    Username
                                </FloatingLabel>
                            </FloatingLabelContainer>

                            <FloatingLabelContainer>
                                <InputField
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <FloatingLabel htmlFor="password">
                                    Password
                                </FloatingLabel>
                            </FloatingLabelContainer>

                            {error && <ErrorMessage>{error}</ErrorMessage>}

                            <SubmitButton type="submit">Sign In</SubmitButton>
                        </form>

                        <LinksContainer>
                            <a href="#">Forgot your password?</a>
                            <a href="/signup">
                                Don&apos;t have an account? Sign up now
                            </a>
                        </LinksContainer>
                    </LeftSection>

                    <RightSection>
                        <img
                            src="samsung-memory-unsplash.webp"
                            alt="background"
                        />
                    </RightSection>
                </SignInFormContainer>
            </SignInContainer>
        </BackgroundContainer>
    );
};

export default SignInForm;
