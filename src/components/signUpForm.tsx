import { useState, FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    margin: 50px auto;
    max-width: 480px;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
`;

const Form = styled.div`
    background-color: rgb(32, 32, 36);
    flex-direction: column;
    flex: 1;
    border-radius: 5px;
    padding: 32px 48px 48px 48px;
`;

const Title = styled.div`
    font-size: 48px;
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
    margin-top: 25px;
    cursor: pointer;
`;

const Password = styled.div`
    flex-direction: row;
    display: flex;
    gap: 4px;
`;

const Input = styled.input`
    background: rgb(18, 18, 20);
    border: 2px solid rgb(40, 39, 44);
    border-radius: 5px;
    height: 40px;
    padding: 15px 21px;
    color: rgb(255, 255, 255);
    font-size: 1rem;
    width: 100%;
    margin: 2px auto;
`;

const InputError = styled.input`
    background: rgb(18, 18, 20);
    border: 2px solid rgb(175, 30, 30);
    border-radius: 5px;
    height: 40px;
    padding: 15px 21px;
    color: rgb(255, 255, 255);
    font-size: 1rem;
    width: 100%;
    margin: 2px auto;
`;

const BackToLogin = styled.span`
    font-size: 1rem;
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
`;

const LinkStyle = styled(Link)`
    color: rgb(130, 87, 229);
    text-decoration: none;
`;

interface ISignUp {
    onSignUp: (email: string, username: string, password: string, cpassword: string) => void;
}

const SignUpForm: FunctionComponent<ISignUp> = ({ onSignUp }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [Cpassword, setCPassword] = useState('');

    return (
        <Wrapper>
            <Form>
                <Title>Crie sua conta</Title>

                <Input
                    placeholder="Seu Email"
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <Input
                    placeholder="Seu Username"
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />

                <Password>
                    <Input
                        placeholder="Sua Senha"
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {password === Cpassword ? (
                        <Input
                            placeholder="Confirme sua senha"
                            type="password"
                            name="Cpassword"
                            id="Cpassword"
                            value={Cpassword}
                            onChange={e => setCPassword(e.target.value)}
                        />
                    ) : (
                        <InputError
                            placeholder="Confirme sua senha"
                            type="password"
                            name="Cpassword"
                            id="Cpassword"
                            value={Cpassword}
                            onChange={e => setCPassword(e.target.value)}
                        />
                    )}
                </Password>

                <Button onClick={() => onSignUp(email, username, password, Cpassword)}>CADASTRAR</Button>
                <BackToLogin>
                    <LinkStyle to="/login">Voltar para o login</LinkStyle>
                </BackToLogin>
            </Form>
        </Wrapper>
    );
};

export default SignUpForm;
