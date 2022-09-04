import Config from '../router/config';
import router from '../router/router';
import { RouteOption } from './types';
import { parseJwt } from './decoder';
import { ADMIN } from './constants';

export class AuthManager {
  private config: Config;

  private isLogin: boolean;
  private isPrivate: boolean;

  private router;

  constructor(isLogin = false) {
    this.router = router;
    this.config = new Config();
    this.isLogin = isLogin;
    this.isPrivate = false;
  }

  public navigate(path?: string | undefined): void {
    this.checkAuth();
    this.checkRole();
    if (path) {
      this.router.navigate(path);
    }
  }

  private checkRole(): void {
    const token = localStorage.getItem('token');
    const payload = token ? parseJwt(token) : null;
    this.isPrivate = payload?.role === ADMIN;
    this.setRouter();
  }

  private checkAuth(): void {
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
      if (route.isPrivate && this.isPrivate) {
        routes.push(route);
      }
      if ((route.isAuth === this.isLogin || route.isAuth === null) && !route.isPrivate) {
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
