import './route.ts'

const baseHtml=  `
  <div id="root" class="root">
      <header class="header">
          <div class="wrapper header__wrapper">
              <div class="header__logo">
                  <a href="#/"><img class="logo" src="./assets/logo2.svg" alt="logo"></a>
                  <!-- <h1>ONLINE STORE</h1> -->
              </div>
              <div class="header__total-curt">
                  <p class="total-curt">Total: <span class="total-sum">0</span></p>
              </div>
              <div class="header__curt">                  
                  <a href="#/curt">
                    <span class="total-count"></span>
                    <img class="cart-logo" src="https://img.icons8.com/color/32/null/shopping-cart--v1.png" alt="curt"/>
                  </a>
              </div>
          </div>
      </header>

      <main class="main">
          <div id="app" class="wrapper">
          </div>
      </main>

      <footer class="footer">
          <div class="wrapper footer__wrapper">
              <p class="footer__text githab-pages">
                  <a class='footer__link active' href="https://github.com/sinevit"><i class='fab fa-github'><span>Sinevit</span></i></a>
                  <a class='footer__link active' href="https://github.com/ArturZabashta"><i class='fab fa-github'><span >ArturZabashta</span></i></a></p>
              <p class="footer__text">2022</p>
              <p class="footer__text rs-link"><a href="https://rs.school/js/"><img class="footer__logo" src="./assets/rslogo.svg"
              alt="rs-school"></a></p>
          </div>
      </footer>

  </div>          
`;
const myFragment = document.createRange().createContextualFragment(baseHtml);

document.body.appendChild(myFragment);

export const totalSum = document.querySelector('.total-sum');
export const totalCount = document.querySelector('.total-count')
