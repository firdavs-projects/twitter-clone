import authView, { AuthView } from './authPageView';

export class AuthPageController {

    private view: AuthView;

    constructor() {
        this.view = authView;
    }

    public createPage(): void {
        this.view.render();
    }
}

export default new AuthPageController();
