class UserProfileTemplates {
    public createUser = (name: string, lastName: string, username: string, id: string, date: string) => {
        return `<div class="user-container container" id="${id}">
        <div class="head-part">
          <div class="image-part">${name.slice(0, 1).toUpperCase()}</div>
          <button class="edit-user-button btn btn-primary btn-sm" data-id="${id}" data-bs-target="#editBackdrop">Edit profile</button>
          ${this.createModalForm(this.editBody(), 'editBackdrop')}
          </div>
        <div class="user-data">
          <div class="user-name">${name} ${lastName}</div>
          <div class="user-login">@${username}</div>
          <div class="post-date">Joined ${date}</div>
        </div>`;
    };

    public createModalForm = (body: string, id: string) => {
        return `<div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="modelLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modelLabel">Edit profile</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">${body}</div>
            <div class="modal-footer">
              <button class="save-profile-button btn btn-primary btn-sm">Save changes</button>
            </div>
          </div>
        </div>
      </div>`;
    };

    public editBody = () => {
        return `<div class="form-floating edit-container">
      <input type="text" class="form-control edit-username" id="floatingUsername" placeholder="Username" minlength="3" maxlenght="40" required>
      <label for="floatingUsername">Username</label>
    </div>
    <div class="form-floating edit-container">
      <input type="text" class="form-control edit-name" id="floatingName" placeholder="FirstName" minlength="3" maxlenght="30" required>
      <label for="floatingName">FirstName</label>
    </div>
    <div class="form-floating edit-container">
      <input type="text" class="form-control edit-surname" id="floatingLastName" placeholder="LastName" minlength="3" maxlenght="30" required>
      <label for="floatingLastName">LastName</label>
    </div>
    <div class="form-floating edit-container">
      <input type="text" class="form-control edit-phone" id="floatingPhone" placeholder="Phone" pattern="^[+]?[1-9]+[0-9]*$" max-length="15">
      <label for="floatingPhone">Phone</label>
    </div>`;
    };

    public createPostForm = (
        name: string,
        surname: string,
        login: string,
        date: string,
        text: string,
        id: string,
        likes?: string,
        comments?: string
    ): string => {
        return `<div class="post-form" id="${id}">
        <div class="image-part">${name.slice(0, 1)}</div>
        <div class="data-part">
          <div class="post-data">
            <div class="user-name">${name} ${surname}</div>
            <div class="user-login">@${login}</div>
            <div class="post-date">${date}</div>
          </div>
          <div class="post-text">${text}</div>
          <div class="post-edit">
            <textarea class="post-input form-control" minlength="3" maxlength="255" required></textarea>
            <button class="save-button btn btn-primary btn-sm" data-id="${id}">Save</button>
          </div>
          <div class="post-reactions">
            ${this.createPostReactions(id, likes, comments)}
          </div>
        </div>
        <div class="dropdown">
          <div class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
            data-bs-toggle="dropdown" aria-expanded="false">
          </div>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li class="dropdown-item delete-post" data-id="${id}">Delete</li>
            <li class="dropdown-item edit-post" data-id="${id}">Edit</li>
          </ul>
        </div>
      </div>`;
    };

    public likeSVG = (id: string) => {
        return `<svg viewBox="-4 -4 30 30" aria-hidden="true" class="like-image" data-id="${id}" width="24" height="24" stroke="black" fill="none" stroke-width="2px"><g><path d="M 12 21.638 h -0.014 C 9.403 21.59 1.95 14.856 1.95 8.478 c 0 -3.064 2.525 -5.754 5.403 -5.754 c 2.29 0 3.83 1.58 4.646 2.73 c 0.814 -1.148 2.354 -2.73 4.645 -2.73 c 2.88 0 5.404 2.69 5.404 5.755 c 0 6.376 -7.454 13.11 -10.037 13.157 H 12 Z"></path></g></svg>`;
    };

    public commentSVG = (id: string) => {
        return `<svg viewBox="-4 -4 30 30" aria-hidden="true" class="comment-image" data-id="${id}" width="24" height="24"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>`;
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
}

export default UserProfileTemplates;
