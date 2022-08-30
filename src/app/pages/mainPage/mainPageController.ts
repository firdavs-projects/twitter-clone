import { getTweetsBySubscriptions, getUser, getUserByName } from '../../services/api';
import { IUserTweet } from '../../services/types';
import MainPageView from './mainPageView';
import UserProfile from '../../components/userProfile/userProfile';
import UserProfileTemplates from '../../components/userProfile/templates';
const template = new UserProfileTemplates();

class MainPageController {
  private view: MainPageView;
  public UserProfile: UserProfile;

  constructor() {
    this.view = new MainPageView();
    this.UserProfile = new UserProfile();
  }

  public async createPage() {
    this.view.render();
    await this.showTweetsFeed();
  }
  private async showTweetsFeed(): Promise<void> {
    const currentUser = await getUser();
    const tweets = await getTweetsBySubscriptions();
    console.log(tweets);
    const container = document.querySelector('.post-container');
    container?.remove();
    const postsContainer = document.createElement('div');
    postsContainer.classList.add('post-container');
    const main = document.querySelector('.main') as HTMLElement;
    main.append(postsContainer);
    tweets.tweets.forEach(async (el: IUserTweet) => {
      const thisUser = await getUserByName(el.user.username);
      const form = template.createPostForm(
        el.user.firstName,
        el.user.lastName,
        el.user.username,
        thisUser.avatar,
        this.UserProfile.showDate(el.date),
        el.text,
        el._id,
        el.likes.length !== 0 ? el.likes.length.toString() : '',
        el.tweets.length !== 0 ? el.tweets.length.toString() : '',
        el.image
      );
      postsContainer.innerHTML += form;

      const likeImgs = document.querySelectorAll('.like-image') as NodeListOf<Element>;
      likeImgs.forEach((img) => {
        img.addEventListener('click', (event) => {
          this.UserProfile.toggleLike(event);
          console.log((event.target as HTMLElement).dataset.id);
        });
      });

      const post = postsContainer.lastChild as HTMLElement;
      const likeImg = post.querySelector('.like-image') as HTMLElement;
      if (el.likes.some((like) => like._id === currentUser._id)) {
        likeImg.classList.add('active');
      }
    });
  }
}

export default MainPageController;
