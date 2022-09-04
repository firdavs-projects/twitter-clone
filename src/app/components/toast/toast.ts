import { getToast } from './templates';
import * as bootstrap from 'bootstrap';

class Toast {
  private static _instance: Toast;
  private readonly toastTrigger;
  private toastBody;

  private constructor() {
    document.body.insertAdjacentHTML('beforeend', getToast());
    this.toastTrigger = document.getElementById('live-toast-btn');
    this.toastBody = <HTMLElement>document.getElementById('toast-body');
    const toastLive = <Element>document.getElementById('live-toast');
    if (this.toastTrigger) {
      this.toastTrigger.addEventListener('click', function () {
        const toast = new bootstrap.Toast(toastLive);
        toast.show();
      });
    }
  }

  public show(text: string) {
    this.toastBody.innerText = text;
    this.toastTrigger?.click();
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

const toast = Toast.Instance;
export default toast;
