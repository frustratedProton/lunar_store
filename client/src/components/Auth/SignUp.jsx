import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    FloatingLabelContainer,
    InputField,
    FloatingLabel,
    SubmitButton,
    BackgroundContainer,
    LeftSection,
    RightSection,
    SignUpFormContainer,
    LinksContainer,
    StyledHeading,
} from '../styles/Auth.styles';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:3000/auth/sign-up',
                { username, email, password },
                { withCredentials: true }
            );
            if (response.status === 201) {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <BackgroundContainer>
            <SignUpFormContainer>
                <LeftSection>
                    <StyledHeading>Sign Up</StyledHeading>
                    {error && <p>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <FloatingLabelContainer>
                            <InputField
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <FloatingLabel htmlFor="username">
                                Username
                            </FloatingLabel>
                        </FloatingLabelContainer>

                        <FloatingLabelContainer>
                            <InputField
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <FloatingLabel htmlFor="email">Email</FloatingLabel>
                        </FloatingLabelContainer>

                        <FloatingLabelContainer>
                            <InputField
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <FloatingLabel htmlFor="password">
                                Password
                            </FloatingLabel>
                        </FloatingLabelContainer>

                        <SubmitButton type="submit">Sign Up</SubmitButton>
                    </form>
                    <LinksContainer>
                        <a href="/signin">Already have an account? Sign in</a>
                    </LinksContainer>
                </LeftSection>
                <RightSection>
                    <img src="samsung-memory-unsplash.webp" alt="Background" />
                </RightSection>
            </SignUpFormContainer>
        </BackgroundContainer>
    );
};

export default SignUp;
