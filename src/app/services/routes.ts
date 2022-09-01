import { baseUrl } from './constants';

export const routes = {
  login: `${baseUrl}/auth/login`,
  registration: `${baseUrl}/auth/register`,
  profile: `${baseUrl}/profile`,
  user: `${baseUrl}/profile/me`,
  popularUsers: `${baseUrl}/profile/top`,
  userByName: (name: string) => baseUrl + '/profile/' + name,

  createTweet: baseUrl + '/tweet',
  allTweets: baseUrl + '/tweet/all',
  tweetsBySubscriptions: baseUrl + '/tweet/subscriptions',
  myTweets: baseUrl + '/tweet',
  tweetsByUserId: (id: string | number) => baseUrl + '/tweet/user/' + id,
  tweetsByUsername: (username: string | number) => baseUrl + '/tweet/user/' + username,

  tweetById: (id: string | number) => baseUrl + '/tweet/' + id,
  likeByPostId: (id: string | number) => baseUrl + '/tweet/' + id + '/like',

  subscribe: (id: string) => baseUrl + '/profile/' + id + '/subscribe',
};
