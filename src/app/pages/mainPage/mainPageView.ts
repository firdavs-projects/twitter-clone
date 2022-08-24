import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import Node from '../../components/Node';
import Button from "../../components/Button";
import authManager from "../../services/authManager";

class MainPageView {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    render(): void {
        this.rootNode.textContent = '';

        this.rootNode.append(header.getTemplate());

        this.createMainLayout();

        this.rootNode.append(footer.getTemplate());
    }

    private createMainLayout() {
        const main = new Node(this.rootNode, 'main', 'main');
        main.node.insertAdjacentHTML('beforeend', `
            <div class="container">
                <h1>Hello Main Page</h1>
                <span>Tweets</span>
            </div>
        `);

        const btnWrapper = Node.setChild(main.node, 'div', 'container');
        const btn = new Button(btnWrapper,'logout test')
        btn.addClass('btn')
        btn.addClass('btn-danger')
        btn.addClass('my-4')
        btn.onclick(() => {
            localStorage.removeItem('token') // remove on logout
            authManager.navigate('/login', false);
        })
    }
}

export default MainPageView;
