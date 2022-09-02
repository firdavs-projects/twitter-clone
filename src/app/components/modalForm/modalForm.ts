import { addNewTweet } from '../../services/api';

export const showModal = () => {
  console.log('show modal');
};

export const addTweet = (id?: string) => {
  const btnTweet = document.querySelector('.btn-tweet') as HTMLButtonElement;
  const addTweetListener = async () => {
    console.log('Post tweet...');

    const formData = new FormData();
    const file = (document.getElementById('tweet-file') as HTMLInputElement).files![0];
    const text = (document.getElementById('tweet-textarea') as HTMLInputElement).value;
    if (id) {
      formData.append('commentToTweetId', id);
    }

    formData.append('text', text);
    formData.append('file', file);
    try {
      const data = await addNewTweet(formData);
      if (data.tweet) {
        console.log('tweet was created...');
      }
    } catch (error) {
      console.log(error);
    }
  };
  btnTweet.removeEventListener('click', addTweetListener);
  btnTweet.addEventListener('click', addTweetListener);
};
