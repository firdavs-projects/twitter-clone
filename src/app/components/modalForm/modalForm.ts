import { addNewTweet } from "../../services/api";

export const showModal = () => {
    console.log('show modal');
}

// export const createModalForm = () => {
//     const newTweetForm = document.querySelector('.new-tweet-form') as HTMLElement;
//     newTweetForm.innerHTML = `
//         <form id="formElem">
//             <textarea class="form-control" id="tweet-textarea" rows="3" placeholder="What's happening?"></textarea>
//             <input class="form-control" type="file" id="tweet-file">
//         </form>
        
//         <button type="button" class="btn btn-primary btn-tweet">Tweet</button>
//         <button type="button" class="close btn-close">
//     `;
//     addTweet();
// }

export const addTweet = () => {
    const btnTweet = document.querySelector('.btn-tweet') as HTMLButtonElement;
    btnTweet.addEventListener('click', async () => {
        console.log('Post tweet...');

        let formData = new FormData();
        let file = (document.getElementById("tweet-file") as HTMLInputElement).files![0];
        let text = (document.getElementById("tweet-textarea") as HTMLInputElement).value;

        formData.append("text", text);
        formData.append("file", file);
        try {
            const data = await addNewTweet(formData);
            if (data.tweet) {
                console.log('tweet was created...');
            }

        } catch (error) {
            console.log(error);
        }
    })
}