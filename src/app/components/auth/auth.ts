import { authTemplate, createAuthError } from './template';
import Button from "../Button";
import authManager from "../../services/authManager";
import Node from '../Node';
import { getLogin, getRegistration } from '../../services/api';

class Auth {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = document.createElement('main');
        this.rootNode.className = 'auth';
    }

    public getTemplate(isRegisterRoute: boolean): HTMLElement {
        this.rootNode.textContent = '';
        isRegisterRoute && this.rootNode.insertAdjacentHTML('beforeend', authTemplate('firstName', 'text', 'First name'));
        isRegisterRoute && this.rootNode.insertAdjacentHTML('beforeend', authTemplate('lastName', 'text', 'Last name'));

        this.rootNode.insertAdjacentHTML('beforeend', authTemplate('username', 'text', 'User name'));
        this.rootNode.insertAdjacentHTML('beforeend', authTemplate('password', 'password', 'Password'));

        const btnWrapper = Node.setChild(this.rootNode, 'div');

        if (isRegisterRoute) {
            const btn = new Button(btnWrapper, 'registration');
            btn.onclick(async () => {
                console.log('registration...');
                const inputUserName = document.getElementById('username') as HTMLInputElement;
                const inputPassword = document.getElementById('password') as HTMLInputElement;
                const inputFirstName = document.getElementById('firstName') as HTMLInputElement;
                const inputLastName = document.getElementById('lastName') as HTMLInputElement;
                const errorElement = document.getElementById('error-auth-message');
                try {
                    const data = await getRegistration({
                        username: inputUserName.value,
                        password: inputPassword.value,
                        firstName: inputFirstName.value,
                        lastName: inputLastName.value
                    });

                    if (data.userId) {
                        console.log(`user has been created`);
                        authManager.navigate('/', true);
                    } else {
                        console.log('Incorrect data');
                        errorElement ? errorElement.remove() : null;
                        this.rootNode.insertAdjacentHTML('beforeend', createAuthError('Incorrect data'));
                    }
                } catch (error) {
                    console.log(error);
                }

            })

        } else {
            const btn = new Button(btnWrapper, 'login');
            btn.onclick(async () => {
                console.log('logining...');
                const inputUserName = document.getElementById('username') as HTMLInputElement;
                const inputPassword = document.getElementById('password') as HTMLInputElement;
                const errorElement = document.getElementById('error-auth-message');
                try {
                    const data = await getLogin({ username: inputUserName.value, password: inputPassword.value });
                    if (data.userId) {
                        authManager.navigate('/', true);
                        console.log(`login successful`);
                    } else {
                        console.log(`Incorrect username or password`);
                        errorElement ? errorElement.remove() : null;
                        this.rootNode.insertAdjacentHTML('beforeend', createAuthError('Incorrect username or password'));
                    }
                } catch (error) {
                    console.log(error);
                }
            })
        }
        return this.rootNode;
    }
}

export default new Auth();
