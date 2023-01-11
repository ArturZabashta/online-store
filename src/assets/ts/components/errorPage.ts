export const ErrorComponent = () => {
  const main: HTMLElement | null = document.getElementById('app');
  (<HTMLElement>main).innerHTML  = `
        <section class ="error__page" style>
          <h1 class="error__page_title">404</h1>
          <p class="error__page_text">Page not found</p>
          <button class="error__page_btn btn">
            <a class="error__page_link" href="#/shop">Back to home</a>
          </button>
        </section>
      `;    
}

