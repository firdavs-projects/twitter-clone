export default function headerTemplate(page = ''): string {
  return `
    <nav class="py-2 bg-light border-bottom">
    <div class="container d-flex flex-wrap">
      <ul class="nav me-auto">
        <li class="nav-item"><a href="#/" class="nav-link link-dark px-2 active" aria-current="page">News</a></li>
      </ul>
      <ul class="nav">
        <li class="nav-item"><a href="#/profile" class="nav-link link-dark px-2">Profile</a></li>
        <li class="nav-item logout-header" id="logout-header"><a href="javascript:" class="nav-link link-dark px-2">Logout</a></li>
      </ul>
    </div>
    </nav>
    <header class="py-3 mb-4 border-bottom">
      <div class="container d-flex flex-wrap justify-content-center">
        <a href="#/" class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
          <svg width="40" height="32" fill="currentColor" class="bi bi-twitter me-2" viewBox="0 0 16 16">
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
          </svg>
          <span class="fs-4">Twitter Clone</span>
        </a>

        <form id="formElem">
            <textarea 
                class="form-control" 
                id="tweet-textarea" 
                rows="1" 
                placeholder="${page === 'tweet-page' ? 'Leave your comment in this tweet...' : "What's happening?"}"
            ></textarea>
            <input class="fileInput" type="file" id="tweet-file">
            <label for="tweet-file">Add image</label>
            <button type="button" class="btn btn-primary btn-tweet">Tweet</button>
        </form>
      </div>
    </header>
  `;
}
