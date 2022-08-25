export default function footerTemplate(): string {
    return `
<footer class="border-top mt-4" style="z-index: 100">
  <div class="container d-flex flex-wrap justify-content-between align-items-center py-3">
    <p class="col-md-4 mb-0 text-muted p-2">© 2022 Twitter Clone & RS School</p>

    <div class="col-md-4 d-flex align-items-center justify-content-center my-2 link-dark text-decoration-none">
        <a href="#/" class="mx-2">
            <svg width="40" height="32" fill="black" class="bi bi-twitter" viewBox="0 0 16 16">
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
            </svg>
        </a>
        <b>&</b>
        <a href="https://rs.school/js/" class="mx-2">
            <img src="https://rs.school/images/rs_school_js.svg" alt="rs-school"  height="32px"/>
        </a>
    </div>

    <ul class="nav col-md-4 justify-content-end">
      <!--    добавьте свои гитхабы-->
      <li class="nav-item"><a href="https://github.com/firdavs-projects" class="nav-link px-2 text-muted">@firdavs-projects</a></li>
      <li class="nav-item"><a href="https://github.com/author" class="nav-link px-2 text-muted">@author</a></li>
      <li class="nav-item"><a href="https://github.com/author" class="nav-link px-2 text-muted">@author</a></li>
    </ul>
  </div>
</footer>
`;
}
