import { ILoginBody, IRegistrationBody } from './types';

const baseUrl = 'https://twitter-clone-api.onrender.com/';
const loginUrl = `${baseUrl}api/auth/login`;
const registrationUrl = `${baseUrl}api/auth/register`;

export const getLogin = async (body: ILoginBody) => {
    return (
        await fetch(loginUrl, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    ).json();
};

export const getRegistration = async (body: IRegistrationBody) => {
    return (
        await fetch(registrationUrl, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
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