import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
                navigate('/dashboard');
            }
        } catch (err) {
            setError('Invalid username or password');
            console.error(err);
        }
    };

    return (
        <div className="sign-in-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignInForm;
