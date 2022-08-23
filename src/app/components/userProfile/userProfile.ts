import { deletePost, editPost, getUser, saveProfileInfo } from '../../services/api';
import { IUserTweet } from '../../services/types';
import Node from '../Node';
import UserProfileTemplates from './templates';

const template = new UserProfileTemplates();

class UserProfile {
    public rootNode: HTMLElement;

    constructor() {
        this.rootNode = document.createElement('main');
        this.rootNode.className = 'user-profile';
    }

    public async showPage(): Promise<void> {
        this.rootNode.innerHTML = '';
        await this.showUser();
        await this.showPosts();
    }

    public async showUser(): Promise<void> {
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
        const data = await getUser();
        const container = document.querySelector('.post-container');
        container?.remove();
        const postsContainer = new Node(this.rootNode, 'div', 'post-container').node;
        Node.setChild(postsContainer, 'div', 'post-heading', 'Tweets');
        this.rootNode.append(postsContainer);
        data.tweets.forEach((el: IUserTweet) => {
            const form = template.createPostForm(
                data.firstName,
                data.lastName,
                data.username,
                this.showDate(el.date),
                el.text,
                el._id
            );
            postsContainer.innerHTML += form;
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
        post.classList.toggle('edit');
        const input = post.querySelector('.post-input') as HTMLInputElement;
        const textEl = post.querySelector('.post-text') as HTMLElement;
        if (className === 'edit-post') {
            input.value = textEl.textContent as string;
        } else if (className === 'save-button') {
            const text = input.value as string;
            textEl.textContent = text;
            await editPost(id, { text });
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
        if (className === 'edit-user-button') {
            inputUsername.value = user.username;
            inputName.value = user.firstName;
            inputLastName.value = user.lastName;
            inputPhone.value = user.phone || '';
        }
        if (className === 'save-profile-button') {
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

export default UserProfile;
