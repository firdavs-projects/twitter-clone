import * as bootstrap from 'bootstrap';
import {
    addLike,
    deleteLike,
    deletePost,
    editPost,
    getAllUserTweets,
    getTweetById,
    getUser,
    saveProfileInfo,
} from '../../services/api';
import { IUserTweet } from '../../services/types';
import Node from '../Node';
import UserProfileTemplates from './templates';

const template = new UserProfileTemplates();

class UserProfile {
    public rootNode: HTMLElement;
    public modal: bootstrap.Modal | undefined;

    constructor() {
        this.rootNode = document.createElement('main');
        this.rootNode.className = 'user-profile';
    }

    public async showPage(): Promise<void> {
        this.rootNode.innerHTML = '';
        await this.showUser();
        await this.showPosts();
        this.modal = new bootstrap.Modal(<HTMLElement>document.getElementById('editBackdrop'));
    }

    public async showUser(): Promise<void> {
        const container = document.querySelector('.user-container');
        container?.remove();
        const data = await getUser();
        this.rootNode.innerHTML += template.createUser(
            data.firstName,
            data.lastName,
            data.username,
            data._id,
            this.showDate(data.date)
        );
    }

    public async showPosts(): Promise<void> {
        const user = await getUser();
        const tweets = await getAllUserTweets();
        const container = document.querySelector('.post-container');
        container?.remove();
        const postsContainer = new Node(this.rootNode, 'div', 'post-container').node;
        Node.setChild(postsContainer, 'div', 'post-heading', 'Tweets');
        this.rootNode.append(postsContainer);
        tweets.tweets.forEach((el: IUserTweet) => {
            const form = template.createPostForm(
                user.firstName,
                user.lastName,
                user.username,
                this.showDate(el.date),
                el.text,
                el._id,
                el.likes.length !== 0 ? el.likes.length.toString() : '',
                el.tweets.length !== 0 ? el.tweets.length.toString() : ''
            );
            postsContainer.innerHTML += form;
            const post = postsContainer.lastChild as HTMLElement;
            const likeImg = post.querySelector('.like-image') as HTMLElement;
            if (el.likes.includes(user._id)) {
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

    public async editPost(className: string, id: string) {
        const post = <HTMLElement>document.getElementById(`${id}`);
        const input = post.querySelector('.post-input') as HTMLInputElement;
        const textEl = post.querySelector('.post-text') as HTMLElement;
        if (className === 'edit-post') {
            input.value = textEl.textContent as string;
            post.classList.add('edit');
        } else if (className === 'save-button') {
            if (input.checkValidity()) {
                post.classList.remove('edit');
                const text = input.value as string;
                textEl.textContent = text;
                await editPost(id, { text });
            } else {
                (<HTMLElement>input.parentElement).classList.add('was-validated');
            }
        }
    }

    public async deletePost(id: string) {
        await deletePost(id);
        this.showPosts();
    }

    public async editProfile(className: string): Promise<void> {
        const user = await getUser();
        const inputUsername = document.querySelector('.edit-username') as HTMLInputElement;
        const inputName = document.querySelector('.edit-name') as HTMLInputElement;
        const inputLastName = document.querySelector('.edit-surname') as HTMLInputElement;
        const inputPhone = document.querySelector('.edit-phone') as HTMLInputElement;
        const inputArr = [inputUsername, inputName, inputLastName, inputPhone];
        if (className === 'edit-user-button') {
            (this.modal as bootstrap.Modal).toggle();
            inputUsername.value = user.username;
            inputName.value = user.firstName;
            inputLastName.value = user.lastName;
            inputPhone.value = user.phone || '';
        }
        if (className === 'save-profile-button') {
            if (inputArr.some((el) => !el.checkValidity())) {
                (<HTMLElement>inputName.closest('.modal-body')).classList.add('was-validated');
            } else {
                (this.modal as bootstrap.Modal).toggle();
                await saveProfileInfo({
                    username: inputUsername.value,
                    firstName: inputName.value,
                    lastName: inputLastName.value,
                    phone: inputPhone.value,
                });
                this.showPage();
            }
        }
    }

    public async toggleLike(id: string) {
        const user = await getUser();
        const tweet = await getTweetById(id);
        const likeImg = document.querySelector(`[data-id="${id}"].like-image`) as HTMLElement;
        const postForm = document.getElementById(id) as HTMLElement;
        const likeCounter = postForm.querySelector('.like-counter') as HTMLElement;
        if (tweet.tweet.likes.includes(user._id)) {
            likeImg.classList.remove('active');
            deleteLike(id);
            const newCounter = (Number(<string>likeCounter.innerHTML) - 1).toString();
            likeCounter.innerHTML = newCounter !== '0' ? newCounter : '';
        } else {
            likeImg.classList.add('active');
            addLike(id);
            likeCounter.innerHTML = (Number(<string>likeCounter.innerHTML) + 1).toString();
        }
    }
}

export default UserProfile;
