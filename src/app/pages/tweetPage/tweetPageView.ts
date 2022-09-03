import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import Node from '../../components/Node';
// import Button from '../../components/Button';
// import authManager from '../../services/authManager';
import Router from '../../router/router';
import { addEventListener, removeAllEventListeners } from '../../services/eventListener';
import { IUserTweet } from '../../services/types';
import Tweet from '../../components/tweet/tweet';
import UserProfile from '../../components/userProfile/userProfile';
import { addTweet } from '../../components/modalForm/modalForm';

let tweetComponent;

class TweetPageView {
  private rootNode: HTMLElement;
  public userProfile: UserProfile;
  // private tweet: IUserTweet;

  constructor() {
    this.rootNode = <HTMLElement>document.getElementById('app');
    this.userProfile = new UserProfile();
  }

  render(): void {
    this.rootNode.textContent = '';

    this.rootNode.append(header.getTemplate());

    this.createMainLayout();

    this.rootNode.append(footer.getTemplate());
  }

  private static eventCallback(
    callback: (e: Event, username?: string) => void,
    className: string,
    e: Event,
    username?: string
  ) {
    const element = <HTMLElement>e.target;
    if (element && (<Element>element).closest(`.${className}`)) {
      username ? callback(e, username) : callback(e);
    }
  }

  private createMainLayout() {
    const tweetId = Router.getRouteIdParam(window.location.href);
    removeAllEventListeners();
    if (tweetId) {
      console.log('Its tweet page, check & get tweet by id');
      addTweet(tweetId);
      tweetComponent = new Tweet(tweetId);
      this.rootNode.append(tweetComponent.rootNode);
      tweetComponent.showPage(tweetId);

      const clickListeners = [
        (e: Event) => TweetPageView.eventCallback(this.userProfile.toggleLike.bind(this.userProfile), 'like-image', e),
        (e: Event) => TweetPageView.eventCallback(this.userProfile.goTweetPage.bind(this.userProfile), 'post-form', e),
        (e: Event) => TweetPageView.eventCallback(this.userProfile.editPost, 'edit-post', e),
        (e: Event) => TweetPageView.eventCallback(this.userProfile.editPost, 'save-button', e),
      ];

      clickListeners.forEach((callback) => addEventListener(document, 'click', callback));
    }
  }
}

export default TweetPageView;
