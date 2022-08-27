import { addLike, getTweetsBySubscriptions, getUser, getUserById } from '../../services/api';
import { IUserTweet } from '../../services/types';
import MainPageView from './mainPageView';
import createPostForm from '../../components/userProfile/templates';
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
        console.log(tweets)
        const container = document.querySelector('.post-container');
        container?.remove();
        const postsContainer = document.createElement('div');
        postsContainer.classList.add('post-container');
        const main = document.querySelector('.main') as HTMLElement;
        main.append(postsContainer);

        tweets.tweets.forEach(async (el: IUserTweet) => {
            const user = await getUserById(el.user);
            const form = template.createPostForm(
                user.firstName,
                user.lastName,
                user.username,
                this.UserProfile.showDate(el.date),
                el.text,
                el._id,
                el.likes.length !== 0 ? el.likes.length.toString() : '',
                el.tweets.length !== 0 ? el.tweets.length.toString() : ''
            );
            postsContainer.innerHTML += form;

            const likeImgs = document.querySelectorAll('.like-image') as NodeListOf<Element>;
            likeImgs.forEach((img) => {
                img.addEventListener('click', (event) => {
                    this.UserProfile.toggleLike(event);
                    console.log((event.target as HTMLElement).dataset.id)
                })
            })

            const post = postsContainer.lastChild as HTMLElement;
            const likeImg = post.querySelector('.like-image') as HTMLElement;
            if (el.likes.includes(currentUser._id)) {
                likeImg.classList.add('active');
            }
        });

    }
}

export default MainPageController;
