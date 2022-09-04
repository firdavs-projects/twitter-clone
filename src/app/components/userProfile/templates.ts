class UserProfileTemplates {
  public createStructure = (isMyProfile: boolean) => {
    return `
    <div class="page-container col-lg-8 d-flex justify-content-start flex-column">
    </div>
    ${
      isMyProfile
        ? `<div class="aside col-lg-4">
      <div class="popular">
        <h5 class="popular-users">Popular users</h5>
        <div class="popular-user-container"></div>
      </div>
    </div>`
        : ''
    }
`;
  };

  public createUser = (
    name: string,
    lastName: string,
    username: string,
    id: string,
    date: string,
    status: string,
    image: string | null,
    following: number,
    followers: number,
    isMe: boolean,
    isAdmin: boolean
  ) => {
    return `<div class="user-container container ${isMe ? '' : 'another-user'}" id="${id}">
        <div class="head-part">
          ${this.profileImage(image, name)}
          ${this.editProfileOption(isMe, id, isAdmin)}
        </div>
        <div class="user-data ${isMe ? '' : 'another-user'}">
          <div class="user-name">${name} ${lastName}</div>
          <div class="user-status-container">
            ${!isMe && !status ? '' : this.statusSVG()}
            <div class="user-status">${status ? status : 'Change your status ...'}</div>
            ${isMe ? `<input class="status-input form-control" minlength="3" maxlength="150" required>` : ''}
          </div>
          <div class="user-login">@${username}</div>
          <div class="post-date">Joined ${date}</div>
          <div class="follows-links">
            <div type="button" class=" show-follows" data-bs-toggle="modal" data-bs-target="#exampleModal" data-follows="subscriptions">
              <span>${following}</span> Following
            </div>
            <div type="button" class=" show-follows" data-bs-toggle="modal" data-bs-target="#exampleModal" data-follows="followers">
              <span>${followers}</span> Followers
            </div>
          </div>
        </div>
        ${this.createFollowsForm()}`;
  };

  public editProfileOption(isMe: boolean, id: string, isAdmin: boolean) {
    if (isMe) {
      return `
            <div class="d-flex flex-column justify-content-end align-items-end">
                <button class="edit-user-button btn btn-primary btn-sm" data-id="${id}" data-bs-target="#editBackdrop">
                    Edit profile
                </button>
                <button id="logout" class="btn btn-sm mt-2 btn-outline-danger logout">Logout</button>
                ${isAdmin ? `<a class="d-block mt-1 text-end" href="#/admin">Панель администратора</a>` : ''}
            </div>

        ${this.createModalForm(this.editBody(), 'editBackdrop')}`;
    }
    return ``;
  }

  public profileImage(image: string | null, name: string) {
    if (image) {
      return `<div class="image-part">
              <img src="${image}" alt="profile image" class="profile-image">
            </div>`;
    }
    return `<div class="image-part">${name.slice(0, 1).toUpperCase()}</div>`;
  }

  public createModalForm = (body: string, id: string) => {
    return `<div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="modelLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modelLabel">Edit profile</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form class="modal-body edit-body">${body}</form>
            <div class="modal-footer">
              <button class="save-profile-button btn btn-primary btn-sm">Save changes</button>
            </div>
          </div>
        </div>
      </div>`;
  };

  public editBody = () => {
    return `
    <input type="file" class="form-control edit-image" name="file" id="profileImage">
    <div class="form-floating edit-container">
      <input type="text" class="form-control edit-username" name="username" id="floatingUsername" placeholder="Username" minlength="3" maxlenght="40" required>
      <label for="floatingUsername">Username</label>
    </div>
    <div class="form-floating edit-container">
      <input type="text" class="form-control edit-name" name="firstName" id="floatingName" placeholder="FirstName" minlength="3" maxlenght="30" required>
      <label for="floatingName">FirstName</label>
    </div>
    <div class="form-floating edit-container">
      <input type="text" class="form-control edit-surname" name="lastName" id="floatingLastName" placeholder="LastName" minlength="3" maxlenght="30" required>
      <label for="floatingLastName">LastName</label>
    </div>
    <div class="form-floating edit-container">
      <input type="text" class="form-control edit-phone" name="phone" id="floatingPhone" placeholder="Phone" pattern="^[+]?[1-9]+[0-9]*$" max-length="15">
      <label for="floatingPhone">Phone</label>
    </div>`;
  };

  public createPostForm = (
    name: string,
    surname: string,
    login: string,
    avatar: string | null,
    date: string,
    text: string,
    id: string,
    likes?: string,
    comments?: string,
    image?: string | null,
    isMe?: boolean,
    isLikedByMe?: boolean,
    commentToTweetId?: string
  ): string => {
    return `<div class="post-form" id="${id}">
        ${this.profileImage(avatar, name)}
        <div class="data-part">
          <a href="#/profile/${isMe ? '' : login}" class="post-data">
            <div class="user-name">${name} ${surname}</div>
            <div class="user-login">@${login}</div>
            <div class="post-date">${date}</div>
          </a>
          <div class="post-text">${text}</div>
          ${
            commentToTweetId && !window?.location?.hash.includes('tweet')
              ? `<div class="post-text"><a class="link-info" href="#/tweet/${commentToTweetId}"><small>... commented to tweet</small></a></div>`
              : ''
          }
          <div class="post-edit">
            <div class="edit-tweet-form">
              <textarea class="post-input form-control" minlength="3" maxlength="255" required></textarea>
              <input class="fileInput" type="file" id="tweet-file-download">
              <label for="tweet-file-download">Change image</label>
              </div>
            <button class="save-button btn btn-primary btn-sm" data-id="${id}">Save</button>
          </div>
          <div class="tweet-img">
            <img src="${!image ? (image = '#') : image}" alt="">
          </div>
          <div class="post-reactions">
            ${this.createPostReactions(id, likes, comments)}
          </div>
        </div>
        ${isMe ? this.postDropdown(id) : ''}
      </div>`;
  };

  public postDropdown = (id: string) => {
    return `<div class="dropdown">
    <div class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
      data-bs-toggle="dropdown" aria-expanded="false">
    </div>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <li class="dropdown-item delete-post" data-id="${id}">Delete</li>
      <li class="dropdown-item edit-post" data-id="${id}">Edit</li>
    </ul>
  </div>`;
  };

  public likeSVG = (id: string, isLikedByMe?: boolean) => {
    return `<svg viewBox="-4 -4 30 30" aria-hidden="true" class="like-image ${
      isLikedByMe ? 'active' : ''
    }" data-id="${id}" width="24" height="24" stroke="black" fill="none" stroke-width="2px"><g><path d="M 12 21.638 h -0.014 C 9.403 21.59 1.95 14.856 1.95 8.478 c 0 -3.064 2.525 -5.754 5.403 -5.754 c 2.29 0 3.83 1.58 4.646 2.73 c 0.814 -1.148 2.354 -2.73 4.645 -2.73 c 2.88 0 5.404 2.69 5.404 5.755 c 0 6.376 -7.454 13.11 -10.037 13.157 H 12 Z"></path></g></svg>`;
  };

  public commentSVG = (id: string) => {
    return `<svg viewBox="-4 -4 30 30" aria-hidden="true" class="comment-image" data-id="${id}" width="24" height="24"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>`;
  };

  public statusSVG = () => {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3.00015C13.2477 3.00015 14.4361 3.25403 15.5163 3.71296L14.3609 4.8793C13.6186 4.6333 12.8249 4.50015 12 4.50015C7.85786 4.50015 4.5 7.85801 4.5 12.0001C4.5 13.425 4.89727 14.7894 5.63583 15.9705C5.93764 16.4532 6.29368 16.9004 6.69639 17.3031C7.09848 17.7053 7.5449 18.0609 8.02668 18.3625C9.20844 19.1022 10.5739 19.5001 12 19.5001C16.1421 19.5001 19.5 16.1423 19.5 12.0001C19.5 11.1997 19.3746 10.4286 19.1424 9.70531L20.3069 8.53064C20.7534 9.59837 21 10.7705 21 12.0001C21 16.9707 16.9706 21.0001 12 21.0001C10.2904 21.0001 8.64945 20.5219 7.23081 19.6339C6.65294 19.2722 6.1177 18.8458 5.63566 18.3637C5.1529 17.8809 4.72601 17.3447 4.36401 16.7658C3.4774 15.348 3 13.7083 3 12.0001C3 7.02958 7.02944 3.00015 12 3.00015ZM21.1626 2.57315L21.3013 2.7014C22.2387 3.63875 22.2421 5.15743 21.3089 6.09897L14.554 12.9146C14.4397 13.0299 14.2991 13.1156 14.1443 13.1644L9.79631 14.5347C9.69096 14.5679 9.57864 14.5094 9.54544 14.4041C9.53311 14.3649 9.53311 14.323 9.54544 14.2838L10.9171 9.93134C10.965 9.77941 11.0485 9.64112 11.1606 9.52798L17.9189 2.70897C18.8045 1.81541 20.2215 1.76864 21.1626 2.57315Z" fill="#212121"/>
        </svg>`;
  };

  public createPostReactions = (id: string, likes?: string, comments?: string) => {
    return `<div class="like-container">
        ${this.likeSVG(id)}
        <div class="like-counter">${likes}</div>
      </div>
      <div class="comment-container">
        ${this.commentSVG(id)}
        <div class="comment-counter">${comments}</div>
      </div>`;
  };

  public createFollowsForm = () => {
    return `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Following and followers</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="change-follows">
              <div class="follow-button show-follows" data-follows="subscriptions">Following</div>
              <div class="follow-button show-follows" data-follows="followers">Followers</div>
            </div>
            <div class="follows-container"></div>
          </div>
        </div>
      </div>
    </div>`;
  };

  public createFollower = (
    name: string,
    surname: string,
    username: string,
    id: string,
    avatar: string,
    follow: boolean,
    isMyProfile: boolean
  ): string => {
    return `<div class="follower-form" data-id="${id}" data-name="${username}">
        ${this.profileImage(avatar, name)}
        <div class="post-data">
          <div class="user-name">${name} ${surname}</div>
          <div class="user-login">@${username}</div>
        </div>
        ${
          isMyProfile
            ? ''
            : `<button type="button" class="btn btn-primary btn-sm subscribe-btn ${
                follow ? 'active' : ''
              }" text="Follow" active="Following" hover-active="Unfollow"></button>`
        }
      </div>`;
  };

  public tweetsNotFound = (): string => `
    <div class="px-4 py-5 my-5 text-center">
    <svg width="60" height="50" fill="currentColor" class="bi bi-twitter me-2 mb-3" viewBox="0 0 16 16">
        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
    </svg>
    <h1 class="display-6 fw-bold">Welcome</h1>
    <div class="col-lg-8 mx-auto">
      <p class="lead mb-4">Subscribe to users to follow their updates.</p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <a class="px-4 gap-3" href="#/profile"><button type="button" class="btn btn-primary btn-lg">Go to subscribe</button></a>
      </div>
    </div>
  </div>
  `;
}

export default UserProfileTemplates;
