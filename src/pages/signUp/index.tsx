import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth';
import { createUser } from '../../services/api';
import Nav from '../../components/navbar';
import SignUpForm from '../../components/signUpForm';

const SignUpPage = () => {
    useEffect(() => {
        document.title = 'Cadastro';
    }, []);

    const { navigate } = useContext(AuthContext);

    const handleSignUp = async (email: string, username: string, password: string, cpassword: string) => {
        try {
            if (password !== cpassword) {
                return alert('Senhas não coincidem!');
            }

            await createUser(email, username, password);

            alert('Usuario criado com sucesso!');
            navigate('/login');
        } catch (error: any) {
            alert(error.response.data.message);
        }
    };

    return (
        <>
            <Nav />
            <SignUpForm onSignUp={handleSignUp} />
        </>
    );
};
export default SignUpPage;
