import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import Node from '../../components/Node';
import Button from '../../components/Button';
import authManager from '../../services/authManager';
import Router from "../../router/router";

class TweetPageView {
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
        const tweetId = Router.getRouteIdParam(window.location.href)
        if (tweetId) {
            console.log('Its tweet page, check & get tweet by id')
        }

        const main = new Node(this.rootNode, 'main', 'main');
        main.node.insertAdjacentHTML(
            'beforeend',
            `
            <div class="container">
                <h1>Hello Tweet Page with id ${tweetId}</h1>
                <span>Tweet with comments</span>
            </div>
        `);
    }
}

export default TweetPageView;
