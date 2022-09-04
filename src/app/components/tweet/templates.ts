class TweetTemplate {
  public createStructure = () => {
    return `<div class="tweets-container container d-flex flex-column">
      <div class="main-tweet d-flex justify-content-center"></div>
      <div class="post-container">
        <h5 class="post-heading">Comments</h5>
      </div>
    </div>`;
  };
}

export default TweetTemplate;
