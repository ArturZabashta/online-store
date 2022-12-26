import { zeroProduct,  returnAllProducts } from "../utilities/utilities";
import { IProduct } from "../interfaces/api-interfaces";
import { ICart, ICartSettings } from "../interfaces/cart-interfaces";
import { returnCurtSum, changeCartProductCount } from "../utilities/cart-utilities";

export const CurtComponent = async () => {
  const allProducts = await returnAllProducts();
  const copyAllProducts:IProduct[] = allProducts? Array.from(allProducts.products) : zeroProduct;
  const cartList: Array<ICart> = JSON.parse(String(localStorage.getItem('cartList'))) || [];
  const cartSumCount = returnCurtSum();

  const main: HTMLElement | null = document.getElementById('app');
  (<HTMLElement>main).innerHTML  =  `
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
          <p class="summary__products">Total:  <span class="summary__products_summa">${cartSumCount[0]}</span> </p>
          <input class="summary__products_input btn" type="text" placeholder="Insert your promo code">
          <div class="summary__promocode"></div>
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
  const prevPageBtn = <HTMLElement>document.querySelector('.cart__pages_prev');
  const nextPageBtn = <HTMLElement>document.querySelector('.cart__pages_next');


  function renderPagination() {
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

    renderCartProducts(partOfCartList)
  }
  renderPagination();


  
  function renderCartProducts(cartList: Array<ICart>):void {
    if (cartItemsList) cartItemsList.innerHTML=''
    //const cartList: Array<ICart> = JSON.parse(String(localStorage.getItem('cartList'))) || [];
    console.log('cartList renderCartProducts()=', cartList)    
    cartList.map((item: ICart, index:number)=> {
      const product = document.createElement('div');
      product.classList.add('cart__item');
      product.innerHTML=`
      <p class="cart__item_position">${index+1}</p>
      <div class="cart__item_picture" style="background-image: url(${copyAllProducts[item.id-1].images[0]})" ></div>
      <div class="item__info">
        <h3 class="item__info_title">${copyAllProducts[item.id-1].title}</h3>
        <p class="item__info_description">${copyAllProducts[item.id-1].description}</p>
        <p class="item__properties"> 
          Rating:  
          <span class="item__properties_rating">${copyAllProducts[item.id-1].rating}    </span>  
          Discount:  
          <span class="item__properties_discount">${copyAllProducts[item.id-1].discountPercentage}</span>
          %
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
          renderPagination()
        }

        const updatedSumCount = returnCurtSum();
        if (summarySumma) summarySumma.innerHTML = `${updatedSumCount[0]}`
        if (summaryCount) summaryCount.innerHTML = `${updatedSumCount[1]}`        

      }
  }  
  renderPagination()

  
  
  itemsPerPageInput.addEventListener('input', setNewCartPage)
  // Set new count of  products per page
  function setNewCartPage(this: HTMLInputElement) {    
    const newPerPage = this.value;
        
    const newCartSettings: ICartSettings = JSON.parse(localStorage.cartSettings);
    localStorage.removeItem('cartSettings');    

    newCartSettings.perPage = Number(newPerPage);
    
    localStorage.setItem('cartSettings', JSON.stringify(newCartSettings));
    
    renderPagination();
  }

  prevPageBtn.addEventListener('click', setSaveCartPage)
  nextPageBtn.addEventListener('click', setSaveCartPage)
  // Switch prev/next page with products
  function setSaveCartPage(this: HTMLButtonElement) {    
    let step = 0;
    if (this.innerHTML == '&lt;') step = -1;
    if (this.innerHTML == '&gt;') step = 1;
        
    const newCartSettings: ICartSettings = JSON.parse(localStorage.cartSettings);
    localStorage.removeItem('cartSettings');    
    
    const perPage = newCartSettings.perPage;
    const oldPage = newCartSettings.currPage;
    let newPage = oldPage + step;
    
    if (newPage < 1 ) newPage = 1;
    if (newPage > Math.ceil(cartList.length/perPage)) newPage = Math.ceil(cartList.length/perPage);

    newCartSettings.currPage = newPage;
    
    localStorage.setItem('cartSettings', JSON.stringify(newCartSettings));
    
    renderPagination();
  }

  
  returnCurtSum();
  } 