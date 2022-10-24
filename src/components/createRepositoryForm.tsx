import { useState, FunctionComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin: 50px auto;
    max-width: 720px;
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
    margin-top: 25px;
    cursor: pointer;
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

const Description = styled.textarea`
    background: rgb(18, 18, 20);
    margin-top: 2px;
    border: 2px solid rgb(40, 39, 44);
    border-radius: 5px;
    color: rgb(255, 255, 255);
    font-size: 1rem;
    width: 100%;
    padding: 15px 21px;
    resize: none;
`;

const CheckBoxWrapper = styled.div`
    position: relative;
    margin-top: 10px;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const CheckBoxLabel = styled.label`
    position: absolute;
    top: 0;
    left: 0;
    width: 42px;
    height: 26px;
    border-radius: 15px;
    background: #bebebe;
    cursor: pointer;
    &::after {
        content: '';
        display: block;
        border-radius: 50%;
        width: 18px;
        height: 20px;
        margin: 3px;
        background: #ffffff;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
        transition: 0.2s;
    }
`;

const CheckBox = styled.input`
    opacity: 0;
    z-index: 1;
    border-radius: 15px;
    width: 42px;
    height: 26px;
    &:checked + ${CheckBoxLabel} {
        background: rgb(130, 87, 229);
        &::after {
            content: '';
            display: block;
            border-radius: 50%;
            width: 18px;
            height: 20px;
            margin-left: 21px;
            transition: 0.2s;
        }
    }
`;

interface ICreateRepository {
    toggle: (state: boolean, uState: React.Dispatch<React.SetStateAction<boolean>>) => void;
    onCreate: (name: string, url: string, description: string, isChecked: boolean) => void;
}

const CreateRepositoryForm: FunctionComponent<ICreateRepository> = ({ toggle, onCreate }) => {
    const [isChecked, setChecked] = useState(false);
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');

    return (
        <Wrapper>
            <Form>
                <Title>Crie um repositório</Title>

                <Input
                    placeholder="Nome do repositório"
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Input
                    placeholder="Url do repositório"
                    type="url"
                    name="url"
                    id="url"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                />
                <Description
                    placeholder="Escreva uma descrição para seu repositório"
                    name="textarea"
                    id="textarea"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={10}
                />

                <CheckBoxWrapper>
                    <CheckBox id="checkbox" type="checkbox" onClick={() => toggle(isChecked, setChecked)} />
                    <CheckBoxLabel htmlFor="checkbox" />
                    Repositório Privado?
                </CheckBoxWrapper>

                <Button onClick={() => onCreate(name, url, description, isChecked)}>CRIAR</Button>
            </Form>
        </Wrapper>
    );
};

export default CreateRepositoryForm;
