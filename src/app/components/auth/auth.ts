
import {authTemplate, createAuthError, loginTemplate} from './template';
import Button from "../Button";
import authManager from "../../services/authManager";
import Node from '../Node';
import { getLogin, getRegistration } from '../../services/api';
import { setLocalStorage } from '../../services/localStorage';
import footerTemplate from "../footer/template";

class Auth {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = document.createElement('div');
        // this.rootNode.className = 'text-center h-full';
    }

    public getTemplate(isRegisterRoute: boolean): HTMLElement {
        this.rootNode.textContent = '';
        const authForm = document.createElement('div');
        authForm.classList.add('text-center', 'h-full', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');

        this.rootNode.textContent = '';
        // this.rootNode.insertAdjacentHTML('afterbegin', loginTemplate());
        // return this.rootNode;

        // isRegisterRoute && authForm.insertAdjacentHTML('beforeend', authTemplate('firstName', 'text', 'First name'));
        // isRegisterRoute && authForm.insertAdjacentHTML('beforeend', authTemplate('lastName', 'text', 'Last name'));

        authForm.insertAdjacentHTML('afterbegin', loginTemplate(isRegisterRoute));
        // authForm.insertAdjacentHTML('beforeend', authTemplate('password', 'password', 'Password'));

        const btnWrapper = Node.setChild(authForm, 'div');
        // authForm.insertAdjacentHTML('beforeend', btnWrapper)
        this.rootNode.append(authForm);

        if (isRegisterRoute) {
            const btn = new Button(btnWrapper, 'Registration');
            // const btn = document.getElementById('auth-btn')
            btn.addClass('btn')
            btn.addClass('btn-lg')
            btn.addClass('btn-primary')
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
            const btn = new Button(btnWrapper, 'Login');
            btn.addClass('btn')
            btn.addClass('btn-lg')
            btn.addClass('btn-primary')
            // const btn = document.getElementById('auth-btn')
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
            })

        }
        return this.rootNode;
    }
}

export default new Auth();
