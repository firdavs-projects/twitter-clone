export interface IApp {
  start(): void;
}

export type RouteOption = {
  path: string;
  callback: () => void;
  isAuth: boolean | null;
  withId: boolean;
  isPrivate: boolean,
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

export type TLike = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
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
  likes: TLike[];
  text: string;
  tweets: string[];
  user: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  __v: number;
  _id: string;
  image: string | null;
}

export interface IUserData {
  username?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  status?: string;
}

export interface IUserInfo {
  tweets: string[];
  likedTweets: string[];
  subscriptions: TLike[];
  followers: TLike[];
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  date: string;
  __v: number;
  avatar: string | null;
  birthDate: string | null;
  phone: string | null;
  status: string | null;
  blocked?: boolean;
}

export interface IRole  {
  role: string;
  _id: string;
  users: string[];
}

export interface IRoles {
  roles: IRole[];
}
