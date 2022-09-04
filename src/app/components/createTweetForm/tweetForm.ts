import { addNewTweet } from '../../services/api';
import toast from '../toast/toast';

export const showModal = () => {
  console.log('show modal');
};

export const addTweet = (id?: string) => {
  const btnTweet = document.querySelector('.btn-tweet') as HTMLButtonElement;
  const textarea = document.getElementById('tweet-textarea') as HTMLInputElement;
  const addTweetListener = async () => {
    const formData = new FormData();
    const files = (document.getElementById('tweet-file') as HTMLInputElement | null)?.files || [];
    const file = files[0] ? files[0] : null;
    const text = (document.getElementById('tweet-textarea') as HTMLInputElement).value;
    if (id) {
      formData.append('commentToTweetId', id);
    }

    if (!text.length) {
      toast.show('input field is empty');
      textarea.classList.add('is-invalid');
      return;
    }
    formData.append('text', text);
    file && formData.append('file', file);
    try {
      const data = await addNewTweet(formData);
      if (data.tweet) {
        toast.show('Tweet was created');
        textarea.classList.remove('is-invalid');
        textarea.value = ``;
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  btnTweet.removeEventListener('click', addTweetListener);
  btnTweet.addEventListener('click', addTweetListener);
};
