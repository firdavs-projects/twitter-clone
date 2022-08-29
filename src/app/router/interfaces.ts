import { RouteOption } from '../services/types';

export interface IRouter {
  addPath: (path: string, callback: () => void, isAuth: boolean | null, withId: boolean) => void;
  removePath: (path: string) => void;
  getPath: (path: string) => string | void;
  getRoute: () => string;
  navigate: (path?: string) => void;
  checkRoute: () => void;
}

export interface IRouterOptions {
  root: string;
  routes?: RouteOption[];
}
