import { IProduct } from "../interfaces/api-interfaces";
import { zeroProduct,
   returnAllProducts, 
   returnAllBrands, 
   returnAllCategories, 
   getFilteredByBrand, 
   getFilteredByCategory, 
   getFilteredByRange, 
   getSortedProducts } from "../utilities/utilities"
import {controlFromRange, controlToRange, updateSlider } from "../rangeAction"

export const HomeComponent = async():Promise<void> => {
  const allProducts = await returnAllProducts();
  const allCategories = await returnAllCategories(); 
  const allBrands = await returnAllBrands();
  const copyAllProducts:IProduct[] = allProducts? Array.from(allProducts.products) : zeroProduct;
    
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
      <section class="shop__wrapper">
        <article class="shop__head">
          <select class="shop__head_sorter">
            <option class="shop__head_option" value="start" disabled selected>Sort products:</option>
            <option class="shop__head_option" value="priceUp">Price Up</option>
            <option class="shop__head_option" value="priceDown">Price Down</option>
            <option class="shop__head_option" value="ratingUp">Rating Up</option>
            <option class="shop__head_option" value="ratingDown">Rating Down</option>
          </select>
          <div class="shop__head_found">Found: <span class="shop__head_count">100</span></div>
          <input class="shop__head_search" type="text" placeholder="Search product">
          <div class="shop__view">
            <button class="shop__view_short">SHORT</button>
            <button class="shop__view_full">FULL</button>
          </button>
        </article>
        <article class="shop__list"></article>
      </section>
    </div>
  `;
  const categoryList: HTMLElement | null = document.querySelector('.select__category');
  const brandsList: HTMLElement | null = document.querySelector('.select__brand');
  const shopItems: HTMLElement | null = document.querySelector('.shop__list');
  const productsCount: HTMLElement | null = document.querySelector('.shop__head_count');
  const sortSelected = <HTMLSelectElement>document.querySelector('.shop__head_sorter');
  const optionsList: NodeListOf<HTMLElement> = document.querySelectorAll('.shop__head_option')

  // Render of products categories
  async function renderCategoryList() {    
    if (categoryList) categoryList.innerHTML = '';

    for (const category in allCategories) {    
      const label = document.createElement('label');    
      label.setAttribute('for', `${category}`);
      label.innerHTML = `    
      <input value="${category}" id="${category}" type="checkbox">
      ${category}        
      `;
      categoryList?.append(label)
    }
  }
  renderCategoryList()

 // Render of products Brands
 async function renderBrandList() {    
    if (brandsList) brandsList.innerHTML = '';

    for (const brand in allBrands) {    
      const label = document.createElement('label');    
      label.setAttribute('for', `${brand}`);
      label.innerHTML = `    
      <input value="${brand}" id="${brand}" type="checkbox">
      ${brand}        
      `;
      brandsList?.append(label)
    }
  }
  renderBrandList()
           
  // Render of products cards     
  async function renderProductList(productsList: IProduct[]) {
    if (shopItems) shopItems.innerHTML = '';

    if (productsList) productsList.forEach((element: IProduct) => {
      const item = document.createElement('div');
      item.classList.add('item')
      item.id = `${element.id}`;
      // item.style.backgroundImage = `url('${element.images[0]}`
       const backgroundImage = `url('${element.images[0]}')`
      item.innerHTML = `
        <span class="item__close" name="${element.id}">?</span>
        <h3 class="item__title">${element.title}</h3>
        <div class="item__image" style="background-image:${backgroundImage}"></div>
        <div class="item__settings">
          <p class="item__settings_category">Category: <span class="item__settings_span">${element.category}</span></p>
          <p class="item__settings_brand">Brand; <span class="item__settings_span">${element.brand}</span></p>
          <p class="item__settings_price">Price: <span class="item__settings_span">${element.price}€</span></p>
          <p class="item__settings_discount">Discount: <span class="item__settings_span">${element.discountPercentage}%</span></p>
          <p class="item__settings_rating">Rating: <span class="item__settings_span">${element.rating}</span></p>
          <p class="item__settings_stock">Stock: <span class="item__settings_span">${element.stock}</span></p>
        </div>
        <p class="item__price">Price : <span>${element.price}€</span></p>
        <div class="item__buttons">
          <button class="item__addcurt btn">Add to Cart</button>
          <button class="item__details btn">Details</button>  
        </div>      
      `;
      shopItems?.append(item)      
      return
    });
    if (productsCount) productsCount.innerHTML = `${productsList.length}`;
  }
  

  function setQueryStringToURL(brandsArray: string[], categoriesArray:string[], rangeArray:string[], sortName:string){
    const queryArray: string[] = [];
    let queryStr = '';
    let brandsStr = '';
    let categoriesStr = '';
    let rangesStr  = '';

    if (localStorage.getItem('queryStr')) queryStr = JSON.parse(String(localStorage.getItem('queryStr')));
    
    if (brandsArray && brandsArray.length > 0) {
      brandsStr = 'brand=' + brandsArray.join('↕');
      queryArray.push(brandsStr);
    }
    if (categoriesArray && categoriesArray.length > 0) {
      categoriesStr = 'category=' + categoriesArray.join('↕');
      queryArray.push(categoriesStr);
    }
    if (rangeArray && rangeArray.length > 0) {
      rangesStr = `price=${rangeArray[0].substr(1)}↕${rangeArray[1].substr(1)}&stock=${rangeArray[2]}↕${rangeArray[3]}`
      queryArray.push(rangesStr);
    }
    console.log('sortName from render = ', sortName)
    if (queryArray.length > 0 ) {
      
      (sortName.length > 2) ? queryStr = '?' + queryArray.join('&') + `&sort=${sortName}`: queryStr = '?' + queryArray.join('&');
      localStorage.setItem('queryStr', JSON.stringify(queryStr))
      console.log('queryStr!!!', queryStr)
    }
    //Add query parameters to URL  
    const refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStr;    
    window.history.pushState({ path: refresh }, '', refresh);

    //console.log('window.location.protocol=', window.location.protocol)
    //console.log('window.location.host=', window.location.host)
    //console.log('window.location.pathname=', window.location.pathname)
    //console.log('window.location.hash=', window.location.href)
        
  }

  function getFilteredProductsList(){
    let brandsArray: Array<string> = []
    let categoriesArray: Array<string> = []
    let rangeArray: Array<string> = []
    let sortName = '';   

    if (localStorage.getItem('brandsArray') && String(localStorage.getItem('brandsArray')).length > 2) {
      brandsArray = JSON.parse(String(localStorage.getItem('brandsArray')));
    }
    if (localStorage.getItem('categoriesArray') && String(localStorage.getItem('categoriesArray')).length > 2) {
      categoriesArray = JSON.parse(String(localStorage.getItem('categoriesArray')));
    }
    if (localStorage.getItem('rangeArray') && String(localStorage.getItem('rangeArray')).length > 2) {
      rangeArray = JSON.parse(String(localStorage.getItem('rangeArray')))
    }
    if (localStorage.getItem('sortName') && String(localStorage.getItem('rangeArray')).length > 1) {
      sortName = JSON.parse(String(localStorage.getItem('sortName')))
      setSelectValue(sortName)
    }

    // Make copy of all products data to do a filtration
    let filteredArray = [...copyAllProducts]

    if (sortName.length > 0) filteredArray = getSortedProducts(filteredArray, sortName)
    if (brandsArray.length > 0) filteredArray = getFilteredByBrand(filteredArray, brandsArray)
    if (categoriesArray.length > 0) filteredArray = getFilteredByCategory(filteredArray, categoriesArray)
    if (rangeArray.length > 0) filteredArray = getFilteredByRange(filteredArray, rangeArray)
    
    
    setQueryStringToURL(brandsArray, categoriesArray, rangeArray, sortName)
    renderProductList(filteredArray)
  }
  getFilteredProductsList()

  //range input handler
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

  //listens for changes in the range and writes to the local store
  const ranges: NodeListOf<HTMLElement> = document.querySelectorAll('.multi-range');
  if(ranges) Array.from(ranges).forEach(element => element.onchange = ():void => updateRange())
  const updateRange = ():void =>{
    const rangeArray: Array<string> = []
    rangeArray.push(minPriceValue.innerHTML,maxPriceValue.innerHTML,minStockValue.innerHTML,maxStockValue.innerHTML)
    localStorage.setItem('rangeArray', JSON.stringify(rangeArray))
    console.log('rangeArray',rangeArray)
    getFilteredProductsList()
  }

  const checkLocalrangeArray = (arrName:string):void =>{
    const localArr: Array<string>  =JSON.parse(localStorage.getItem(arrName) as string);
    console.log(localArr);
    if(localArr){
      [minPriceValue.innerHTML,maxPriceValue.innerHTML,minStockValue.innerHTML,maxStockValue.innerHTML] = [...localArr];
      updateSlider(minPriceValue.innerHTML, maxPriceValue.innerHTML, minRangePrice, maxRangePrice)
      updateSlider(minStockValue.innerHTML, maxStockValue.innerHTML, minRangeStock, maxRangeStock)
    }
  }

  checkLocalrangeArray('rangeArray');

  // checkbox click handler
  const categories: HTMLInputElement | null = document.querySelector('.select__category');
  const categoriesInput: NodeListOf<HTMLInputElement> = document.querySelectorAll('.select__category input');
  const brands: HTMLInputElement | null = document.querySelector('.select__brand');
  const brandsInput: NodeListOf<HTMLInputElement> = document.querySelectorAll('.select__brand input');

 //listens for changes in the categories and writes to the local store
  const updateCategories = ():void =>{
    const categoriesArray: Array<string> = []
    Array.from(categoriesInput).map(el => {if(el.checked) categoriesArray.push(el.id) })
    localStorage.setItem('categoriesArray', JSON.stringify(categoriesArray))
    console.log('categoriesArray',categoriesArray)
    getFilteredProductsList()
  }
  if(categories) categories.onclick = () => updateCategories()

 //listens for changes in the brands and writes to the local store
  const updateBrands = ():void =>{
    const brandsArray: Array<string> = []
    Array.from(brandsInput).map(el => {if(el.checked) brandsArray.push(el.id) })
    localStorage.setItem('brandsArray', JSON.stringify(brandsArray))
    console.log('brandsArray',brandsArray)
    getFilteredProductsList()
  }
  if(brands) brands.onclick = () => updateBrands()

  //
  const checkLocalCheckboxArr = (arrName:string):void =>{
    const localArr: Array<string> | null =JSON.parse(localStorage.getItem(arrName) as string);
    console.log(localArr)
    if (localArr) localArr.map(el => {
        const element: HTMLElement | null = document.getElementById(`${el}`)
        if(element) element.setAttribute('checked', 'checked');
    })
  }

  checkLocalCheckboxArr('categoriesArray');
  checkLocalCheckboxArr('brandsArray');

  //show settings in items
  const closeButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.item__close');
  
  if(closeButtons) Array.from(closeButtons).forEach(element => element.onclick = (e:Event):void => showSettings(e))
  const showSettings = (e:Event):void =>{
    const element: Element | null = e.target as Element;
    const parent = document.getElementById(element.getAttribute('name') as string)
    const settings: HTMLElement | null = (parent as HTMLElement).querySelector('.item__settings');
    if(settings) settings.classList.toggle("active-settings");
  }

  sortSelected.addEventListener('change', ()=> {
    const sortValue = sortSelected.value    
    localStorage.setItem('sortName', JSON.stringify(sortValue))    
    getFilteredProductsList()
  })

  function setSelectValue(value: string) {
    sortSelected.value = value;
  }
  
}
