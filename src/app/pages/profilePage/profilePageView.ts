import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import Node from "../../components/Node";

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
        const main = new Node(this.rootNode, 'main', 'profile');
        main.node.insertAdjacentHTML('beforeend', 'Hello Profile Page!');
    }

    private createFooter(): void {
        this.rootNode.append(footer.getTemplate());
    }
}

export default ProfilePageView;
