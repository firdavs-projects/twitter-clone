import { userProfile } from '../../pages/profilePage/profilePageView';
import { deletePost, getTweetById } from '../../services/api';
import { IUserTweet } from '../../services/types';
import UserProfileTemplates from '../userProfile/templates';
import TweetTemplate from './templates';

const templateProfile = new UserProfileTemplates();
const templateTweet = new TweetTemplate();

class Tweet {
  public rootNode: HTMLElement;
  private _tweet: IUserTweet | undefined;
  static counter = 0;

  constructor(private _id: string) {
    this.rootNode = document.createElement('main');
    this.rootNode.classList.add('user-profile', 'row', 'justify-content-center', 'container');
    this._id = _id;
  }

  async tweet(id: string): Promise<IUserTweet> {
    if (this._tweet) {
      return this._tweet;
    }
    this._tweet = await getTweetById(id);
    return this._tweet;
  }

  public async showPage(id: string): Promise<void> {
    this.rootNode.innerHTML = templateTweet.createStructure();
    await this.showTweet(id);
    await this.showPosts(id);
  }

  public async showTweet(id: string): Promise<void> {
    const tweet = await this.tweet(id);
    const user = await userProfile.me();
    console.log(user);
    const container = <HTMLElement>document.querySelector('.main-tweet');
    container.innerHTML = templateProfile.createPostForm(
      tweet.user.firstName,
      tweet.user.lastName,
      tweet.user.username,
      tweet.user.avatar,
      userProfile.showDate(tweet.date),
      tweet.text,
      tweet._id,
      tweet.likes.length !== 0 ? tweet.likes.length.toString() : '',
      tweet.tweets.length !== 0 ? tweet.tweets.length.toString() : '',
      tweet.image,
      user._id === tweet.user._id
    );
    const post = container.lastChild as HTMLElement;
    const likeImg = post.querySelector('.like-image') as HTMLElement;
    if (user.likedTweets.includes(id)) {
      likeImg.classList.add('active');
    }
  }

  public async showPosts(id: string): Promise<void> {
    const tweet = await this.tweet(id);
    const user = await userProfile.me();
    const container = document.querySelector('.post-container') as HTMLElement;
    container.innerHTML = '<h5 class="post-heading">Comments</h5>';
    tweet.tweets.forEach((el) => {
      container.innerHTML += templateProfile.createPostForm(
        el.user.firstName,
        el.user.lastName,
        el.user.username,
        el.user.avatar,
        userProfile.showDate(el.date),
        el.text,
        el._id,
        el.likes.length !== 0 ? el.likes.length.toString() : '',
        el.tweets.length !== 0 ? el.tweets.length.toString() : '',
        el.image,
        user._id === el.user._id
      );
      const post = container.lastChild as HTMLElement;
      const likeImg = post.querySelector('.like-image') as HTMLElement;
      if (user.likedTweets.includes(el._id)) {
        likeImg.classList.add('active');
      }
    });
  }

  public async deletePost(e: Event) {
    const postId = (<HTMLElement>e.target).dataset.id as string;
    await deletePost(postId);
    if (postId === this._id) {
      window.location.href = `#/profile/`;
    } else {
      this._tweet?.tweets.splice(
        this._tweet.tweets.findIndex((el) => el._id === postId),
        1
      );
      await this.showPage(this._id);
    }
  }
}

export default Tweet;
