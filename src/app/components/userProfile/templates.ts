class UserProfileTemplates {
    public createUser = (name: string, lastName: string, username: string, id: string, date: string) => {
        return `<div class="user-container" id="${id}">
        <div class="head-part">
          <div class="image-part">${name.slice(0, 1).toUpperCase()}</div>
          <button class="edit-user-button" data-id="${id}">Edit profile</button>
        </div>
        <div class="user-data">
          <div class="user-name">${name} ${lastName}</div>
          <div class="user-login">${username}</div>
          <div class="post-date">Joined ${date}</div>
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
