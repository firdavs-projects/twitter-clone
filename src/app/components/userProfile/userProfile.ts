import { editPost, getUser } from '../../services/api';
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
        console.log(dateNow - postDate.getTime());
        return dateNow - postDate.getTime() < 8.64e7
            ? `${('0' + (postDate.getHours() + 1)).slice(-2)}:${('0' + (postDate.getMinutes() + 1)).slice(-2)}`
            : `${postDate.getDate()}.${('0' + (postDate.getMonth() + 1)).slice(-2)}.${postDate.getFullYear()}`;
    }

    public editPost(id: string) {
        const post = <HTMLElement>document.getElementById(`${id}`);
        post.classList.add('edit');
        const input = post.querySelector('.post-input') as HTMLInputElement;
        const text = post.querySelector('.post-text') as HTMLElement;
        input.value = text.textContent as string;
    }

    public async savePost(id: string) {
        const post = <HTMLElement>document.getElementById(`${id}`);
        post.classList.remove('edit');
        const input = post.querySelector('.post-input') as HTMLInputElement;
        const textEl = post.querySelector('.post-text') as HTMLElement;
        const text = input.value as string;
        textEl.textContent = text;
        await editPost(id, { text });
    }
}

export default new UserProfile();
