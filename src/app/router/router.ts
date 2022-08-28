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

    addPath(path: string, callback: () => void, isAuth: boolean | null, withId: boolean): void {
        this.routes.push({
            path,
            callback,
            isAuth,
            withId,
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
        console.log(routeToDelete, this.routes)
        if (routeToDelete) {
            this.routes.splice(this.routes.indexOf(routeToDelete), 1);
        }
    }

    getPath(path: string): string {
        const currPath = path.toString()
            .replace(/^\//, '').replace(/\\/, '').replace(/\/$/, '');
        return currPath ? currPath : this.root;
    }

    getRoute(): string {
        let route = '';
        const match = window.location.href
            .split('/#')
            // .match(/#(.*)$/);
        // console.log(match)
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

    checkRoute(): void {
        if (this.current === this.getRoute()) {
            return;
        }

        this.current = this.getRoute();

        this.routes.some((route) => {
            if (this.current) {
                const match = this.current.includes(route.path);
                // const m = this.current.match(route.path) as [];
                // console.log(this.current?.split('/')[1]?.split('/')[0])
                if (match) {
                    const id = route.withId && this.current?.split('/')[1]?.split('/')[0] || ''
                    const currRoute = route.withId ? route.path+'/'+id : route.path
                    this.navigate(currRoute);

                    route.callback.apply({id}, []);
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
