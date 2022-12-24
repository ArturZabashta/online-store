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
                  <a href="#/curt"><img src="https://img.icons8.com/color/32/null/shopping-cart--v1.png" alt="curt"/></a>
              </div>
          </div>
      </header>

      <main class="main">
          <div id="app" class="wrapper">
          </div>
          <div class="modal">
            <div class="modal__wrapper">
                <form>
                <fieldset class="modal__personal-info">
                    <h3 class="modal__subtitle">Personal details</h3>
                    <div class="">
                        <input type="text" placeholder="Name...">
                        <span class="error">Error</span>
                    </div>
                    <div class="">
                        <input type="tel" placeholder="Phone number...">
                        <span class="error">Error</span>
                    </div>
                    <div class="">
                        <input type="text" placeholder="Dilivery adress...">
                        <span class="error">Error</span>
                    </div>
                    <div class="">
                        <input type="email" placeholder="E-mail...">
                        <span class="error">Error</span>
                    </div>
                </fieldset>
                <fieldset class="modal__card">
                    <h3 class="modal__subtitle">Credit card details</h3>
                    <div class="bank-card">
                        <div class="bank-card__side bank-card__side_front">
                        <div class="bank-card__inner">
                            <label class="bank-card__label bank-card__label_number">
                            <span class="bank-card__hint">Número de tarjeta</span>
                            <input type="text" class="bank-card__field" placeholder="Card number" pattern="[0-9]{16}" name="number-card" id="cn"
                                required>
                            </label>
                        </div>
                        <div class="bank-card__inner">
                            <span class="bank-card__caption">valid</span>
                        </div>
                        <div class="bank-card__inner bank-card__footer">
                            <label class="bank-card__label bank-card__month">
                            <span class="bank-card__hint">Month</span>
                            <input type="text" class="bank-card__field" placeholder="MM" maxlength="2" pattern="[0-9]{2}" name="mm-card" id="MM" required>
                            </label>
                            <span class="bank-card__separator">/</span>
                            <label class="bank-card__label bank-card__year">
                            <span class="bank-card__hint">Year</span>
                            <input type="text" class="bank-card__field" placeholder="YY" maxlength="2" pattern="[0-9]{2}" name="year-card" id="YY" required>
                            </label>
                        </div>
                        </div>
                        <div class="bank-card__side bank-card__side_back">
                        <div class="bank-card__inner">
                            <label class="bank-card__label bank-card__cvc">
                            <span class="bank-card__hint">CVV</span>
                            <input type="text" class="bank-card__field" placeholder="CVV" maxlength="3" pattern="[0-9]{3}" name="cvc-card" id="cvv" required>
                            </label>
                        </div>
                        </div>
                  </div>
                </fieldset>
                <fieldset>
                    <button class="card-btn btn" >CONFIRM</button>
                </fieldset>
            </form>
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