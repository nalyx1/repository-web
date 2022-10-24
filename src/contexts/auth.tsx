import { createContext, ReactNode, FunctionComponent, useState, useEffect } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { createSession, api } from '../services/api';

interface LoadingProps {
    children: ReactNode;
}

interface ISession {
    id: string;
    email: string;
    token: string;
}

interface IProvider {
    authenticated: boolean;
    user: ISession | null;
    navigate: NavigateFunction;
    loading: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = createContext({} as IProvider);

export const AuthProvider: FunctionComponent<LoadingProps> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<ISession | null>(null);
    const [loading, setLoading] = useState(true);

    const login = async (email: string, password: string) => {
        try {
            const response = await createSession(email, password);
            const { user, token } = response.data;

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', JSON.stringify(token));
            setUser(user);

            api.defaults.headers.Authorization = `Bearer ${token}`;
            navigate('/');
        } catch (error: any) {
            alert(error.response.data.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);

        api.defaults.headers.Authorization = null;
        navigate('/login');
    };

    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (user && token) {
            setUser(JSON.parse(user));
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        }

        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                authenticated: !!user,
                user,
                navigate,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
