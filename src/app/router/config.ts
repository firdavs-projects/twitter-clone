import { AuthPageController } from '../pages/authPage/authPageController';
import MainPageController from '../pages/mainPage/mainPageController';
import ProfilePageController from '../pages/profilePage/profilePageController';
import TweetPageController from '../pages/tweetPage/tweetPageController';
import { RouteOption } from '../services/types';
import AdminPageController from '../pages/adminPage/adminPageController';

class Config {
  public mainPageController: MainPageController;
  public tweetPageController: TweetPageController;
  public adminPageController: AdminPageController;

  public authPageController: AuthPageController;

  public profilePageController: ProfilePageController;

  constructor() {
    this.mainPageController = new MainPageController();
    this.tweetPageController = new TweetPageController();
    this.adminPageController = new AdminPageController();
    this.authPageController = new AuthPageController();
    this.profilePageController = new ProfilePageController();
  }

  public getRoutes(): RouteOption[] {
    return [
      {
        path: 'register',
        callback: () => this.authPageController.createPage(),
        isAuth: false,
        withId: false,
        isPrivate: false,
      },
      {
        path: 'login',
        callback: () => this.authPageController.createPage(),
        isAuth: false,
        withId: false,
        isPrivate: false,
      },
      {
        path: ' ',
        callback: () => this.mainPageController.createPage(),
        isAuth: true,
        withId: false,
        isPrivate: false,
      },
      {
        path: 'profile',
        callback: () => this.profilePageController.createPage(),
        isAuth: true,
        withId: true,
        isPrivate: false,
      },
      {
        path: 'tweet',
        callback: () => this.tweetPageController.createPage(),
        isAuth: true,
        withId: true,
        isPrivate: false,
      },
      {
        path: 'admin',
        callback: () => this.adminPageController.createPage(),
        isAuth: true,
        withId: true,
        isPrivate: true,
      },
    ];
  }
}

export default Config;
