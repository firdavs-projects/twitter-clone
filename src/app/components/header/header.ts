import headerTemplate from './template';

class Header {
  private readonly rootNode: HTMLElement;

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
