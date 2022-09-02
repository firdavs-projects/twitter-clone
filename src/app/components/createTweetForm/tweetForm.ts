import { addNewTweet } from '../../services/api';

export const showModal = () => {
  console.log('show modal');
};

export const addTweet = () => {
  const btnTweet = document.querySelector('.btn-tweet') as HTMLButtonElement;
  const textarea = (document.getElementById('tweet-textarea') as HTMLInputElement)
  const addTweetListener = async () => {
    console.log('Try post the tweet...');

    const formData = new FormData();
    const file = (document.getElementById('tweet-file') as HTMLInputElement).files![0];
    const text = (document.getElementById('tweet-textarea') as HTMLInputElement).value;

    if (!text.length) {
      console.log('input field is empty');
      textarea.classList.add('is-invalid');
      return;
    }
    formData.append('text', text);
    formData.append('file', file);
    try {
      const data = await addNewTweet(formData);
      if (data.tweet) {
        console.log('tweet was created...');
        textarea.classList.remove('is-invalid');
        textarea.value = ``;
      }
    } catch (error) {
      console.log(error);
    }
  }
  btnTweet.removeEventListener('click', addTweetListener);
  btnTweet.addEventListener('click', addTweetListener);
};
