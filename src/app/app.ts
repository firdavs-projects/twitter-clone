import { IApp } from '../types/app';

class App implements IApp {
    private static _instance: App;

    private constructor() {
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public start() {
    }
}

const app = App.Instance;
export default app;
