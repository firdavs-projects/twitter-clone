import authModel, { AuthModel } from './authPageModel';
import authView, { AuthView } from './authPageView';

export class AuthPageController {
    private model: AuthModel;

    private view: AuthView;

    constructor() {
        this.model = authModel;
        this.view = authView;
    }

    public createPage(): void {
        this.view.render();
    }
}

export default new AuthPageController();
