import { IApp } from './services/types';
import authManager from './services/authManager';
import loader from './components/loader/loader';

class App implements IApp {
  private static _instance: App;
  private authManager;
  private loader;

  private constructor() {
    this.authManager = authManager;
    this.loader = loader;
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public start(): void {
    this.authManager.navigate();
  }
}

const app = App.Instance;
export default app;
