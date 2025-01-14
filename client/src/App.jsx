import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';

const App = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
                    rel="stylesheet"
                />
            </Helmet>
            <div className="App">
                <RouterProvider router={Router} />
            </div>
        </HelmetProvider>
    );
};

export default App;
