import httpClient from "../API/api";
import { IProduct } from "../interfaces/api-interfaces";

export const HomeComponent = async():Promise<void> => {
  const allProducts = await httpClient.getLimitPartProducts(100,0);
  const allCategories = await httpClient.getAllProductsCategories();  
  const main: HTMLElement | null = document.getElementById('app');
  (<HTMLElement>main).innerHTML  =`
    <div class="shop">
      <aside class="shop__filters">
        <div class='filter-item'>
          <h3>Category</h3>
          <div class="select select__category">            
          </div>
        </div>
        <div class='filter-item'>
          <h3>Brand</h3>
          <div class="select select__brand">
            <label for="checkbox-1">
              <input value="1" id="checkbox-1" type="checkbox">
              Checkbox #1
            </label>
            <label for="checkbox-1">
              <input value="1" id="checkbox-1" type="checkbox">
              Checkbox #1
            </label>
            <label for="checkbox-1">
              <input value="1" id="checkbox-1" type="checkbox">
              Checkbox #1
            </label>
          </div>
        </div>
        <div class='filter-item'>
          <h3>Price</h3>
          <div class="multi-range">
            <input id="min" type="range" min="0" max="100" value="0" step="0.0001">
            <input id="max" type="range" min="0" max="100" value="100" step="0.0001">
          </div>
          <div class='price'>
            <span id='from'>€10.00</span>
            <span id='to'>€1749.00</span>
          </div>
        </div>
        <div class='filter-item'>
        <h3>Stock</h3>
        <div class="multi-range">
          <input id="min" type="range" min="0" max="100" value="0" step="0.0001">
          <input id="max" type="range" min="0" max="100" value="100" step="0.0001">
        </div>
        <div class='price'>
          <span id='from'>2</span>
          <span id='to'>150</span>
        </div>
      </div>
      </aside>
      <section class="shop__items">
              
      </section>
    </div>
  `;
  
  // Render of products categories
  console.log('allCategories', allCategories)
  const categoryList: HTMLElement | null = document.querySelector('.select__category');
  if (categoryList) categoryList.innerHTML = '';

  if (allCategories) {
    allCategories.forEach((element: string) => {
    const label = document.createElement('label');    
    label.setAttribute('for', `link${element}`);
    label.innerHTML = `    
    <input value="${element}" id="${element}" type="checkbox">
    ${element}        
    `;
    categoryList?.append(label)
    return 
    });}
  
           
  // Render of products cards     
  const shopItems: HTMLElement | null = document.querySelector('.shop__items');
  if (shopItems) shopItems.innerHTML = '';

  if (allProducts) allProducts.products.forEach((element: IProduct) => {
    const item = document.createElement('div');
    item.classList.add('item')
    item.style.backgroundImage = `url('${element.images[0]}`
    item.innerHTML = `
      <h3 class="item__title">${element.title}</h3>
      <div class="item__settings">
        <p class="item__settings_category">Category: <span class="item__settings_span">${element.category}</span></p>
        <p class="item__settings_brand">Brand; <span class="item__settings_span">${element.brand}</span></p>
        <p class="item__settings_price">Price: <span class="item__settings_span">${element.price}€</span></p>
        <p class="item__settings_discount">Discount: <span class="item__settings_span">${element.discountPercentage}%</span></p>
        <p class="item__settings_rating">Rating: <span class="item__settings_span">${element.rating}</span></p>
        <p class="item__settings_stock">Stock: <span class="item__settings_span">${element.stock}</span></p>
      </div>
      <button class="item__title">Add to Cart</button>
      <button class="item__details">Details</button>        
    `;
    shopItems?.append(item)
    return
  });

  
      
  } 