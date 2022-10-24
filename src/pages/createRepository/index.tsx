import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth';
import { createRepository } from '../../services/api';
import Nav from '../../components/navbar';
import CreateRepositoryForm from '../../components/createRepositoryForm';

const CreateRepository = () => {
    useEffect(() => {
        document.title = 'Crie seu repositório';
    }, []);

    const { logout, user, navigate } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    };

    const handleToggle = (isChecked: boolean, setChecked: React.Dispatch<React.SetStateAction<boolean>>) => {
        setChecked(prevState => !prevState);
    };

    const handleCreateRepository = async (name: string, url: string, description: string, isChecked: boolean) => {
        try {
            await createRepository(user!.id, name, url, description, isChecked);

            alert('Repositorio criado com sucesso!');
            navigate('/');
        } catch (error: any) {
            alert(error.response.data.message);
        }
    };

    return (
        <>
            <Nav onLogout={handleLogout} />
            <CreateRepositoryForm toggle={handleToggle} onCreate={handleCreateRepository} />
        </>
    );
};

export default CreateRepository;
