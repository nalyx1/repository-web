import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useContext, FunctionComponent } from 'react';
import { AuthProvider, AuthContext } from './contexts/auth';
import Loading from './components/loading';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import SignUpPage from './pages/signUp';
import CreateRepository from './pages/createRepository';

const AppRoutes = () => {
    const Auth: FunctionComponent<any> = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <Loading>Carregando...</Loading>;
        }
        if (!authenticated) {
            return <Navigate to="/login" />;
        }

        return children;
    };
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/"
                        element={
                            <Auth>
                                <HomePage />
                            </Auth>
                        }
                    />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/create-repository" element={<CreateRepository />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes;
