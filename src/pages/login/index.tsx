import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth';
import LoginForm from '../../components/loginForm';
import Nav from '../../components/navbar';

const LoginPage = () => {
    useEffect(() => {
        document.title = 'Login';
    }, []);

    const { login } = useContext(AuthContext);

    const handleLogin = (email: string, password: string) => {
        login(email, password);
    };

    return (
        <>
            <Nav />
            <LoginForm onLogin={handleLogin} />
        </>
    );
};

export default LoginPage;
