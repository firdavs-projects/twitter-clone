import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import Node from '../../components/Node';
import { addTweet } from '../../components/createTweetForm/tweetForm';

class MainPageView {
  private readonly rootNode: HTMLElement;

  constructor() {
    this.rootNode = <HTMLElement>document.getElementById('app');
  }

  render(): void {
    this.rootNode.textContent = '';

    this.rootNode.append(header.getTemplate());
    addTweet();

    this.createMainLayout();

    this.rootNode.append(footer.getTemplate());
  }

  private createMainLayout() {
    const main = new Node(this.rootNode, 'main', 'main');
    main.node.insertAdjacentHTML('beforeend', `<div class="post-container"></div>`);
  }
}

export default MainPageView;
