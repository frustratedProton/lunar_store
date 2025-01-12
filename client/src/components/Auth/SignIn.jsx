import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    SignUpContainer as SignInContainer,
    FloatingLabelContainer,
    InputField,
    FloatingLabel,
    SubmitButton,
} from '../styles/Auth.styles';
import styled from 'styled-components';

export const ErrorMessage = styled.p`
    color: var(--accent);
    font-size: 0.875rem;
    margin-bottom: 1rem;
`;

const SignInForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');

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

    return (
        <SignInContainer>
            <h2>Sign In</h2>
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
                    <FloatingLabel htmlFor="username">Username</FloatingLabel>
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
                    <FloatingLabel htmlFor="password">Password</FloatingLabel>
                </FloatingLabelContainer>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <SubmitButton type="submit">Sign In</SubmitButton>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;
