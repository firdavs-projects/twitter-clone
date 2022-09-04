import { RouteOption } from '../services/types';
import { IRouter, IRouterOptions } from './interfaces';

class Router implements IRouter {
  private routes: RouteOption[];

  private root: string;

  private current: string | null;

  private intervalId: ReturnType<typeof setInterval> | null;

  constructor(options: IRouterOptions) {
    this.routes = [];
    if (options.routes) {
      this.routes = options.routes;
    }
    this.root = '/';
    if (options.root) {
      this.root = options.root;
    }
    this.current = null;
    this.intervalId = null;

    this.listen();
  }

  addPath(path: string, callback: () => void, isAuth: boolean | null, withId: boolean, isPrivate: boolean): void {
    this.routes.push({
      path,
      callback,
      isAuth,
      withId,
      isPrivate,
    });
  }

  setRoot(path: string): void {
    this.root = path;
  }

  addAllPath(routes: RouteOption[]): void {
    this.routes = [...routes];
  }

  removePath(path: string): void {
    const routeToDelete = this.routes.find((route: RouteOption) => route.path === path);
    if (routeToDelete) {
      this.routes.splice(this.routes.indexOf(routeToDelete), 1);
    }
  }

  getPath(path: string): string {
    const currPath = path.toString().replace(/^\//, '').replace(/\\/, '').replace(/\/$/, '');
    return currPath ? currPath : this.root;
  }

  getRoute(): string {
    let route = '';
    const match = window.location.href.split('/#');
    route = match && match[1] ? match[1] : this.root;

    return this.getPath(route);
  }

  navigate(path = ''): void {
    window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#/${this.getPath(path)}`;
  }

  private listen(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(this.checkRoute.bind(this), 100);
  }

  getRouteIdParam(url: string): string {
    if (url?.split('#/')[1]) {
      url = url?.split('#/')[1];
    }
    return url?.split('/')[1]?.split('/')[0] || '';
  }

  checkRoute(): void {
    if (this.current === this.getRoute()) {
      return;
    }

    this.current = this.getRoute();

    this.routes.some((route) => {
      if (this.current) {
        const match = this.current.includes(route.path);
        if (match) {
          const id = route.withId && this.getRouteIdParam(this.current);
          const currRoute = route.withId ? route.path + '/' + id : route.path;
          this.navigate(currRoute);

          route.callback.apply({ id }, []);
          return this;
        }
        this.navigate(this.root);

        return false;
      } else {
        this.navigate(this.root);
      }
    });
  }
}

export default new Router({ root: ' ' });
