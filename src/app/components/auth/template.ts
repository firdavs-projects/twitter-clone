export function authTemplate(id: string, type: string, label: string): string {
    return `
  <div>
      <input id=${id} type=${type} value = '' maxlength="40"/>
      <label for=${id}>${label}</label>
  </div>
  `;
}
