/* eslint-disable no-async-promise-executor */
import { ILoginBody, IRegistrationBody, IUserInfo, IUserTweet, TAuthResult } from './types';
import { routes } from './routes';
import { ApiMethods } from './constants';
import { getLocalStorage } from './localStorage';

export const logout = async () => {
  const token = getLocalStorage();

  try {
    const res = await fetch(routes.logout, {
      method: ApiMethods.GET,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      console.log('Logout...');
      localStorage.clear();
      window.location.reload();
    }
  } catch (error) {
    console.log('Something went wrong...');
  }
};

export const getLogin = async (body: ILoginBody) =>
  new Promise<TAuthResult>(async (resolve, reject) => {
    try {
      const res = await fetch(routes.login, {
        method: ApiMethods.POST,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const data: TAuthResult = await res.json();
        resolve(data);
      }
    } catch {
      reject();
    }
  });

export const getRegistration = async (body: IRegistrationBody) =>
  new Promise<TAuthResult>(async (resolve, reject) => {
    try {
      const res = await fetch(routes.registration, {
        method: ApiMethods.POST,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const data: TAuthResult = await res.json();
        resolve(data);
      }
    } catch {
      reject();
    }
  });

export const getAllUserTweets = async () =>
  new Promise<{ tweets: IUserTweet[] }>(async (resolve, reject) => {
    try {
      const token = getLocalStorage();
      const res = await fetch(routes.myTweets, {
        method: ApiMethods.GET,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        logout();
      }
      if (res.ok) {
        const tweets: { tweets: IUserTweet[] } = await res.json();
        resolve(tweets);
      }
    } catch {
      reject();
    }
  });

export const getTweetsByUsername = async (username: string) =>
  new Promise<{ tweets: IUserTweet[] }>(async (resolve, reject) => {
    try {
      const token = getLocalStorage();
      const res = await fetch(routes.tweetsByUserId(username), {
        method: ApiMethods.GET,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        logout();
      }
      if (res.ok) {
        const tweets: { tweets: IUserTweet[] } = await res.json();
        resolve(tweets);
      }
    } catch {
      reject();
    }
  });

export const getTweetsBySubscriptions = () =>
  new Promise<{ tweets: IUserTweet[] }>(async (resolve, reject) => {
    try {
      const token = getLocalStorage();
      const res = await fetch(routes.tweetsBySubscriptions, {
        method: ApiMethods.GET,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        logout();
      }
      if (res.ok) {
        const tweets: { tweets: IUserTweet[] } = await res.json();
        resolve(tweets);
      }
    } catch {
      reject();
    }
  });

export const getUser = async () =>
  new Promise<IUserInfo>(async (resolve, reject) => {
    try {
      const token = getLocalStorage();
      const res = await fetch(routes.user, {
        method: ApiMethods.GET,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        logout();
      }
      if (res.ok) {
        const user: IUserInfo = await res.json();
        resolve(user);
      }
    } catch {
      reject();
    }
  });

export const getUserByName = async (name: string) =>
  new Promise<IUserInfo>(async (resolve, reject) => {
    try {
      const token = getLocalStorage();
      const res = await fetch(routes.userByName(name), {
        method: ApiMethods.GET,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        logout();
      }
      if (res.ok) {
        const user: IUserInfo = await res.json();
        resolve(user);
      }
    } catch {
      reject();
    }
  });

export const getTweetById = async (id: string) =>
  new Promise<IUserTweet>(async (resolve, reject) => {
    try {
      const token = getLocalStorage();
      const res = await fetch(routes.tweetById(id), {
        method: ApiMethods.GET,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        logout();
      }
      if (res.ok) {
        const tweet: IUserTweet = await res.json();
        resolve(tweet);
      }
    } catch {
      reject();
    }
  });

export const editPost = async (id: string, formData: FormData) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getLocalStorage();
      const res = await fetch(routes.tweetById(id), {
        method: ApiMethods.PUT,
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        logout();
      }
      if (res.ok) {
        const data = await res.json();
        resolve(data);
      }
    } catch {
      reject();
    }
  });

export const deletePost = async (id: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getLocalStorage();
      const res = await fetch(routes.tweetById(id), {
        method: ApiMethods.DELETE,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        logout();
      }
      if (res.ok) {
        const data = await res.json();
        resolve(data);
      }
    } catch {
      reject();
    }
  });

export const saveProfileInfo = async (formData: FormData) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getLocalStorage();
      const res = await fetch(routes.profile, {
        method: ApiMethods.PUT,
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        logout();
      }
      if (res.ok) {
        const data = await res.json();
        resolve(data);
      }
    } catch {
      reject();
    }
  });

export const addLike = async (id: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getLocalStorage();
      const res = await fetch(routes.likeByPostId(id), {
        method: ApiMethods.POST,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        logout();
      }
      if (res.ok) {
        const data = await res.json();
        resolve(data);
      }
    } catch {
      reject();
    }
  });

export const deleteLike = async (id: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getLocalStorage();
      const res = await fetch(routes.likeByPostId(id), {
        method: ApiMethods.DELETE,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        logout();
      }
      if (res.ok) {
        const data = await res.json();
        resolve(data);
      }
    } catch {
      reject();
    }
  });

export const addNewTweet = async (body: FormData) =>
  new Promise<{ tweet: IUserTweet }>(async (resolve, reject) => {
    try {
      const token = getLocalStorage();
      const res = await fetch(routes.createTweet, {
        method: ApiMethods.POST,
        body: body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        logout();
      }
      if (res.ok) {
        const data: { tweet: IUserTweet } = await res.json();
        resolve(data);
      }
    } catch {
      reject();
    }
  });

export const getPopularUsers = async () =>
  new Promise<IUserInfo[]>(async (resolve, reject) => {
    try {
      const token = getLocalStorage();
      const res = await fetch(routes.popularUsers, {
        method: ApiMethods.GET,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        logout();
      }
      if (res.ok) {
        const data: IUserInfo[] = await res.json();
        resolve(data);
      }
    } catch {
      reject();
    }
  });

export const subscribe = async (id: string, method: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getLocalStorage();
      const res = await fetch(routes.subscribe(id), {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        logout();
      }
      if (res.ok) {
        const data = await res.json();
        resolve(data);
      }
    } catch {
      reject();
    }
  });
