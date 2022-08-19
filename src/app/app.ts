import header from './components/header/headerTemplate';
import { IApp } from './services/types';

class App implements IApp {
    private static _instance: App;

    private constructor() {
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public start() {
        header();
    }
}

const app = App.Instance;
export default app;
