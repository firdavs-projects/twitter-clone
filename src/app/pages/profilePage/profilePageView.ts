import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import UserProfile from '../../components/userProfile/userProfile';

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

        this.createProfileLayout();

        this.createFooter();
    }

    private createHeader(): void {
        this.rootNode.append(header.getTemplate());
    }

    private callbackBuilder(callback: (...args: string[]) => void, className: string, e: Event) {
        const element = <HTMLElement>e.target;
        if (element && (<Element>element).classList.contains(className)) {
            callback(className, <string>element.dataset.id);
        }
    }

    private idCallback(callback: (id: string) => void, className: string, e: Event) {
        const element = <HTMLElement>e.target;
        if (element && (<Element>element).classList.contains(className)) {
            callback(<string>element.dataset.id);
        }
    }

    private createProfileLayout() {
        userProfile.showPage();
        this.rootNode.append(userProfile.rootNode);
        document.addEventListener('click', (e: Event) =>
            this.callbackBuilder(userProfile.editPost.bind(userProfile), 'edit-post', e)
        );
        document.addEventListener('click', (e: Event) =>
            this.callbackBuilder(userProfile.editPost.bind(userProfile), 'save-button', e)
        );
        document.addEventListener('click', (e: Event) =>
            this.callbackBuilder(userProfile.editProfile.bind(userProfile), 'edit-user-button', e)
        );
        document.addEventListener('click', (e: Event) =>
            this.callbackBuilder(userProfile.editProfile.bind(userProfile), 'save-profile-button', e)
        );
        document.addEventListener('click', (e: Event) =>
            this.idCallback(userProfile.deletePost.bind(userProfile), 'delete-post', e)
        );
    }

    private createFooter(): void {
        this.rootNode.append(footer.getTemplate());
    }
}

export default ProfilePageView;
