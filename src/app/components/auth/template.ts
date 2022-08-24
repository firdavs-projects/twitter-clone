export function authTemplate(id: string, type: string, placeholder: string): string {
  return `
  <div>
      <input id=${id} type=${type} value = '' maxlength="40" placeholder="${placeholder}"/>
  </div>
  `;
}
export function createAuthError(errorMessage: string) {
  return `
  <div id="error-auth-message">
    <p>${errorMessage}</p>
  </div>
  `;
}

export function loginTemplate(isRegisterRoute: boolean): string {
  return `
<div class="form-signin w-100 d-flex justify-content-center align-items-center">
  <form class="w-100">
    <img class="mb-4" src="https://rs.school/favicon.ico" alt="" width="60" height="60">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input type="text" class="form-control username-input" id="username" placeholder="Username">
      <label for="floatingInput">Username</label>
    </div>
    ${
      isRegisterRoute ? 
      `<div class="form-floating">
          <input type="text" class="form-control base-input" id="firstname" placeholder="John">
          <label for="floatingInput">First name</label>
        </div>
        <div class="form-floating">
          <input type="text" class="form-control base-input" id="lastname" placeholder="Doe">
          <label for="floatingInput">Last name</label>
        </div>` : ''
    }
    <div class="form-floating">
      <input type="password" class="form-control password-input" id="password" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"> Remember me
      </label>
    </div>
<!--    <button id="auth-btn" class="w-100 h-100 btn btn-lg btn-primary" type="submit">Sign in</button>-->
<!--    <p class="mt-5 mb-3 text-muted">© 2017–2022</p>-->
  </form>
</div>
  `;
}
