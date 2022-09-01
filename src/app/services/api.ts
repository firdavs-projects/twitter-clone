import { ILoginBody, IRegistrationBody } from './types';
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

export const getTweetsByUserId = async (id: string) => {
  const token = getLocalStorage();
  return (
    await fetch(routes.tweetsByUserId(id), {
      method: ApiMethods.GET,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
};

export const getTweetsByUsername = async (username: string) => {
    const token = getLocalStorage();
    return (
        await fetch(routes.tweetsByUserId(username), {
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

export const getUserByName = async (name: string) => {
  const token = getLocalStorage();
  return (
    await fetch(routes.userByName(name), {
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

export const editPost = async (id: string, formData: FormData) => {
  const token = getLocalStorage();
  return (
    await fetch(routes.tweetById(id), {
      method: ApiMethods.PUT,
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
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

export const saveProfileInfo = async (formData: FormData) => {
  const token = getLocalStorage();
  return (
    await fetch(routes.profile, {
      method: ApiMethods.PUT,
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
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

export const addNewTweet = async (body: FormData) => {
  const token = getLocalStorage();
  return (
    await fetch(routes.createTweet, {
      method: ApiMethods.POST,
      body: body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
};

export const getPopularUsers = async () => {
  const token = getLocalStorage();
  return (
    await fetch(routes.popularUsers, {
      method: ApiMethods.GET,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
};

export const subscribe = async (id: string, method: string) => {
  const token = getLocalStorage();
  return (
    await fetch(routes.subscribe(id), {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
};
