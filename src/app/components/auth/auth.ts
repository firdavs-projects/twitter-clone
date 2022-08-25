import { authTemplate, createAuthError, loginTemplate } from './template';
import Button from '../Button';
import authManager from '../../services/authManager';
import Node from '../Node';
import { getLogin, getRegistration } from '../../services/api';
import { setLocalStorage } from '../../services/localStorage';
import footerTemplate from '../footer/template';

class Auth {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = document.createElement('div');
        // this.rootNode.className = 'text-center h-full';
    }

    public getTemplate(isRegisterRoute: boolean): HTMLElement {
        this.rootNode.textContent = '';
        this.rootNode.classList.add(
            'text-center',
            'h-full',
            'd-flex',
            'flex-column',
            'justify-content-center',
            'align-items-center'
        );
        this.rootNode.insertAdjacentHTML('afterbegin', loginTemplate(isRegisterRoute));

        const btnWrapper = Node.setChild(this.rootNode, 'div');

        const btn = new Button(btnWrapper, isRegisterRoute ? 'Sign up' : 'Sign in');
        btn.addClass('btn');
        btn.addClass('btn-lg');
        btn.addClass('btn-primary');

        if (isRegisterRoute) {
            btn?.onclick(async () => {
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
                        lastName: inputLastName.value,
                    });

                    if (data.token) {
                        setLocalStorage(data.token);
                        console.log(`user has been created`);
                        authManager.navigate('/', true);
                    } else {
                        console.log('Incorrect data');
                        errorElement ? errorElement.remove() : null;
                        // authForm.insertAdjacentHTML('beforeend', createAuthError('Incorrect data'));
                    }
                } catch (error) {
                    console.log(error);
                }
            });
        } else {
            btn.onclick(async () => {
                console.log('logining...');
                const inputUserName = document.getElementById('username') as HTMLInputElement;
                const inputPassword = document.getElementById('password') as HTMLInputElement;
                const errorElement = document.getElementById('error-auth-message');
                try {
                    const data = await getLogin({ username: inputUserName.value, password: inputPassword.value });
                    if (data.token) {
                        setLocalStorage(data.token);
                        authManager.navigate('/', true);
                        console.log(`login successful`);
                    } else {
                        console.log(`Incorrect username or password`);
                        errorElement ? errorElement.remove() : null;
                        // authForm.insertAdjacentHTML('beforeend', createAuthError('Incorrect username or password'));
                    }
                } catch (error) {
                    console.log(error);
                }
            });
        }
        return this.rootNode;
    }
}

export default new Auth();
