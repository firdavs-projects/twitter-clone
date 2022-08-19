import { headerListeners } from "./headerController";

const header = () => {
    const header = document.querySelector('.header') as HTMLElement;
    header.innerHTML = `<h1>Mini Twitter Clone</h1>
                            <ul>
                                <li id="adminLink"><a href="#">Admin panel</a></li>
                                <li id="profileLink"><a href="#">Profile</a></li>
                                <li id="feedLink"><a href="#">Feed</a></li>
                            </ul>`;
    headerListeners();
}
export default header;
