import * as bootstrap from 'bootstrap';
import {
  addLike,
  deleteLike,
  deletePost,
  editPost,
  getAllUserTweets,
  getPopularUsers,
  getTweetById,
  getTweetsByUserId,
  getUser,
  getUserByName,
  saveProfileInfo,
  subscribe,
} from '../../services/api';
import { ApiMethods } from '../../services/constants';
import { IUserInfo, IUserTweet, TLike } from '../../services/types';
import Node from '../Node';
import UserProfileTemplates from './templates';

const template = new UserProfileTemplates();

class UserProfile {
  public rootNode: HTMLElement;
  public modal: bootstrap.Modal | undefined;
  public myId: string;
  static counter = 0;

  constructor() {
    this.rootNode = document.createElement('main');
    this.rootNode.classList.add('user-profile', 'row', 'justify-content-center', 'container');
    this.myId = '';
  }

  public async showPage(username?: string): Promise<void> {
    this.rootNode.innerHTML = template.createStructure();
    await this.showUser(username);
    await this.showPosts(username);
    await this.showPopularUsers();
    if (!username) {
      this.modal = new bootstrap.Modal(<HTMLElement>document.getElementById('editBackdrop'));
    }
  }

  public async showUser(username?: string): Promise<void> {
    const container = document.querySelector('.user-container');
    container?.remove();
    const data = username ? await getUserByName(username) : await getUser();
    (<HTMLElement>document.querySelector('.page-container')).innerHTML += template.createUser(
      data.firstName,
      data.lastName,
      data.username,
      data._id,
      this.showDate(data.date),
      data.status || 'Change your status...',
      data.avatar,
      data.subscriptions.length,
      data.followers.length,
      !username
    );
  }

  public async showPosts(username?: string): Promise<void> {
    const user = username ? await getUserByName(username) : await getUser();
    let me: IUserInfo;
    if (username) {
      me = await getUser();
    }
    const tweets = username ? await getTweetsByUserId(user._id) : await getAllUserTweets();
    const container = document.querySelector('.post-container');
    container?.remove();
    const pageContainer = <HTMLElement>document.querySelector('.page-container');
    const postsContainer = new Node(pageContainer, 'div', 'post-container').node;
    Node.setChild(postsContainer, 'h5', 'post-heading', 'Tweets');
    pageContainer.append(postsContainer);
    tweets.tweets.forEach((el: IUserTweet) => {
      const form = template.createPostForm(
        user.firstName,
        user.lastName,
        user.username,
        user.avatar,
        this.showDate(el.date),
        el.text,
        el._id,
        el.likes.length !== 0 ? el.likes.length.toString() : '',
        el.tweets.length !== 0 ? el.tweets.length.toString() : '',
        el.image,
        !username
      );
      postsContainer.innerHTML += form;
      const post = postsContainer.lastChild as HTMLElement;
      const likeImg = post.querySelector('.like-image') as HTMLElement;
      if (el.likes.some((like: TLike) => like._id === (username ? me._id : user._id))) {
        likeImg.classList.add('active');
      }
    });
  }

  public showDate(dateString: string) {
    const postDate = new Date(dateString);
    const dateNow = Date.now();
    return dateNow - postDate.getTime() < 8.64e7
      ? `${('0' + (postDate.getHours() + 1)).slice(-2)}:${('0' + (postDate.getMinutes() + 1)).slice(-2)}`
      : `${postDate.getDate()}.${('0' + (postDate.getMonth() + 1)).slice(-2)}.${postDate.getFullYear()}`;
  }

  public async showPopularUsers() {
    const popularUsers = await getPopularUsers();
    const data = await getUser();
    this.myId = data._id;
    const container = document.querySelector('.popular-user-container') as HTMLElement;
    container.innerHTML = '';
    popularUsers.forEach(async (el: IUserInfo) => {
      const user = await getUserByName(el.username);
      container.innerHTML += template.createFollower(
        el.firstName,
        el.lastName,
        el.username,
        el._id,
        user.avatar,
        data.subscriptions.some((element: TLike) => element._id === el._id)
      );
    });
  }

  public async editPost(e: Event) {
    const button = <HTMLElement>e.target;
    const id = button.dataset.id as string;
    const post = <HTMLElement>document.getElementById(`${id}`);
    const input = post.querySelector('.post-input') as HTMLInputElement;
    const textEl = post.querySelector('.post-text') as HTMLElement;
    if (button.classList.contains('edit-post')) {
      input.value = textEl.textContent as string;
      post.classList.add('edit');
    } else if (button.classList.contains('save-button')) {
      if (input.checkValidity()) {
        post.classList.remove('edit');
        const text = input.value as string;
        textEl.textContent = text;
        const formData = new FormData();
        formData.append('text', text);
        await editPost(id, formData);
      } else {
        (<HTMLElement>input.parentElement).classList.add('was-validated');
      }
    }
  }

  public async deletePost(e: Event) {
    await deletePost((<HTMLElement>e.target).dataset.id as string);
    this.showPosts();
  }

  public async editProfile(e: Event): Promise<void> {
    const user = await getUser();
    const button = <HTMLElement>e.target;
    const inputUsername = document.querySelector('.edit-username') as HTMLInputElement;
    const inputName = document.querySelector('.edit-name') as HTMLInputElement;
    const inputLastName = document.querySelector('.edit-surname') as HTMLInputElement;
    const inputPhone = document.querySelector('.edit-phone') as HTMLInputElement;
    const inputArr = [inputUsername, inputName, inputLastName, inputPhone];
    if (button.classList.contains('edit-user-button')) {
      (this.modal as bootstrap.Modal).toggle();
      inputUsername.value = user.username;
      inputName.value = user.firstName;
      inputLastName.value = user.lastName;
      inputPhone.value = user.phone || '';
    }
    if (button.classList.contains('save-profile-button')) {
      if (inputArr.some((el) => !el.checkValidity())) {
        (<HTMLElement>inputName.closest('.edit-body')).classList.add('was-validated');
      } else {
        (this.modal as bootstrap.Modal).toggle();
        const formData = new FormData(<HTMLFormElement>document.querySelector('.edit-body')) as FormData;
        if ((formData.get('file') as File).name === '') {
          formData.delete('file');
        }
        await saveProfileInfo(formData);
        this.showPage();
      }
    }
  }

  public async toggleLike(e: Event) {
    const id = (<HTMLElement>e.target).dataset.id as string;
    const user = await getUser();
    const tweet = await getTweetById(id);
    const likeImg = document.querySelector(`[data-id="${id}"].like-image`) as HTMLElement;
    const postForm = document.getElementById(id) as HTMLElement;
    const likeCounter = postForm.querySelector('.like-counter') as HTMLElement;
    if (tweet.tweet.likes.some((like: TLike) => like._id === user._id)) {
      await deleteLike(id);
      likeImg.classList.remove('active');
      const newCounter = (Number(<string>likeCounter.innerHTML) - 1).toString();
      likeCounter.innerHTML = newCounter !== '0' ? newCounter : '';
    } else {
      await addLike(id);
      likeImg.classList.add('active');
      likeCounter.innerHTML = (Number(<string>likeCounter.innerHTML) + 1).toString();
    }
  }

  public async editStatus(e: Event) {
    const input = document.querySelector('.status-input') as HTMLInputElement;
    const textEl = document.querySelector('.user-status') as HTMLElement;
    const container = <HTMLElement>input.parentElement;
    if (e.type === 'click') {
      input.value = textEl.textContent as string;
      container.classList.add('edit');
    } else if (e.type === 'focusout') {
      if (input.checkValidity()) {
        container.classList.remove('edit');
        const status = input.value as string;
        textEl.textContent = status;
        const formData = new FormData();
        formData.append('status', status);
        await saveProfileInfo(formData);
      } else {
        container.classList.add('was-validated');
      }
    }
  }

  public async showFollowers(e: Event, username?: string) {
    const isModalActive = (<HTMLElement>document.querySelector('#exampleModal')).classList.contains('show');
    const activeFollowBtn = document.querySelector('.follow-button.active') as HTMLElement;
    const type = (<HTMLElement>e.target).dataset.follows as string;
    if (isModalActive && activeFollowBtn.dataset.follows === type) {
      return;
    }
    const user = username ? await getUserByName(username) : await getUser();
    const follows = document.querySelector('.follows-container') as HTMLElement;
    const switchBtns = document.querySelectorAll('.follow-button') as NodeListOf<HTMLElement>;
    switchBtns.forEach((btn) =>
      btn.dataset.follows === type ? btn.classList.add('active') : btn.classList.remove('active')
    );
    follows.innerHTML = '';
    user[type].forEach(async (el: TLike) => {
      const followUser = await getUserByName(el.username);
      follows.innerHTML += template.createFollower(
        el.firstName,
        el.lastName,
        el.username,
        el._id,
        followUser.avatar,
        followUser.followers.some((element: TLike) => element._id === (username ? this.myId : user._id))
      );
    });
  }

  public async toggleFollow(e: Event, username?: string) {
    const button = <HTMLElement>e.target;
    const id = (<HTMLElement>button.closest('.follower-form')).dataset.id as string;
    const subscribeCounter = document.querySelector('[data-follows="subscriptions"] span') as HTMLElement;
    const allButtons = document.querySelectorAll(`[data-id="${id}"] .subscribe-btn`);
    if (button.classList.contains('active') && id !== this.myId) {
      try {
        await subscribe(id, ApiMethods.DELETE);
        if (!username) {
          subscribeCounter.innerHTML = (Number(<string>subscribeCounter.innerHTML) - 1).toString();
        }
        allButtons.forEach((element) => {
          element.classList.remove('active');
        });
      } catch (error) {
        console.log(error);
      }
    } else if (id !== this.myId) {
      try {
        await subscribe(id, ApiMethods.POST);
        if (!username) {
          subscribeCounter.innerHTML = (Number(<string>subscribeCounter.innerHTML) + 1).toString();
        }
        allButtons.forEach((element) => {
          element.classList.add('active');
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  public async goAnotherUserPage(e: Event) {
    const button = <HTMLElement>e.target;
    const name = (<HTMLElement>button.closest('.follower-form')).dataset.name as string;
    const id = (<HTMLElement>button.closest('.follower-form')).dataset.id as string;
    if (!button.classList.contains('subscribe-btn')) {
      if (id !== this.myId) {
        window.location.href = `#/profile/${name}`;
      } else {
        window.location.href = `#/profile/`;
      }
      document.querySelector('.modal-backdrop')?.remove();
    }
  }
}

export default UserProfile;
