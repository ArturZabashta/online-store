import { zeroProduct,  returnAllProducts } from "../utilities/utilities";
import { IProduct } from "../interfaces/api-interfaces";
import { ICart } from "../interfaces/cart-interfaces";
import { returnCurtSum } from "../utilities/utilities";

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
            <input class="cart__pagination_onpage btn" id="onpage" type="text" value="0">
            <div class="cart__pages">Page:
              <button class="cart__pages_prev btn">Prev</button>
              <p class="cart__pages_current"></p>
              <button class="cart__pages_prev btn">Next</button>
            </div>
          </div>
        </article>
        <article class="cart__list"></article>    
      </section>

      <aside class="cart__summary">
        <h2 class="summary__head"> Summary </h2>
        <article class="summary__description">
          <p class="summary__products">Products:  <span class="summary__products_count">${cartSumCount[0]}</span> </p>
          <p class="summary__products">Total:  <span class="summary__products_summa">${cartSumCount[1]}</span> </p>
          <input class="summary__products_input btn" type="text" placeholder="Insert your promo code">
          <div class="summary__promocode"></div>
          <button class="summary__buy btn">Buy now</button>
        </article>
      </aside>
    </div>
  `;

  const cartItemsList: HTMLElement | null = document.querySelector('.cart__list');
  const itemsPerPage: HTMLElement | null = document.querySelector('.cart__pageitems_count');



  
  function renderCartProducts():void {    
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
        <p class="item__stock">Stock: <span class="item__stock_count">${copyAllProducts[item.id-1].stock}</span></p>
        <div class="item__management">
          <button class="item__management_less btn">-</button>
          <span class="item__management_count">${item.count}</span>
          <button class="item__management_more btn">+</button>
        </div>
      </div>

      `;

      cartItemsList?.append(product)
    });
  }
  renderCartProducts()

  
  returnCurtSum()
  } 