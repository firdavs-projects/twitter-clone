import { IEditBody, ILoginBody, IRegistrationBody, IUserData } from './types';
import { routes } from './routes';
import { ApiMethods } from './constants';
import { getLocalStorage } from './localStorage';

export const getLogin = async (body: ILoginBody) => {
    return (
        await fetch(routes.login, {
            method: ApiMethods.POST,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    ).json();
};

export const getRegistration = async (body: IRegistrationBody) => {
    return (
        await fetch(routes.registration, {
            method: ApiMethods.POST,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    ).json();
};

export const getAllUserTweets = async () => {
    const token = getLocalStorage();
    return (
        await fetch(routes.myTweets, {
            method: ApiMethods.GET,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    ).json();
};

export const getTweetsBySubscriptions = async () => {
    const token = getLocalStorage();
    return (
        await fetch(routes.tweetsBySubscriptions, {
            method: ApiMethods.GET,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    ).json();
};

export const getUser = async () => {
    const token = getLocalStorage();
    return (
        await fetch(routes.user, {
            method: ApiMethods.GET,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    ).json();
};

export const getUserById = async (id: string) => {
    const token = getLocalStorage();
    return (
        await fetch(routes.userById(id), {
            method: ApiMethods.GET,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    ).json();
};

export const getTweetById = async (id: string) => {
    const token = getLocalStorage();
    return (
        await fetch(routes.tweetById(id), {
            method: ApiMethods.GET,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    ).json();
};

export const editPost = async (id: string, body: IEditBody) => {
    const token = getLocalStorage();
    return (
        await fetch(routes.tweetById(id), {
            method: ApiMethods.PUT,
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
    ).json();
};

export const deletePost = async (id: string) => {
    const token = getLocalStorage();
    return (
        await fetch(routes.tweetById(id), {
            method: ApiMethods.DELETE,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    ).json();
};

export const saveProfileInfo = async (body: IUserData) => {
    const token = getLocalStorage();
    return (
        await fetch(routes.profile, {
            method: ApiMethods.PUT,
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
    ).json();
};

export const addLike = async (id: string) => {
    const token = getLocalStorage();
    return (
        await fetch(routes.likeByPostId(id), {
            method: ApiMethods.POST,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    ).json();
};

export const deleteLike = async (id: string) => {
    const token = getLocalStorage();
    return (
        await fetch(routes.likeByPostId(id), {
            method: ApiMethods.DELETE,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    ).json();
};
