import { baseUrl } from './constants';

export const routes = {
    login: `${baseUrl}/auth/login`,
    registration: `${baseUrl}/auth/register`,
    profile: `${baseUrl}/profile`,
    user: `${baseUrl}/profile/me`,
    userById: (id: string | number) => baseUrl + '/profile/' + id,

    createTweet: baseUrl + '/tweet',
    allTweets: baseUrl + '/tweet/all',
    tweetsBySubscriptions: baseUrl + '/tweet/subscriptions',
    myTweets: baseUrl + '/tweet',
    tweetsByUserId: (id: string | number) => baseUrl + '/tweet/user/' + id,

    tweetById: (id: string | number) => baseUrl + '/tweet/' + id,
    likeByPostId: (id: string | number) => baseUrl + '/tweet/' + id + '/like',
};
