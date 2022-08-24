class UserProfileTemplates {
    public createUser = (name: string, lastName: string, username: string, id: string, date: string) => {
        return `<div class="user-container" id="${id}">
        <div class="head-part">
          <div class="image-part">${name.slice(0, 1).toUpperCase()}</div>
          <button class="edit-user-button btn btn-primary btn-sm" data-id="${id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit profile</button>
          ${this.createEditForm()}
          </div>
        <div class="user-data">
          <div class="user-name">${name} ${lastName}</div>
          <div class="user-login">${username}</div>
          <div class="post-date">Joined ${date}</div>
        </div>`;
    };

    public createEditForm = () => {
        return `<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Edit profile</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
            </div>
            <div class="modal-body">
              <div class="edit-container">
                <div>Username</div>
                <input class="edit-username">
              </div>
              <div class="edit-container">
                <div>Firstname</div>
                <input class="edit-name">
              </div>
              <div class="edit-container">
                <div>Lastname</div>
                <input class="edit-surname">
              </div>
              <div class="edit-container">
                <div>Phone</div>
                <input class="edit-phone">
              </div>
            </div>
            <div class="modal-footer">
              <button class="save-profile-button btn btn-primary btn-sm" data-bs-dismiss="modal">Save changes</button>
            </div>
          </div>
        </div>
      </div>`;
    };

    public createPostForm = (
        name: string,
        surname: string,
        login: string,
        date: string,
        text: string,
        id: string,
        likes?: number,
        comments?: number
    ): string => {
        return `<div class="post-form" id="${id}">
        <div class="image-part">${name.slice(0, 1)}</div>
        <div class="data-part">
          <div class="post-data">
            <div class="user-name">${name} ${surname}</div>
            <div class="user-login">${login}</div>
            <div class="post-date">${date}</div>
          </div>
          <div class="post-text">${text}</div>
          <div class="post-edit">
            <textarea class="post-input form-control"></textarea>
            <button class="save-button btn btn-primary btn-sm" data-id="${id}">Save</button>
          </div>
          <div class="post-reactions">
            ${this.createPostReactions(likes, comments)}
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

    public likeSVG = () => {
        return `<svg viewBox="0 0 24 24" aria-hidden="true" class="like-image" width="24" height="24"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>`;
    };

    public commentSVG = () => {
        return `<svg viewBox="0 0 24 24" aria-hidden="true" class="comment-img" width="24" height="24"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>`;
    };

    public createPostReactions = (likes?: number, comments?: number) => {
        return `<div class="like-container">
        ${this.likeSVG()}
        <div class="like-counter">${likes}</div>
      </div>
      <div class="comment-container">
        ${this.commentSVG()}
        <div class="comment-counter">${comments}</div>
      </div>`;
    };
}

export default UserProfileTemplates;
