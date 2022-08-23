import { IEditBody, ILoginBody, IRegistrationBody } from './types';
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
    return (
        await fetch(routes.myTweets, {
            method: ApiMethods.GET,
            headers: {
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzAxZjdlMDExMGZlMjExMzBmYTdkZWQiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2NjEwNzMzNzcsImV4cCI6MTY2Mzc1MTc3N30.6qeuAhjeQ6bY0_ylsNPjyKxIUStSJkuORpNzaTkonco',
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

// export const getLogin = (body: ILoginBody) =>
//     new Promise<void>(async (resolve, reject) => {
//         try {
//             const res = await fetch(loginUrl, {
//                 method: 'POST',
//                 body: JSON.stringify(body),
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             })
//             if (res.ok) {
//                 resolve(res.json())
//             }
//         } catch {
//             reject();
//         }
//     });
