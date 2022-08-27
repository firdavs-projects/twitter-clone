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
}

export interface IEditBody {
    text: string;
}

export interface IRegistrationBody {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface IUserTweet {
    date: string;
    likes: string[];
    text: string;
    tweets: string[];
    user: string;
    __v: number;
    _id: string;
    image: string;
}

export interface IUserData {
    username?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    status?: string;
}
