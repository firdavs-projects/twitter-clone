import auth from '../../components/auth/auth';
import header from '../../components/header/header';
import footer from '../../components/footer/footer';
import Node from '../../components/Node';
import router from '../../router/router';

export class AuthView {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    public render() {
        this.rootNode.textContent = '';

        this.createMainLayout();
    }

    private createMainLayout() {
        const main = new Node(this.rootNode, 'section', 'auth-page');
        const isRegisterRoute = router.getRoute().includes('register');
        main.node.append(auth.getTemplate(isRegisterRoute));
    }
}

export default new AuthView();
