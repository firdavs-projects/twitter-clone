import { adminTemplate } from './templates';

class AdminPanel {
  private rootNode: HTMLElement;

  constructor() {
    this.rootNode = document.createElement('main');
    this.rootNode.className = 'admin';
  }

  public getTemplate(): HTMLElement {
    this.rootNode.textContent = '';
    this.rootNode.insertAdjacentHTML('afterbegin', adminTemplate());
    return this.rootNode;
  }
}

export default new AdminPanel();
