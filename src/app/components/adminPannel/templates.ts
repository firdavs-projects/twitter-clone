export const adminTemplate = (): string => {
    return `
<div class="container">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="space" data-bs-toggle="tab" type="button" role="tab" disabled></button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="tweet-tab" data-bs-toggle="tab" data-bs-target="#tweet-tab-pane" type="button" role="tab" aria-controls="tweet-tab-pane" aria-selected="true">Tweets</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="user-tab" data-bs-toggle="tab" data-bs-target="#user-tab-pane" type="button" role="tab" aria-controls="user-tab-pane" aria-selected="false">Users</button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="tweet-tab-pane" role="tabpanel" aria-labelledby="tweet-tab" tabindex="0">
           Tweets
      </div>
      <div class="tab-pane fade" id="user-tab-pane" role="tabpanel" aria-labelledby="user-tab" tabindex="0">
           Users
      </div>
    </div>
</div>
`;
}

