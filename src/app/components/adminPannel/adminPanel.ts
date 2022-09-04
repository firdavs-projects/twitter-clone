import { adminTemplate, createTweetRow, createUserRow } from './templates';
import {
  blockUserByAdmin,
  deleteTweetByAdmin,
  deleteUserByAdmin,
  getAllTweets,
  getAllUsers,
  getRoles,
  setUserRoleByAdmin,
  unlockUserByAdmin,
} from '../../services/api';
import { IRoles, IUserInfo, IUserTweet } from '../../services/types';
import { parseJwt } from '../../services/decoder';
import { getLocalStorage } from '../../services/localStorage';
import toast from "../toast/toast";

class AdminPanel {
  private rootNode: HTMLElement;
  private _users: IUserInfo[] | undefined;
  private _tweets: IUserTweet[] | undefined;
  private _roles: IRoles | undefined;

  constructor() {
    this.rootNode = document.createElement('main');
    this.rootNode.className = 'admin';
  }

  public getTemplate(): HTMLElement {
    this.rootNode.textContent = '';
    this.rootNode.insertAdjacentHTML('afterbegin', adminTemplate());
    return this.rootNode;
  }

  public async showTweets(reset = false) {
    const tweets = await this.getTweets(reset);
    const tweetTable = <HTMLElement>document.getElementById('tweet-table');
    tweetTable.innerHTML = '';
    tweets.forEach((t: IUserTweet, i) => {
      tweetTable.innerHTML += createTweetRow(t, i);
    });
  }

  public async showUsers(reset = false) {
    const users = await this.getUsers(reset);
    const roles: IRoles = await this.roles();
    const myId = parseJwt(getLocalStorage()).userId;
    const userTable = <HTMLElement>document.getElementById('user-table');
    userTable.innerHTML = '';
    users.forEach((u: IUserInfo, i) => {
      userTable.innerHTML += createUserRow(u, i, roles, myId);
    });
  }

  public async roles(reset = false): Promise<IRoles> {
    if (this._roles && !reset) {
      return this._roles;
    }
    this._roles = await getRoles();
    return this._roles;
  }

  public async getUsers(reset = false): Promise<IUserInfo[]> {
    if (this._users && !reset) {
      return this._users;
    }
    this._users = await getAllUsers();
    return this._users;
  }

  public async getTweets(reset = false): Promise<IUserTweet[]> {
    if (this._tweets && !reset) {
      return this._tweets;
    }
    const res = await getAllTweets();
    this._tweets = res.tweets;
    return this._tweets;
  }

  public async deleteTweet(e: Event) {
    const badge = <HTMLElement>e.target;
    const id = (<HTMLElement>badge.closest('.delete-admin-tweet')).dataset.id as string;
    await deleteTweetByAdmin(id);
    toast.show('Tweet deleted successfully')
    await this.showTweets(true);
  }

  public async deleteUser(e: Event) {
    const badge = <HTMLElement>e.target;
    const id = (<HTMLElement>badge.closest('.delete-admin-user')).dataset.id as string;
    const myId = parseJwt(getLocalStorage()).userId;
    if (id === myId) {
      return;
    }
    await deleteUserByAdmin(id);
    toast.show('User deleted successfully')
    await this.showUsers(true);
  }

  public async setRoleUser(e: Event) {
    const select = <HTMLSelectElement>e.target;
    const userId = (<HTMLElement>select.closest('.role-admin-user')).dataset.id as string;
    const roleId = select.value;
    await setUserRoleByAdmin(userId, { roleId });
    toast.show('User role updated successfully')
    await this.showUsers(true);
  }

  public async toggleBlockUser(e: Event) {
    const badge = <HTMLElement>e.target;
    const id = (<HTMLElement>badge.closest('.block-admin-user')).dataset.id as string;
    const isActive = badge.classList.contains('bg-success');
    const myId = parseJwt(getLocalStorage()).userId;
    if (id === myId) {
      return;
    }
    if (isActive) {
      await blockUserByAdmin(id);
      toast.show('User blocked successfully')
    } else {
      await unlockUserByAdmin(id);
      toast.show('User unlocked successfully')
    }
    await this.showUsers(true);
  }
}

export default new AdminPanel();
