import axios from 'axios';
import apiConfig from '../config/api';

export const api = axios.create({
    baseURL: apiConfig.url,
});

export const getRepositories = async (userId: string, query: string) => {
    let url = `/users/${userId}/repositories`;

    if (query) {
        url += `/search/?q=${query}`;
    }

    return api.get(url);
};

export const getFavoritesRepositories = async (favoritesList: string[] | undefined) => {
    let url = `users/favorites`;

    return api.post(url, { repositoryId: favoritesList });
};

export const getUser = async (userId: string) => {
    let url = `/users/${userId}`;

    return api.get(url);
};

export const createSession = async (email: string, password: string) => {
    let url = `/sessions`;

    return api.post(url, { email, password });
};

export const createRepository = async (
    userId: string,
    name: string,
    url: string,
    description: string,
    privateRepository: boolean,
) => {
    let urlServer = `/users/${userId}/repositories`;

    return api.post(urlServer, { name, url, description, privateRepository });
};

export const createUser = async (email: string, username: string, password: string) => {
    let url = `/users`;

    return api.post(url, { email, username, password });
};

export const deleteRepository = async (userId: string, repositoryId: string) => {
    let url = `/users/${userId}/repositories/${repositoryId}`;

    api.put(url);
    return api.delete(url);
};

export const favoriteRepository = async (userId: string, repositoryId: string) => {
    let url = `/users/${userId}/repositories/favorite/${repositoryId}`;

    return api.put(url);
};

export const unfavoriteRepository = async (userId: string, repositoryId: string) => {
    let url = `/users/${userId}/repositories/unfavorite/${repositoryId}`;

    return api.put(url);
};
