import SignInForm from './components/Auth/SignIn';
import SignUpForm from './components/Auth/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/Utils/PrivateRoute';
import Dashboard from './components/Utils/Dashboard';
import FileDetails from './components/File/FileDetails';
import FolderList from './components/Folder/FolderList'; // Add the folder list component
import FolderDetails from './components/Folder/FolderDetails'; // Add the folder details component

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/signup" element={<SignUpForm />} />
                    <Route path="/signin" element={<SignInForm />} />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/files/:id"
                        element={
                            <PrivateRoute>
                                <FileDetails />
                            </PrivateRoute>
                        }
                    />
                    {/* Folder Routes */}
                    <Route
                        path="/folders"
                        element={
                            <PrivateRoute>
                                <FolderList />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/folders/:folderId"
                        element={
                            <PrivateRoute>
                                <FolderDetails />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
