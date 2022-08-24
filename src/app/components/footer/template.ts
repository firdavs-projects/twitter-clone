export default function footerTemplate(): string {
    return `
<!--    <footer>-->
<!--        <p class="team">-->
<!--            <a href="https://github.com/firdavs-projects">@firdavs-projects</a>-->
<!--            <a href="https://github.com/firdavs-projects">@firdavs-projects</a>-->
<!--            <a href="https://github.com/firdavs-projects">@firdavs-projects</a>-->
<!--        </p>-->
<!--        <p class="school">-->
<!--            <img src="https://rs.school/images/rs_school_js.svg" alt="rs-school"  width="100px"/>-->
<!--            <a href="https://rs.school/js/">RS School FE 2022</a>-->
<!--        </p>-->
<!--        <p class="copyright">-->
<!--            &copy; Copyright <span>2022</span> Mini Twitter Clone-->
<!--        </p>-->
<!--    </footer>-->

<!--<div class="container">-->
<footer class="border-top mt-4">
  <div class="container d-flex flex-wrap justify-content-between align-items-center py-3 mb-4 ">
    <p class="col-md-4 mb-0 text-muted">© 2022 Company, Inc</p>

    <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
    </a>

    <ul class="nav col-md-4 justify-content-end">
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Features</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Pricing</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
    </ul>
  </div>
</footer>
<!--</div>-->
`;
}
