import { ILoginBody, IRegistrationBody } from './types';
import { routes } from "./routes";
import { ApiMethods } from "./constants";

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
