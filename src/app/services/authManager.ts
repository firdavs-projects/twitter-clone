import Config from '../router/config';
import router from '../router/router';
import { RouteOption } from './types';

export class AuthManager {
  private config: Config;

  private isLogin: boolean;

  private router;

  constructor(isLogin = false) {
    this.router = router;
    this.config = new Config();
    this.isLogin = isLogin;
  }

  public navigate(path?: string | undefined, isLogin?: boolean): void {
    this.checkAuth(isLogin);
    if (path) {
      this.router.navigate(path);
    }
  }

  private checkAuth(isLogin?: boolean): void {
    // TODO check here token
    const token = localStorage.getItem('token');
    this.isLogin = !!token;
    this.setRouter();
  }

  private setRouter(): void {
    this.definePaths();
    this.setRootPath();
  }

  private definePaths(): void {
    const allRoutes = this.config.getRoutes();
    const routes = [] as RouteOption[];

    allRoutes.forEach((route) => {
      if (route.isAuth === this.isLogin || route.isAuth === null) {
        routes.push(route);
      }
    });

    this.router.addAllPath(routes);
  }

  private setRootPath(): void {
    const rootPath = this.isLogin ? ' ' : 'login';
    this.router.setRoot(rootPath);
  }
}

export default new AuthManager(false);
