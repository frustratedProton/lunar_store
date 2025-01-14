import SignInForm from './components/Auth/SignIn';
import SignUpForm from './components/Auth/SignUp';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './components/Utils/PrivateRoute';
import Dashboard from './components/Utils/Dashboard';
import FileDetails from './components/File/FileDetails';
import FolderList from './components/Folder/FolderList';
import FolderDetails from './components/Folder/FolderDetails';
import DashboardLayout from './components/DashboardLayout';
import FilesList from './components/File/FileList';
import Error404 from './components/Error404';

const Router = createBrowserRouter([
    {
        path: '/signup',
        element: <SignUpForm />,
    },
    {
        path: '/signin',
        element: <SignInForm />,
    },
    {
        path: '/',
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'files', element: <FilesList /> },
            { path: 'files/:id', element: <FileDetails /> },
            { path: 'folders', element: <FolderList /> },
            { path: 'folders/:folderId', element: <FolderDetails /> },
        ],
    },
    {
        path: '*',
        element: <Error404 />,
    },
]);

export default Router;
