export interface IApp {
    start(): void;
}

export type RouteOption = {
    path: RegExp;
    callback: () => void;
    isAuth: boolean | null;
};

export type TAuthResult = {
    token: string;
    userId: string;
};

export type TUser = {
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatar?: string;
    username: string;
};

export interface ILoginBody {
    username: string;
    password: string;
};

export interface IRegistrationBody {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
};
