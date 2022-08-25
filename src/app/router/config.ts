import { AuthPageController } from '../pages/authPage/authPageController';
import MainPageController from '../pages/mainPage/mainPageController';
import ProfilePageController from '../pages/profilePage/profilePageController';
import { RouteOption } from '../services/types';

class Config {
    public mainPageController: MainPageController;

    public authPageController: AuthPageController;

    public profilePageController: ProfilePageController;

    constructor() {
        this.mainPageController = new MainPageController();
        this.authPageController = new AuthPageController();
        this.profilePageController = new ProfilePageController();
    }

    public getRoutes(): RouteOption[] {
        return [
            {
                path: /register/,
                callback: () => this.authPageController.createPage(),
                isAuth: false,
            },
            {
                path: /login/,
                callback: () => this.authPageController.createPage(),
                isAuth: false,
            },
            {
                path: / /,
                callback: () => this.mainPageController.createPage(),
                isAuth: true,
            },
            {
                path: /profile/,
                callback: () => this.profilePageController.createPage(),
                isAuth: true,
            },
        ];
    }
}

export default Config;
