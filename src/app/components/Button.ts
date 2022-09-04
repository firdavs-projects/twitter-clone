import Node from './Node';

export default class Button {
  button: Node<HTMLElement>;

  constructor(parentNode: HTMLElement, text = 'signup') {
    this.button = new Node(parentNode, 'button', 'waves-effect waves-light btn-large', `${text}`);
  }

  setCompleted(): void {
    this.button.node.innerHTML = 'Completed';
    this.button.node.classList.add('btn-completed');
  }

  addClass(text: string): void {
    this.button.node.classList.add(text);
  }

  onclick(onclick: (e: Event) => void): void {
    this.button.node.onclick = (e: Event) => onclick(e);
  }
}
