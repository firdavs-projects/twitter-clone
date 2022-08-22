export function setLocalStorage(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
};

export function getLocalStorage() {
    if (localStorage.getItem('token')) {
        const token = JSON.parse(localStorage.getItem('token') || '{}');
    }
};

