import { authTemplate } from './template';
import Button from "../Button";
import authManager from "../../services/authManager";
import Node from '../Node';

class Auth {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = document.createElement('main');
        this.rootNode.className = 'auth';
    }

    public getTemplate(isRegisterRoute: boolean): HTMLElement {
        this.rootNode.textContent = '';
        isRegisterRoute && this.rootNode.insertAdjacentHTML('beforeend', authTemplate('firstName', 'text', 'Имя'));
        isRegisterRoute && this.rootNode.insertAdjacentHTML('beforeend', authTemplate('lastName', 'text', 'Фамилия'));

        this.rootNode.insertAdjacentHTML('beforeend', authTemplate('username', 'text', 'Имя пользователя'));
        this.rootNode.insertAdjacentHTML('beforeend', authTemplate('password', 'password', 'Пароль'));

        const btnWrapper = Node.setChild(this.rootNode, 'div');
        const btn = new Button(btnWrapper,'login test')
        btn.onclick(() => {
            authManager.navigate('/', true);
        })

        return this.rootNode;
    }
}

export default new Auth();
