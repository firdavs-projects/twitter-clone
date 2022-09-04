import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import adminPanel from '../../components/adminPannel/adminPanel';
import Node from '../../components/Node';
import { addEventListener, removeAllEventListeners } from '../../services/eventListener';

class AdminPageView {
  private readonly rootNode: HTMLElement;

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
    main.node.append(adminPanel.getTemplate());
    adminPanel.showTweets();
    adminPanel.showUsers();

    removeAllEventListeners();
    const clickListeners = [
      (e: Event) => AdminPageView.eventCallback(adminPanel.deleteTweet.bind(adminPanel), 'delete-admin-tweet', e),
      (e: Event) => AdminPageView.eventCallback(adminPanel.deleteUser.bind(adminPanel), 'delete-admin-user', e),
      (e: Event) => AdminPageView.eventCallback(adminPanel.toggleBlockUser.bind(adminPanel), 'block-admin-user', e),
    ];
    clickListeners.forEach((l) => addEventListener(document, 'click', l));
    const roleChangeHandler = (e: Event) => {
      AdminPageView.eventCallback(adminPanel.setRoleUser.bind(adminPanel), 'role-admin-user', e);
    };
    addEventListener(document, 'change', roleChangeHandler);
  }

  private static eventCallback(callback: (e: Event) => void, className: string, e: Event) {
    const element = <HTMLElement>e.target;
    if (element && (<Element>element).closest(`.${className}`)) {
      callback(e);
    }
  }
}

export default AdminPageView;
