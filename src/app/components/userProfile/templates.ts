class UserProfileTemplates {
    public createUser = (name: string, lastName: string, username: string, id: string, date: string) => {
        return `<div class="user-container" id="${id}">
        <div class="head-part">
          <div class="image-part">${name.slice(0, 1).toUpperCase()}</div>
          <button class="edit-user-button" data-id="${id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit profile</button>
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
              <button class="save-profile-button" data-bs-dismiss="modal">Save changes</button>
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
        id: string
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
            <input class="post-input">
            <button class="save-button" data-id="${id}">Save</button>
          </div>
          <div class="post-reactions"></div>
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
}

export default UserProfileTemplates;
