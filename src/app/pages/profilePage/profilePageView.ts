import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import { addTweet } from '../../components/createTweetForm/tweetForm';
import UserProfile from '../../components/userProfile/userProfile';
import Router from '../../router/router';
import { logout } from '../../services/api';
import { removeAllEventListeners, addEventListener } from '../../services/eventListener';

const userProfile = new UserProfile();

class ProfilePageView {
  private rootNode: HTMLElement;

  private userName: string;

  constructor() {
    this.rootNode = <HTMLElement>document.getElementById('app');
    this.userName = '';
  }

  public async render() {
    this.rootNode.textContent = '';

    this.createHeader();
    addTweet();

    this.createProfileLayout();

    this.createFooter();
  }

  private createHeader(): void {
    this.rootNode.append(header.getTemplate());
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

  private createProfileLayout() {
    const username = Router.getRouteIdParam(window.location.href);
    removeAllEventListeners();

    if (username) {
      console.log('Its other user profile, check & get other user with username');
      this.rootNode.append(userProfile.rootNode);
      userProfile.showPage(username);

      const clickListeners = [
        (e: Event) => ProfilePageView.eventCallback(userProfile.toggleLike.bind(userProfile), 'like-image', e),
        (e: Event) =>
          ProfilePageView.eventCallback(userProfile.showFollowers.bind(userProfile), 'show-follows', e, username),
        (e: Event) =>
          ProfilePageView.eventCallback(userProfile.toggleFollow.bind(userProfile), 'subscribe-btn', e, username),
        (e: Event) =>
          ProfilePageView.eventCallback(userProfile.goAnotherUserPage.bind(userProfile), 'follower-form', e),
        (e: Event) => ProfilePageView.eventCallback(userProfile.goTweetPage.bind(userProfile), 'post-form', e),
      ];

      clickListeners.forEach((callback) => addEventListener(document, 'click', callback));
    } else {
      this.rootNode.append(userProfile.rootNode);
      userProfile.showPage();

      const clickListeners = [
        (e: Event) => ProfilePageView.eventCallback(userProfile.editPost, 'edit-post', e),
        (e: Event) => ProfilePageView.eventCallback(userProfile.editPost, 'save-button', e),
        (e: Event) => ProfilePageView.eventCallback(userProfile.editProfile.bind(userProfile), 'edit-user-button', e),
        (e: Event) =>
          ProfilePageView.eventCallback(userProfile.editProfile.bind(userProfile), 'save-profile-button', e),
        (e: Event) => ProfilePageView.eventCallback(userProfile.deletePost.bind(userProfile), 'delete-post', e),
        (e: Event) => ProfilePageView.eventCallback(userProfile.toggleLike.bind(userProfile), 'like-image', e),
        (e: Event) => ProfilePageView.eventCallback(userProfile.editStatus, 'user-status', e),
        (e: Event) => ProfilePageView.eventCallback(userProfile.editStatus, 'status-input', e),
        (e: Event) => ProfilePageView.eventCallback(userProfile.showFollowers.bind(userProfile), 'show-follows', e),
        (e: Event) => ProfilePageView.eventCallback(userProfile.toggleFollow.bind(userProfile), 'subscribe-btn', e),
        (e: Event) =>
          ProfilePageView.eventCallback(userProfile.goAnotherUserPage.bind(userProfile), 'follower-form', e),
        (e: Event) => ProfilePageView.eventCallback(userProfile.goTweetPage.bind(userProfile), 'post-form', e),
        (e: Event) => ProfilePageView.eventCallback(logout, 'logout', e),
        (e: Event) => ProfilePageView.eventCallback(logout, 'logout-header', e),
      ];

      clickListeners.forEach((callback) => addEventListener(document, 'click', callback));

      addEventListener(document, 'focusout', (e: Event) =>
        ProfilePageView.eventCallback(userProfile.editStatus, 'status-input', e)
      );
    }
  }

  private createFooter(): void {
    this.rootNode.append(footer.getTemplate());
  }
}

export default ProfilePageView;
