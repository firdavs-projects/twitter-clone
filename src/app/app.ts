import { IApp } from './services/types';
import authManager from './services/authManager';

class App implements IApp {
    private static _instance: App;
    private authManager;

    private constructor() {
        this.authManager = authManager;
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
