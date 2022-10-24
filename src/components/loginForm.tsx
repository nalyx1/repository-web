import styled from 'styled-components';
import { useState, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2rem;
    width: 100%;
    min-height: 80vh;
`;

const Form = styled.div`
    background-color: rgb(32, 32, 36);
    flex-direction: column;
    max-width: 480px;
    width: 100%;
    border-radius: 5px;
    padding: 32px 64px 64px 64px;
`;

const Title = styled.div`
    font-size: 3rem;
    text-align: center;
    padding-bottom: 32px;
    color: rgb(255, 255, 255);
`;

const Button = styled.button`
    height: 40px;
    width: 100%;
    border: 2px solid rgb(40, 39, 44);
    border-radius: 5px;
    background: rgb(130, 87, 229);
    color: rgb(255, 255, 255);
    font-size: 1rem;
    cursor: pointer;
`;

const Field = styled.div`
    margin: 10px auto;
`;

const Input = styled.input`
    background: rgb(18, 18, 20);
    border: 2px solid rgb(40, 39, 44);
    border-radius: 5px;
    height: 40px;
    padding: 15px 21px;
    color: rgb(255, 255, 255);
    font-size: 17px;
    width: 100%;
`;

const Register = styled.div`
    margin-top: 10px;
    font-size: 1rem;
    text-align: center;
`;

const LinkStyle = styled(Link)`
    color: rgb(130, 87, 229);
    text-decoration: none;
`;

interface ILogin {
    onLogin: (email: string, password: string) => void;
}

const LoginForm: FunctionComponent<ILogin> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Wrapper>
            <Form>
                <Title>LOGIN</Title>

                <Field>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Field>

                <Field>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Field>

                <Button onClick={() => onLogin(email, password)}>ENTRAR</Button>
                <Register>
                    Não tem uma conta? <LinkStyle to="/signup">Registre-se</LinkStyle>
                </Register>
            </Form>
        </Wrapper>
    );
};

export default LoginForm;
