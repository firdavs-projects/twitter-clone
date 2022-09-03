import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import adminPanel from '../../components/adminPannel/adminPanel';
import Node from '../../components/Node';
import Button from '../../components/Button';
import authManager from '../../services/authManager';
import Router from '../../router/router';
import {addEventListener, removeAllEventListeners} from "../../services/eventListener";

class AdminPageView {
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
<<<<<<< HEAD
    main.node.append(adminPanel.getTemplate());
=======
    main.node.append(adminPanel.getTemplate())
    adminPanel.showTweets()
    adminPanel.showUsers()

    removeAllEventListeners()
    const clickListeners = [
      (e: Event) =>
          AdminPageView.eventCallback(adminPanel.deleteTweet.bind(adminPanel), 'delete-admin-tweet', e),
      (e: Event) =>
          AdminPageView.eventCallback(adminPanel.deleteUser.bind(adminPanel), 'delete-admin-user', e),
      (e: Event) =>
          AdminPageView.eventCallback(adminPanel.toggleBlockUser.bind(adminPanel), 'block-admin-user', e),
    ]
    clickListeners.forEach(l => addEventListener(document, 'click', l))
    const roleChangeHandler = (e: Event) => {
      AdminPageView.eventCallback(adminPanel.setRoleUser.bind(adminPanel), 'role-admin-user', e)
    }
    addEventListener(document, 'change', roleChangeHandler)
  }

  private static eventCallback(
      callback: (e: Event) => void,
      className: string,
      e: Event,
  ) {
    const element = <HTMLElement>e.target;
    if (element && (<Element>element).closest(`.${className}`)) {
      callback(e);
    }
>>>>>>> 9f633b7ce12a15377d9cf04149e81b7421282d0a
  }
}

export default AdminPageView;
