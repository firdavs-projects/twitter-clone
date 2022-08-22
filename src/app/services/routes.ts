import {baseUrl} from "./constants";

export const routes = {
    login: `${baseUrl}/auth/login`,
    registration:`${baseUrl}/auth/register`,

    allTweets: baseUrl + '/tweet/all',
    myTweets: baseUrl + '/tweet',
    tweetsByUserId: (id: string | number) => baseUrl + '/tweet/user/' + id,

    tweetById: (id: string | number) => baseUrl + '/tweet/' + id,
}
