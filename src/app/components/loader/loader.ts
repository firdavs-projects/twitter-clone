import {getLoader} from "./templates";

class Loader {
    private _loading: number[] = [];
    private static _instance: Loader;

    private constructor() {
        document.body.insertAdjacentHTML('beforeend', getLoader())
    }

    public push(n: number) {
        this._loading.push(n);
        this.setLoader()
    }
    public remove(n: number) {
        this._loading = this._loading.filter(i => i!== n);
        this.setLoader()
    }

    private setLoader() {
        const loader = document.getElementById('loader');
        if (this._loading.length) {
            loader && loader.classList.add('active')
        } else {
            loader && loader.classList.remove('active')
        }
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}
const loader = Loader.Instance;
export default loader;
