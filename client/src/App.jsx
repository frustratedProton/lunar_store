import SignInForm from './components/Auth/SignIn';
import SignUpForm from './components/Auth/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/signup" element={<SignUpForm />} />
                    <Route path="/signin" element={<SignInForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
