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