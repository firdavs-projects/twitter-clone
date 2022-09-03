import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import adminPanel from '../../components/adminPannel/adminPanel';
import Node from '../../components/Node';
import Button from '../../components/Button';
import authManager from '../../services/authManager';
import Router from '../../router/router';

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
    main.node.append(adminPanel.getTemplate());
  }
}

export default AdminPageView;
