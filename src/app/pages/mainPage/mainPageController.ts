import { getTweetsBySubscriptions, logout, deletePost } from '../../services/api';
import { IUserTweet } from '../../services/types';
import MainPageView from './mainPageView';
import UserProfile from '../../components/userProfile/userProfile';
import UserProfileTemplates from '../../components/userProfile/templates';
import { addEventListener, removeAllEventListeners } from '../../services/eventListener';
import { userProfile } from '../profilePage/profilePageView';
const template = new UserProfileTemplates();

class MainPageController {
  private view: MainPageView;
  public userProfile: UserProfile;

  constructor() {
    this.view = new MainPageView();
    this.userProfile = userProfile;
  }

  public async createPage() {
    this.view.render();
    await this.showPosts();
  }
  private async showPosts(): Promise<void> {
    const logoutBtn = document.getElementById('logout-header') as HTMLElement;
    const currentUser = await this.userProfile.me();
    const tweets = await getTweetsBySubscriptions();
    const container = document.querySelector('.post-container');
    container?.remove();
    const postsContainer = document.createElement('div');
    postsContainer.classList.add('post-container');
    const main = document.querySelector('.main') as HTMLElement;
    main.append(postsContainer);
    tweets.tweets.forEach(async (el: IUserTweet) => {
      // const thisUser = await getUserByName(el.user.username);
      const form = template.createPostForm(
        el.user.firstName,
        el.user.lastName,
        el.user.username,
        el.user.avatar,
        this.userProfile.showDate(el.date),
        el.text,
        el._id,
        el.likes.length !== 0 ? el.likes.length.toString() : '',
        el.tweets.length !== 0 ? el.tweets.length.toString() : '',
        el.image,
        el.user._id === currentUser?._id
        // currentUser?.likedTweets.includes(el._id),
      );
      postsContainer.innerHTML += form;

      const toggleLike = (event: Event) => {
        this.userProfile.toggleLike(event);
      };

      const goTweetPage = (event: Event) => {
        this.userProfile.goTweetPage(event);
      };

      const editPost = (event: Event) => {
        this.userProfile.editPost(event);
      };

      const deleteTweet = (e: Event) => {
        this.userProfile.deletePost(e);
      };

      const likeImgs = document.querySelectorAll('.like-image') as NodeListOf<Element>;
      const postForms = document.querySelectorAll('.post-form') as NodeListOf<Element>;
      const editButtons = document.querySelectorAll('.edit-post') as NodeListOf<Element>;
      const saveButtons = document.querySelectorAll('.save-button') as NodeListOf<Element>;
      const deleteButtons = document.querySelectorAll('.delete-post') as NodeListOf<Element>;

      removeAllEventListeners();

      addEventListener(logoutBtn, 'click', logout);

      likeImgs.forEach((img: Element, i) => {
        addEventListener(img, 'click', toggleLike);
      });

      postForms.forEach((form: Element) => {
        addEventListener(form, 'click', goTweetPage);
      });

      editButtons.forEach((btn: Element) => {
        addEventListener(btn, 'click', editPost);
      });

      saveButtons.forEach((btn: Element) => {
        addEventListener(btn, 'click', editPost);
      });

      deleteButtons.forEach((btn: Element) => {
        addEventListener(btn, 'click', deleteTweet);
      });

      const post = postsContainer.lastChild as HTMLElement;
      const likeImg = post.querySelector('.like-image') as HTMLElement;
      if (el.likes.some((like) => like._id === currentUser?._id)) {
        likeImg.classList.add('active');
      }
    });
  }
}

export default MainPageController;
