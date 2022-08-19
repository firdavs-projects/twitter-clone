import adminPanel from "../adminPannel/adminPanelTemplate";
import feed from "../feed/feedPageTemplate";
import profile from "../profile/profilePageTemplate"

export const headerListeners = () => {
    (document.getElementById('adminLink') as HTMLElement).addEventListener('click', () => {
        adminPanel();
    });
    (document.getElementById('profileLink') as HTMLElement).addEventListener('click', () => {
        profile();
    });
    (document.getElementById('feedLink') as HTMLElement).addEventListener('click', () => {
        feed();
    })
}