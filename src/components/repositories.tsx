import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { FunctionComponent } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';

const Wrapper = styled.div`
    max-width: 900px;
    margin: 0 auto;
    font-size: 1rem;
    display: flex;
    gap: 1rem;
`;

const RepositoriesList = styled.ul`
    list-style: none;
    flex: 1;

    li {
        padding: 10px 0;
        border-bottom: 1px solid;
    }
`;

const Organizer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const RepositoryOwner = styled.a`
    display: inline;
    font-size: 1.6rem;
    color: rgb(130, 87, 229);
    text-decoration: none;
`;

const RepositoryDescription = styled.div`
    font-size: 1rem;
    width: 70ch;
    word-wrap: break-word;
`;

const RepositoriesMenu = styled.div`
    max-width: 30vh;
    flex: 1;
    padding: 10px 0;
`;

const MenuItem = styled.a`
    border: 1px solid;
    border-radius: 5px;
    padding: 0.5rem;
    cursor: pointer;
    display: block;
    margin: 5px 0;
`;

const ItemsCount = styled.span`
    border: 1px solid;
    padding: 0 0.4rem;
    border-radius: 50%;
    float: right;
`;

interface RepositoriesProps {
    repositories: IRepositories[] | string | undefined;
    user: IUser | undefined;
    onDelete: (repository: IRepositories) => void;
    onFavorite: (repository: IRepositories) => void;
    unFavorite: (repository: IRepositories) => void;
    getMyRepositories: () => void;
    getMyFavoritesRepositories: () => void;
}

interface IRepositories {
    createdAt: string;
    description: string;
    name: string;
    owner: string;
    privateRepository: boolean;
    updateAt: string;
    url: string;
    userId: string;
    __v: number;
    _id: string;
}

interface IUser {
    username: string;
    email: string;
    myRepositories: string[];
    favoritesRepositories: string[];
}

const Repositories: FunctionComponent<RepositoriesProps> = ({
    repositories,
    user,
    onDelete,
    onFavorite,
    unFavorite,
    getMyRepositories,
    getMyFavoritesRepositories,
}) => {
    return (
        <Wrapper>
            <RepositoriesMenu>
                <MenuItem onClick={() => getMyRepositories()}>
                    Meus Repositorios
                    <ItemsCount>{user !== undefined ? user.myRepositories.length : 0}</ItemsCount>
                </MenuItem>
                <MenuItem onClick={() => getMyFavoritesRepositories()}>
                    Favoritos
                    <ItemsCount>{user !== undefined ? user.favoritesRepositories.length : 0}</ItemsCount>
                </MenuItem>
            </RepositoriesMenu>

            <RepositoriesList>
                {typeof repositories === 'object' ? (
                    repositories.map(repository => (
                        <li key={repository._id}>
                            <Organizer>
                                <RepositoryOwner href={repository.url} target="_blank">
                                    {repository.owner}/{repository.name}
                                </RepositoryOwner>

                                <IconContext.Provider
                                    value={{
                                        size: '1.5em',
                                        style: {
                                            color: 'rgb(130, 87, 229)',
                                            margin: '0px 5px',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    <div>
                                        {user?.username === repository.owner ? (
                                            <></>
                                        ) : user?.favoritesRepositories.includes(repository._id) ? (
                                            <AiFillHeart onClick={() => unFavorite(repository)} />
                                        ) : (
                                            <AiOutlineHeart onClick={() => onFavorite(repository)} />
                                        )}

                                        <BsTrash onClick={() => onDelete(repository)} />
                                    </div>
                                </IconContext.Provider>
                            </Organizer>
                            <RepositoryDescription>{repository.description}</RepositoryDescription>
                        </li>
                    ))
                ) : (
                    <h1>Repositório não encontrado.</h1>
                )}
            </RepositoriesList>
        </Wrapper>
    );
};

export default Repositories;
