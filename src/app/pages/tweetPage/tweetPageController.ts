import TweetPageView from './tweetPageView';
import authManager from '../../services/authManager';

class TweetPageController {
  private view: TweetPageView;

  constructor() {
    this.view = new TweetPageView();
  }

  public createPage() {
    this.view.render();
  }
}

export default TweetPageController;
