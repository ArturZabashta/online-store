import { zeroProduct,  returnAllProducts } from "../utilities/utilities";
import { IProduct } from "../interfaces/api-interfaces";
import { ICart, ICartSettings } from "../interfaces/cart-interfaces";
import { returnCurtSum, changeCartProductCount, returnDiscountSumma } from "../utilities/cart-utilities";
import { PROMO_LIST } from "../constants/constants";

export const CurtComponent = async () => {
  const allProducts = await returnAllProducts();
  const copyAllProducts:IProduct[] = allProducts? Array.from(allProducts.products) : zeroProduct;
  const cartList: Array<ICart> = JSON.parse(String(localStorage.getItem('cartList'))) || [];
  const cartSumCount = returnCurtSum();

  const main = <HTMLElement>document.getElementById('app');
  main.innerHTML  =  `
    <div class="cart">
      <section class="cart__products">
        <article class="cart__head">
          <h2 class="cart__head_title"> Products In Cart </h2>
          <div class="cart__pagination">
            <p class="cart__pagination_title">Items:</p>
            <input class="cart__pagination_per-page btn" id="onpage" type="number">
            <div class="cart__pages">Page:
              <button class="cart__pages_prev btn"><</button>
              <p class="cart__pages_current"></p>
              <button class="cart__pages_next btn">></button>
            </div>
          </div>
        </article>
        <article class="cart__list"></article>    
      </section>

      <aside class="cart__summary">
        <h2 class="summary__head"> Summary </h2>
        <article class="summary__description">
          <p class="summary__products">Products:  <span class="summary__products_count">${cartSumCount[1]}</span> </p>
          <p class="summary__products">Total: <span class="summary__products_summa">€${cartSumCount[0]}</span> </p>
          <p class="summary__products_discount">Total: €<span class="summary__products_discount">${cartSumCount[0]}</span> </p>
          <input class="summary__products_input btn" type="text" placeholder="Insert your promo code">
          <div class="summary__promo">
            <p class="summary__promo_example">Promo for test: 'RSS', 'JS', 'TS'</p>
            <div class="summary__promo_find">
              <span class="summary__promo_text"></span>
              <span class="summary__promo_value"></span>
              %
              <button class="summary__promo_add btn">ADD</button>
            </div>
            <div class="summary__applied">
              <h3 class="summary__applied_title">Applied promo codes</h3>
              <div class="summary__applied_list"></div>
            </div>            
          </div>
          <button class="summary__buy btn">Buy now</button>
        </article>
      </aside>
    </div>
  `;

  const cartItemsList: HTMLElement | null = document.querySelector('.cart__list');
  const itemsPerPageInput = <HTMLInputElement>document.querySelector('.cart__pagination_per-page');
  const currPageSpan =  <HTMLElement>document.querySelector('.cart__pages_current');
  const summaryCount: HTMLElement | null = document.querySelector('.summary__products_count');
  const summarySumma: HTMLElement | null = document.querySelector('.summary__products_summa');
  const prevPageBtn = <HTMLButtonElement>document.querySelector('.cart__pages_prev');
  const nextPageBtn = <HTMLButtonElement>document.querySelector('.cart__pages_next');

  const promoInput = <HTMLInputElement>document.querySelector('.summary__products_input');
  const promoFindDiv = <HTMLElement>document.querySelector('.summary__promo_find');
  const promoNameSpan = <HTMLElement>document.querySelector('.summary__promo_text');
  const promoValueSpan = <HTMLElement>document.querySelector('.summary__promo_value');
  const promoAddBtn = <HTMLButtonElement>document.querySelector('.summary__promo_add');

  const promoAppliedWrapper = <HTMLElement>document.querySelector('.summary__applied');
  const promoAppliedDiv = <HTMLElement>document.querySelector('.summary__applied_list');
  
  const discountPrice = <HTMLElement>document.querySelector('.summary__products_discount');

  
  async function renderPagination() {
    if (!localStorage.getItem('cartSettings')) {
      const startSettings: ICartSettings = {
        perPage: 3,
        currPage: 1,
        promo: []
      }
      localStorage.setItem('cartSettings', JSON.stringify(startSettings))
    }
    
    const cartSettings: ICartSettings = JSON.parse(String(localStorage.getItem('cartSettings')));
    itemsPerPageInput.value = `${cartSettings.perPage}`;
    currPageSpan.innerHTML = `${cartSettings.currPage}`;    

    const cartList: Array<ICart> = JSON.parse(String(localStorage.getItem('cartList'))) || [];
    const startElement = cartSettings.perPage*(cartSettings.currPage-1);
    const partOfCartList = cartList.splice(startElement, cartSettings.perPage)

    renderCartProducts(partOfCartList, startElement);

    // Set query parameters to URL
    
    const refresh = window.location.protocol + "//" + window.location.host + `#/cart`+ `?page=${cartSettings.currPage}&&limit=${cartSettings.perPage} `  ;  
    window.history.pushState({ path: refresh }, '', refresh);
  }
  renderPagination();

  prevPageBtn.addEventListener('click', setSaveCartPage)
  nextPageBtn.addEventListener('click', setSaveCartPage)
  // Switch prev/next page with products
  function setSaveCartPage(this: HTMLButtonElement) {    
    let step = 0;
    if (this.innerHTML == '&lt;') step = -1;
    if (this.innerHTML == '&gt;') step = 1;

    const cartList: Array<ICart> = JSON.parse(String(localStorage.getItem('cartList'))) || [];    
    const newCartSettings: ICartSettings = JSON.parse(localStorage.cartSettings);
    //localStorage.removeItem('cartSettings');    
    
    const perPage = newCartSettings.perPage;
    const oldPage = newCartSettings.currPage;
    let newPage = oldPage + step;
    // console.log('newPage BEFORE', newPage);
    // console.log(' (cartList.length/perPage)',  (cartList.length/perPage));
    // console.log(' Math.ceil(cartList.length/perPage)',  Math.ceil(cartList.length/perPage));
    if (newPage <= 1 ) newPage = 1;
    if (newPage > 1 && newPage < Math.ceil(cartList.length/perPage)) {      
      newPage = oldPage + step;
    }
    if (newPage == Math.ceil(cartList.length/perPage)) {      
      newPage = Math.ceil(cartList.length/perPage);
    }
    if (newPage > Math.ceil(cartList.length/perPage)) {      
      newPage = oldPage;
    } 

    newCartSettings.currPage = newPage;    
    localStorage.setItem('cartSettings', JSON.stringify(newCartSettings));    
    renderPagination();    
  }


  
  function renderCartProducts(cartList: Array<ICart>, startIndex: number):void {
    if (cartItemsList) cartItemsList.innerHTML=''
       
    cartList.map((item: ICart, index:number)=> {
      const product = document.createElement('div');
      product.classList.add('cart__item');
      product.innerHTML=`
      <p class="cart__item_position">${index+1+startIndex}</p>
      <div class="cart__item_picture" style="background-image: url(${copyAllProducts[item.id-1].images[0]})" ></div>
      <div class="item__info">
        <h3 class="item__info_title">${copyAllProducts[item.id-1].title}</h3>
        <p class="item__info_description">${copyAllProducts[item.id-1].description}</p>
        <p class="item__properties"> 
         <span>Rating: <span class="item__properties_rating">${copyAllProducts[item.id-1].rating}</span></span>  
         <span>Discount: <span class="item__properties_discount">${copyAllProducts[item.id-1].discountPercentage}</span>%</span>
        </p>
      </div>
      <div class="item__manager">
        <p class="item__stock">Stock: <span class="item__stock_count" id="item__stock_count-${item.id}">${copyAllProducts[item.id-1].stock}</span></p>
        <div class="item__management">
          <button class="item__management_less btn" id="item__management_less-${item.id}">-</button>
          <span class="item__management_count" id="item__management_count-${item.id}">${item.count}</span>
          <button class="item__management_more btn" id="item__management_more-${item.id}">+</button>
        </div>
        <p class="item__summa">€<span class="item__summa_count" id="item__summa_count-${item.id}">${item.count * item.price}</span></p>
      </div>

      `;
      cartItemsList?.append(product);
    });

      const addItemBtnList: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.item__management_more');
      const removeItemBtnList: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.item__management_less');

      [...addItemBtnList].map((btn: HTMLButtonElement) => {
        btn.addEventListener('click', setCartProductCount)
      });
      [...removeItemBtnList].map((btn: HTMLButtonElement) => {
        btn.addEventListener('click', setCartProductCount)
      });
      
      function setCartProductCount(this: HTMLButtonElement) {
        const id = Number(this.id.slice(22));
        const currentCountSpan = <HTMLElement>document.getElementById(`item__management_count-${id}`);
        const currentSummaSpan = <HTMLElement>document.getElementById(`item__summa_count-${id}`);
        const currentStock = Number(document.getElementById(`item__stock_count-${id}`)?.innerHTML);       
        const currentPrice = copyAllProducts[id-1].price;
        let step = 1;
        if (this.innerHTML == '+') step = 1;
        if (this.innerHTML == '-') step = -1;
        
        const isDelete = changeCartProductCount(id, currentPrice, step, currentStock, currentCountSpan, currentSummaSpan);
        
        if (isDelete) {
          
          renderPagination();
          const cartList: Array<ICart> = JSON.parse(String(localStorage.getItem('cartList'))) || [];
          const newCartSettings: ICartSettings = JSON.parse(localStorage.cartSettings);
          const perPage = newCartSettings.perPage;

          // Move to prev page if current page is empty
          if (cartList.length/perPage + 1 == newCartSettings.currPage) {           
          const bindSetSaveCartPage = setSaveCartPage.bind(prevPageBtn);
          bindSetSaveCartPage()
          }
          
          // Render empty cart
          if (cartList.length == 0) CurtComponent();
        }

        const updatedSumCount = returnCurtSum();
        if (summarySumma) summarySumma.innerHTML = `€${updatedSumCount[0]}`;
        if (summaryCount) summaryCount.innerHTML = `${updatedSumCount[1]}`;        
        //getPromoCodesFromLS();
        //renderDiscountSumma(returnDiscountSumma());
      }
  }  
  renderPagination()
  
  
  itemsPerPageInput.addEventListener('input', setNewPertPageCount)
  // Set new count of  products per page
  function setNewPertPageCount(this: HTMLInputElement) {    
    const newPerPage = this.value;
    if (Number(newPerPage) <= 0 ) return;
    const newCartSettings: ICartSettings = JSON.parse(localStorage.cartSettings);
    localStorage.removeItem('cartSettings');
    newCartSettings.perPage = Number(newPerPage);    
    localStorage.setItem('cartSettings', JSON.stringify(newCartSettings));
    
    renderPagination();
  }

  


  // Promo code logics

  promoInput.addEventListener('input', setPromoSearch);
  function setPromoSearch(this: HTMLInputElement) {    
    const cartSettings: ICartSettings = JSON.parse(localStorage.cartSettings);
    const testCode = this.value;    
    let isVisible = false;

    for (const key in PROMO_LIST) {
      if (key == testCode.toLowerCase() && cartSettings.promo.indexOf(key) == -1) {
        isVisible = true;             
        promoNameSpan.innerHTML = `${PROMO_LIST[key][0]}`;
        promoNameSpan.id = `${key}`;
        promoValueSpan.innerHTML = `${PROMO_LIST[key][1]}`;
      }
    }
    if (isVisible)  {
      promoFindDiv.style.visibility = 'visible';
      promoFindDiv.style.opacity = '1';
      promoAddBtn.disabled = false;

    } else {
      promoFindDiv.style.visibility = 'hidden';
      promoFindDiv.style.opacity = '0';
      promoAddBtn.disabled = true;
    }
  }  

  promoAddBtn.addEventListener('click', ()=> {    
    const promoItem = document.createElement('div');    
    promoItem.classList.add('discount__item');
    promoItem.id = `discount-${promoNameSpan.id}`
    promoItem.innerHTML =`
      <span>      
        <span class="discount__item_text">${promoNameSpan.innerHTML}</span>
        <span class="discount__item_value">${promoValueSpan.innerHTML}%</span>        
      </span>
      <button class="discount__item_drop btn">Drop</button>
    `
    promoAppliedDiv.append(promoItem);
    //Add info about promo code in LS
    const newCartSettings: ICartSettings = JSON.parse(localStorage.cartSettings);
    localStorage.removeItem('cartSettings');
    newCartSettings.promo.push(promoNameSpan.id);
    localStorage.setItem('cartSettings', JSON.stringify(newCartSettings));
    promoFindDiv.style.visibility = 'hidden';
    promoFindDiv.style.opacity = '0';
    promoAddBtn.disabled = true;
    discountPrice.classList.add('_is-discount');
    if (summarySumma) summarySumma.style.textDecoration = 'line-through';

    promoInput.value = '';
    promoInput.placeholder = 'Promo code applied';
    setTimeout(()=>{
      promoInput.placeholder = 'Insert your promo code';
    },1100);
    getPromoCodesFromLS();
  })

  
  function getPromoCodesFromLS() {
    if (JSON.parse(localStorage.cartSettings).promo.length > 0){
      promoAppliedDiv.innerHTML='';
      const promoArray: Array<string> = JSON.parse(localStorage.cartSettings).promo;
      
      promoArray.map(element => {
        const promoItem = document.createElement('div');    
        promoItem.classList.add('discount__item');
        promoItem.id = `discount-${element}`
        promoItem.innerHTML =`
          <span>
            <span class="discount__item_text">${PROMO_LIST[element][0]}</span>
            <span class="discount__item_value">${PROMO_LIST[element][1]}%</span>            
          </span>
          <button class="discount__item_drop btn" id="drop-${element}">Drop</button>
        `
        promoAppliedDiv.append(promoItem);
      })
      promoAppliedWrapper.style.display = 'block';

      // Handler of promo code drop buttons
      const dropPromoFromApplied = function (this: HTMLButtonElement) {        
        
        const newCartSettings: ICartSettings = JSON.parse(localStorage.cartSettings);
        localStorage.removeItem('cartSettings');
        const id = this.id.slice(5);
        newCartSettings.promo = newCartSettings.promo.filter(item => item !== id)
        localStorage.setItem('cartSettings', JSON.stringify(newCartSettings));
        // Switch reRender of Summary block
        getPromoCodesFromLS()
      }

      const promoRemoveBtnList: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.discount__item_drop');
      [...promoRemoveBtnList].map((btn: HTMLButtonElement) => {
        btn.addEventListener('click', dropPromoFromApplied)
      });
      discountPrice.classList.add('_is-discount');
      if (summarySumma) summarySumma.style.textDecoration = 'line-through';
      renderDiscountSumma(returnDiscountSumma());
      
    } else {
      promoAppliedWrapper.style.display = 'none';
      discountPrice.classList.remove('_is-discount');
      if (summarySumma) summarySumma.style.textDecoration = 'none';
      renderDiscountSumma(returnDiscountSumma());
    }
  }
  getPromoCodesFromLS()


  function renderDiscountSumma(sum: number) {
    const cartSumCount = returnCurtSum();
    const discountSumma = cartSumCount[0]*(100-sum)/100;
    discountPrice.innerHTML = `Total: €${discountSumma}`;    
  }

  returnCurtSum();

  //add handler for curt button "Buy now"
  const curtBtn: HTMLInputElement | null = document.querySelector('.summary__buy');
  if(curtBtn)curtBtn.onclick = function(){
      const modal: HTMLElement = document.querySelector('.modal') as HTMLElement;
      modal.style.display = "flex";
  }
  

  renderDiscountSumma(returnDiscountSumma());

  if (cartList.length == 0 ) {
    main.innerHTML = `<div class="cart__empty"> There is no products in the cart </div>`;
    const refresh = window.location.protocol + "//" + window.location.host + `#/cart`;  
    window.history.pushState({ path: refresh }, '', refresh);
  }
}