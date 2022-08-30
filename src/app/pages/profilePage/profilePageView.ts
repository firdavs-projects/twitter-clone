import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import { addTweet } from '../../components/modalForm/modalForm';
import UserProfile from '../../components/userProfile/userProfile';
import Router from '../../router/router';

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

  private eventCallback(callback: (e: Event) => void, className: string, e: Event) {
    const element = <HTMLElement>e.target;
    if (element && (<Element>element).classList.contains(className)) {
      callback(e);
    }
  }

  private createProfileLayout() {
    const username = Router.getRouteIdParam(window.location.href);
    if (username) {
      console.log('Its other user profile, check & get other user with username');
    }

    userProfile.showPage();
    this.rootNode.append(userProfile.rootNode);
    document.addEventListener('click', (e: Event) => this.eventCallback(userProfile.editPost, 'edit-post', e));
    document.addEventListener('click', (e: Event) => this.eventCallback(userProfile.editPost, 'save-button', e));
    document.addEventListener('click', (e: Event) =>
      this.eventCallback(userProfile.editProfile.bind(userProfile), 'edit-user-button', e)
    );
    document.addEventListener('click', (e: Event) =>
      this.eventCallback(userProfile.editProfile.bind(userProfile), 'save-profile-button', e)
    );
    document.addEventListener('click', (e: Event) =>
      this.eventCallback(userProfile.deletePost.bind(userProfile), 'delete-post', e)
    );
    document.addEventListener('click', (e: Event) =>
      this.eventCallback(userProfile.toggleLike.bind(userProfile), 'like-image', e)
    );
    document.addEventListener('click', (e: Event) => this.eventCallback(userProfile.editStatus, 'user-status', e));
    document.addEventListener('focusout', (e: Event) => this.eventCallback(userProfile.editStatus, 'status-input', e));
    document.addEventListener('click', (e: Event) => this.eventCallback(userProfile.showFollowers, 'show-follows', e));
    document.addEventListener('click', (e: Event) => this.eventCallback(userProfile.toggleFollow, 'subscribe-btn', e));
  }

  private createFooter(): void {
    this.rootNode.append(footer.getTemplate());
  }
}

export default ProfilePageView;
