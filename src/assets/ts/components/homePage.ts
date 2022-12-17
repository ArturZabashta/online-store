import httpClient from "../API/api";
import { IProduct } from "../interfaces/api-interfaces";
import { returnAllBrands, returnAllCategories } from "../utilities/utilities"
import { controlToRange } from "../rangeAction"
import { controlFromRange } from "../rangeAction"

export const HomeComponent = async():Promise<void> => {
  const allProducts = await httpClient.getLimitPartProducts(100,0);
  const allCategories = await returnAllCategories(); 
  const allBrands = await returnAllBrands();  
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
          </div>
        </div>
        <div class='filter-item'>
          <h3>Price</h3>
          <div class="multi-range">
            <input id="minP" type="range" min="0" max="100" value="0" step="0.0001">
            <input id="maxP" type="range" min="0" max="100" value="100" step="0.0001">
          </div>
          <div class='price'>
            <span id='fromPrice'>€10.00</span>
            <span id='toPrice'>€1749.00</span>
          </div>
        </div>
        <div class='filter-item'>
        <h3>Stock</h3>
        <div class="multi-range">
          <input id="minS" type="range" min="0" max="100" value="0" step="0.0001">
          <input id="maxS" type="range" min="0" max="100" value="100" step="0.0001">
        </div>
        <div class='stock'>
          <span id='fromStock'>2</span>
          <span id='toStock'>150</span>
        </div>
      </div>
      </aside>
      <section class="shop__items">              
      </section>
    </div>
  `;
  
  // Render of products categories
   const categoryList: HTMLElement | null = document.querySelector('.select__category');
  if (categoryList) categoryList.innerHTML = '';

  for (const category in allCategories) {    
    const label = document.createElement('label');    
    label.setAttribute('for', `link${category}`);
    label.innerHTML = `    
    <input value="${category}" id="${category}" type="checkbox">
    ${category}        
    `;
    categoryList?.append(label)
  }
  /*
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
    });
  }
  */

 // Render of products Brands
  const brandsList: HTMLElement | null = document.querySelector('.select__brand');
  if (brandsList) brandsList.innerHTML = '';

  for (const brand in allBrands) {    
    const label = document.createElement('label');    
    label.setAttribute('for', `link${brand}`);
    label.innerHTML = `    
    <input value="${brand}" id="${brand}" type="checkbox">
    ${brand}        
    `;
    brandsList?.append(label)
  }
           
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


  //
  const minPriceValue = <HTMLElement>document.querySelector('#fromPrice');
  const maxPriceValue = <HTMLElement>document.querySelector('#toPrice');
  const minRangePrice = <HTMLInputElement>document.querySelector('#minP');
  const maxRangePrice = <HTMLInputElement>document.querySelector('#maxP');

  const minStockValue = <HTMLElement>document.querySelector('#fromStock');
  const maxStockValue = <HTMLElement>document.querySelector('#toStock');
  const minRangeStock = <HTMLInputElement>document.querySelector('#minS');
  const maxRangeStock = <HTMLInputElement>document.querySelector('#maxS');

  minRangePrice.oninput = () => controlToRange(minPriceValue, maxPriceValue, minRangePrice, maxRangePrice, 'updatePrice');
  maxRangePrice.oninput = () => controlFromRange(minPriceValue, maxPriceValue, minRangePrice,maxRangePrice, 'updatePrice');
  minRangeStock.oninput = () => controlToRange(minStockValue,maxStockValue,minRangeStock, maxRangeStock, 'updateStock');
  maxRangeStock.oninput = () => controlFromRange(minStockValue,maxStockValue,minRangeStock, maxRangeStock, 'updateStock');

  // checkbox click handler
  
  const categories: HTMLInputElement | null = document.querySelector('.select__category');
  const categoriesInput: NodeListOf<HTMLInputElement> = document.querySelectorAll('.select__category input');
  const brands: HTMLInputElement | null = document.querySelector('.select__brand');
  const brandsInput: NodeListOf<HTMLInputElement> = document.querySelectorAll('.select__brand input');


  const updateCategories = ():void =>{
    const categoriesArray: Array<string> = []
    Array.from(categoriesInput).map(el => {if(el.checked) categoriesArray.push(el.id) })
    console.log(categoriesArray)
  }

  if(categories) categories.onclick = () => updateCategories()

  const updateBrands = ():void =>{
    const brandsArray: Array<string> = []
    Array.from(brandsInput).map(el => {if(el.checked) brandsArray.push(el.id) })
    console.log(brandsArray)
  }
  
  if(brands) brands.onclick = () => updateBrands()

} 