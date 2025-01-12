import SignInForm from './components/Auth/SignIn';
import SignUpForm from './components/Auth/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/Utils/PrivateRoute';
import Dashboard from './components/Utils/Dashboard';
import FileDetails from './components/File/FileDetails';
import FolderList from './components/Folder/FolderList';
import FolderDetails from './components/Folder/FolderDetails';
import DashboardLayout from './components/DashboardLayout';
import FilesList from './components/File/FileList';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/signup" element={<SignUpForm />} />
                    <Route path="/signin" element={<SignInForm />} />

                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <DashboardLayout />{' '}
                            </PrivateRoute>
                        }
                    >
                        <Route index element={<Dashboard />} />{' '}
                        <Route path="files" element={<FilesList />} />
                        <Route path="files/:id" element={<FileDetails />} />
                        <Route path="folders" element={<FolderList />} />
                        <Route
                            path="folders/:folderId"
                            element={<FolderDetails />}
                        />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
