import headerTemplate from './template';
import { addEventListener } from '../../services/eventListener';
import auth from '../auth/auth';

class Header {
  private rootNode: HTMLElement;

  constructor() {
    this.rootNode = document.createElement('header');
  }

  public getTemplate(page?: string): HTMLElement {
    this.rootNode.textContent = '';
    this.rootNode.insertAdjacentHTML('afterbegin', headerTemplate(page));
    return this.rootNode;
  }
}

export default new Header();
