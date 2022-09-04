import { IRoles, IUserInfo, IUserTweet } from '../../services/types';
import { getDate } from '../../services/utils';

export const adminTemplate = (): string => {
  return `
<div class="container mb-auto overflow-auto">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="space" data-bs-toggle="tab" type="button" role="tab" disabled></button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="tweet-tab" data-bs-toggle="tab" data-bs-target="#tweet-tab-pane" type="button" role="tab" aria-controls="tweet-tab-pane" aria-selected="true">Tweets</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="user-tab" data-bs-toggle="tab" data-bs-target="#user-tab-pane" type="button" role="tab" aria-controls="user-tab-pane" aria-selected="false">Users</button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="tweet-tab-pane" role="tabpanel" aria-labelledby="tweet-tab" tabindex="0">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tweet</th>
              <th scope="col">Username</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Comments</th>
              <th scope="col">Likes</th>
              <th scope="col">Created</th>
              <th scope="col">Controls</th>
            </tr>
          </thead>
          <tbody id="tweet-table"></tbody>
        </table>
      </div>
      <div class="tab-pane fade" id="user-tab-pane" role="tabpanel" aria-labelledby="user-tab" tabindex="0">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Tweets</th>
              <th scope="col">Likes</th>
              <th scope="col">Joined</th>
              <th scope="col">Role</th>
              <th scope="col">Blocked</th>
              <th scope="col">Controls</th>
            </tr>
          </thead>
          <tbody id="user-table"></tbody>
        </table>
      </div>
    </div>
</div>
`;
};

export const createUserRow = (user: IUserInfo, index: number, roles: IRoles, myId: string): string => `
    <tr>
      <th scope="row">${index + 1}</th>
      <td><a href="#/profile/${user.username}">@${user.username}</a></td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>

      <td>${user.tweets.length}</td>
      <td>${user.likedTweets.length}</td>
      <td>${getDate(user.date)}</td>
      <td>
        <select class="form-select form-select-sm role-admin-user" data-id="${user._id}" aria-label=".form-select-sm" ${
  user._id === myId ? 'disabled' : ''
}>
          <option selected value="${user.role}">${roles.roles.find((r) => r._id === user.role)?.role}</option>
          ${roles.roles
            .filter((j) => j._id !== user.role)
            .map(
              (r) => `
               <option value="${r._id}">${r.role}</option>
          `
            )}
        </select>
      </td>
      <td>${
        user.blocked
          ? `<span class="badge bg-danger block-admin-user" data-id="${user._id}">Blocked</span>`
          : `<span class="badge bg-success block-admin-user" data-id="${user._id}">Active</span>`
      }
      </td>
      <td>
        ${
          myId === user._id
            ? ''
            : `<span class="badge pointer-event bg-secondary delete-admin-user" data-id="${user._id}">Delete</span>`
        }
      </td>
    </tr>
`;

export const createTweetRow = (tweet: IUserTweet, index: number): string => `
    <tr>
      <th scope="row">${index + 1}</th>
      <td><a href="#/tweet/${tweet._id}">${tweet.text}</a></td>
      <td><a href="#/profile/${tweet.user.username}">@${tweet.user.username}</a></td>
      <td>${tweet.user.firstName}</td>
      <td>${tweet.user.lastName}</td>

      <td>${tweet.tweets.length}</td>
      <td>${tweet.likes.length}</td>
      <td>${getDate(tweet.date)}</td>
      
      <td><span class="badge pointer-event bg-danger delete-admin-tweet" data-id="${tweet._id}">Delete</span></td>
    </tr>
`;
