import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    SignUpContainer,
    FloatingLabelContainer,
    InputField,
    FloatingLabel,
    SubmitButton,
} from '../styles/Auth.styles'

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
                { username, email, password }
            );
            if (response.status === 201) {
                navigate('/signin');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <SignUpContainer>
            <h2>Sign Up</h2>
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
                    <FloatingLabel htmlFor="username">Username</FloatingLabel>
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
                    <FloatingLabel htmlFor="password">Password</FloatingLabel>
                </FloatingLabelContainer>

                <SubmitButton type="submit">Sign Up</SubmitButton>
            </form>
        </SignUpContainer>
    );
};

export default SignUp;
