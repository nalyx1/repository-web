import { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../../contexts/auth';
import Nav from '../../components/navbar';
import Search from '../../components/search';
import Repositories from '../../components/repositories';
import Loading from '../../components/loading';

import {
    unfavoriteRepository,
    favoriteRepository,
    getRepositories,
    getUser,
    deleteRepository,
    getFavoritesRepositories,
} from '../../services/api';

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
    _id: string;
    username: string;
    email: string;
    myRepositories: string[];
    favoritesRepositories: string[];
}

const HomePage = () => {
    const { user, logout } = useContext(AuthContext);
    const [repositories, setRepositories] = useState<IRepositories[]>();
    const [userLogged, setUserLogged] = useState<IUser>();
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(false);
    const userId = user!.id;

    const loadData = useCallback(
        async (query = '') => {
            try {
                const responseRepositories = await getRepositories(userId, query);
                const responseUser = await getUser(userId);
                setRepositories(responseRepositories.data);
                setUserLogged(responseUser.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoadingError(true);
            }
        },
        [userId],
    );

    useEffect(() => {
        document.title = 'Home';
        (async () => await loadData())();
    }, [loadData]);

    const handleLogout = () => {
        logout();
    };

    const handlerDelete = async (repository: IRepositories) => {
        await deleteRepository(userId, repository._id);
        loadData();
    };

    const handlerFavorite = async (repository: IRepositories) => {
        await favoriteRepository(userId, repository._id);
        loadData();
    };

    const handlerUnfavorite = async (repository: IRepositories) => {
        await unfavoriteRepository(userId, repository._id);
        loadData();
    };

    const handleSearch = (query: string) => {
        loadData(query);
    };

    const handleMyRepositories = () => {
        loadData();
    };

    const handleFavoritesRepositories = async () => {
        const userFavorites = userLogged?.favoritesRepositories;
        const favorites = await getFavoritesRepositories(userFavorites);
        setRepositories(favorites.data);
    };

    if (loadingError) {
        return <Loading>Erro ao carregar.</Loading>;
    }

    if (loading) {
        return <Loading>Carregando...</Loading>;
    }

    return (
        <>
            <Nav onLogout={handleLogout} />
            <Search onSearch={handleSearch} />
            <Repositories
                repositories={repositories}
                user={userLogged}
                onDelete={handlerDelete}
                onFavorite={handlerFavorite}
                unFavorite={handlerUnfavorite}
                getMyRepositories={handleMyRepositories}
                getMyFavoritesRepositories={handleFavoritesRepositories}
            />
        </>
    );
};

export default HomePage;
