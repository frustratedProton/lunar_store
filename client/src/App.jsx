import SignInForm from './components/Auth/SignIn';
import SignUpForm from './components/Auth/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/Utils/PrivateRoute';
import Dashboard from './components/Utils/Dashboard';
import FileDetails from './components/File/FileDetails';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/signup" element={<SignUpForm />} />
                    <Route path="/signin" element={<SignInForm />} />
                    <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path='/files/:id' element={<PrivateRoute><FileDetails /></PrivateRoute>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
