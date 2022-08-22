import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import userProfile from '../../components/userProfile/userProfile';

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

    private createProfileLayout() {
        userProfile.showPosts();
        this.rootNode.append(userProfile.rootNode);
        document.addEventListener('click', (e) => {
            const button = <HTMLElement>e.target;
            if (button.classList.contains('edit-post')) {
                userProfile.editPost(<string>button.dataset.id);
            }
        });
        document.addEventListener('click', (e) => {
            const button = <HTMLElement>e.target;
            if (button.classList.contains('save-button')) {
                userProfile.savePost(<string>button.dataset.id);
            }
        });
    }

    private createFooter(): void {
        this.rootNode.append(footer.getTemplate());
    }
}

export default ProfilePageView;
