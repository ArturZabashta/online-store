import { AllBrands, IProduct, AllCategories } from "../interfaces/api-interfaces";
import { zeroProduct,
   returnAllProducts, 
   returnAllBrands, 
   returnAllCategories, 
   getFilteredByBrand, 
   getFilteredByCategory, 
   getFilteredByRange, 
   getSortedProducts,
   getSearchByInput,
   getAllFilters } from "../utilities/utilities"
import {controlFromRange, controlToRange, updateSlider, getPriceAndStock } from "../rangeAction"

export let filteredArray: IProduct[] = zeroProduct;

export const HomeComponent = async():Promise<void> => {
  const allProducts = await returnAllProducts();
  const allCategories = await returnAllCategories(); 
  const allBrands = await returnAllBrands();
  const copyAllProducts:IProduct[] = allProducts? Array.from(allProducts.products) : zeroProduct;
    //console.log('allCategories', allCategories)
    //console.log('allBrands', allBrands)
  const main: HTMLElement | null = document.getElementById('app');
  (<HTMLElement>main).innerHTML  =`
    <div class="shop">
      <aside class="shop__filters">
        <div class="filter-head">
          <button class="reset-btn btn">Reset filters</button>
          <button class="copy-btn btn">Copy link</button>
        </div>
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
            <span id='fromPrice'>€10</span>
            <span id='toPrice'>€1749</span>
          </div>
        </div>
        <div class='filter-item'>
          <h3>Stock</h3>
          <div class="multi-range">
            <input id="minS" type="range" min="0" max="100" value="0"  step="0.0001">
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
            <button class="shop__view_short btn" >SHORT</button>
            <button class="shop__view_full btn" >FULL</button>
          </div>
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
  const searchInput = <HTMLInputElement>document.querySelector('.shop__head_search');
  const buttonShortView = <HTMLButtonElement>document.querySelector('.shop__view_short');
  const buttonFullView = <HTMLButtonElement>document.querySelector('.shop__view_full');
  const resetButton = <HTMLButtonElement>document.querySelector('.reset-btn');
  const copyButton = <HTMLButtonElement>document.querySelector('.copy-btn');

  // Render of products cards     
  function renderProductList(productsList: IProduct[]) {
    if (shopItems) shopItems.innerHTML = '';

    if (productsList && productsList.length > 0) {
      productsList.forEach((element: IProduct) => {
      const item = document.createElement('div');
      item.classList.add('item')
      item.id = `${element.id}`;
      // item.onclick = () => showItemdetails()
      // item.href ="";
      // item.style.backgroundImage = `url('${element.images[0]}`
      const backgroundImage = `url('${element.images[0]}')`
      item.innerHTML = `
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
      listenSizeItem()
      return
      });
    } else {
      const modalInfo = document.createElement('div');
      modalInfo.classList.add('undefined-item');
      modalInfo.innerHTML = 'Such products was not found. Try to change the search criteria...';
      shopItems?.append(modalInfo)
      }
    if (productsCount) productsCount.innerHTML = `${productsList.length}`;
   
  }
  

  function setQueryStringToURL(): string {
    const [brandsArray, categoriesArray, rangeArray, sortName, searchValue, sizeItem] = [...getAllFilters()]
      
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
    if (sortName && sortName.length > 0) queryArray.push('sort=' + sortName)
    if (searchValue && searchValue.length > 0) queryArray.push('search=' + searchValue)
    if (sizeItem) {
      queryArray.push('view=' + sizeItem)
      switch (sizeItem) {
        case 'full': {
          buttonFullView.classList.add('btn__activated');
          buttonShortView.classList.remove('btn__activated');
          break;
        }
        case 'short': {
          buttonShortView.classList.add('btn__activated')
          buttonFullView.classList.remove('btn__activated')
          break;
        }
      }
    }    
    //Form query string with parameters
    if (queryArray.length > 0 ) {      
      queryStr = '?' + queryArray.join('&');      
      //localStorage.setItem('queryStr', JSON.stringify(queryStr))          
    }         
    //Add query parameters to URL  
    const refresh = window.location.protocol + "//" + window.location.host + '#' +window.location.pathname + queryStr;    
    window.history.pushState({ path: refresh }, '', refresh);
    return queryStr;
  }

  async function getFilteredProductsList(){
    const [brandsArray, categoriesArray, rangeArray, sortName, searchValue, sizeItem] = [...getAllFilters()]
    // Make copy of all products data to do a filtration
    filteredArray = [...copyAllProducts]
    //Apply filters to array with all products
    if (sortName.length > 0) {
      filteredArray = getSortedProducts(filteredArray, sortName)
      setSelectValue(sortName);
    }
    if (brandsArray.length > 0) filteredArray = getFilteredByBrand(filteredArray, brandsArray)
    if (categoriesArray.length > 0) filteredArray = getFilteredByCategory(filteredArray, categoriesArray)
    if (rangeArray.length > 0) filteredArray = getFilteredByRange(filteredArray, rangeArray)
    if (searchValue.length > 0) {
      filteredArray = getSearchByInput(filteredArray, searchValue)
      setSearchValue(searchValue);
    }
    setQueryStringToURL();
    renderProductList(filteredArray);
    itemClickHandler()
    
  }
  getFilteredProductsList();



  function getCategoryCount(category: string): number{
    const filtered = filteredArray;
    const result = filtered.filter(item => (item.category).toLowerCase() === category);
    return result.length
  }

  function getBrandCount(brand: string): number{
    const filtered = filteredArray;
    const result = filtered.filter(item => (item.brand).toLowerCase() === brand);
    return result.length
  }


  // Render of products categories
  async function renderCategoryList() {    
    if (categoryList) categoryList.innerHTML = '';
    for (const category in allCategories) {
      const count: number = getCategoryCount(category);
      const label = document.createElement('label');    
      label.setAttribute('for', `${category}`);
      label.innerHTML = `    
      <input value="${category}" id="${category}" type="checkbox">
      ${category}
      <span>(<span class="category__count_current" id="span-${category}">${count}</span>/${allCategories[category]})</span>        
      `;
      categoryList?.append(label)
    }
  }
  renderCategoryList()


 // Render of products Brands 
  async function renderBrandList() { 
    console.log('filteredArray', filteredArray) 
    if (brandsList) brandsList.innerHTML = '';
    for (const brand in allBrands) {    
      const count: number = getBrandCount(brand);  
      const label = document.createElement('label');    
      label.setAttribute('for', `${brand}`);
      label.innerHTML = `    
      <input value="${brand}" id="${brand}" type="checkbox">
      ${brand}
      <span>(<span class="brand__count_current" id="span-${brand}">${count}</span>/${allBrands[brand]})</span>                   
      `;
      brandsList?.append(label)
    }
  }
  renderBrandList()

  //range input handler
  const minPriceValue = <HTMLElement>document.querySelector('#fromPrice'); //span
  const maxPriceValue = <HTMLElement>document.querySelector('#toPrice');   //span
  const minRangePrice = <HTMLInputElement>document.querySelector('#minP');    //input-range
  const maxRangePrice = <HTMLInputElement>document.querySelector('#maxP');    //input-range

  const minStockValue = <HTMLElement>document.querySelector('#fromStock');  //span
  const maxStockValue = <HTMLElement>document.querySelector('#toStock');    //span
  const minRangeStock = <HTMLInputElement>document.querySelector('#minS');    //input-range
  const maxRangeStock = <HTMLInputElement>document.querySelector('#maxS');    //input-range

  minRangePrice.oninput = () => controlToRange(minPriceValue, maxPriceValue, minRangePrice, maxRangePrice, 'updatePrice');
  maxRangePrice.oninput = () => controlFromRange(minPriceValue, maxPriceValue, minRangePrice,maxRangePrice, 'updatePrice');
  minRangeStock.oninput = () => controlToRange(minStockValue,maxStockValue,minRangeStock, maxRangeStock, 'updateStock');
  maxRangeStock.oninput = () => controlFromRange(minStockValue,maxStockValue,minRangeStock, maxRangeStock, 'updateStock');
  
  
  function updateRangesAfterFiltration() {
    const allPrice: number[] = [];
    const allStock: number[] = [];

    if (filteredArray.length > 2) {
      filteredArray.forEach((item: IProduct) => {
      allPrice.push(item.price)
      allStock.push(item.stock)
      })
    } else if (filteredArray.length == 1) {
      allPrice.push(filteredArray[0].price);
      allPrice.push(filteredArray[0].price);
      allStock.push(filteredArray[0].stock);
      allStock.push(filteredArray[0].stock);
      } else {
        allPrice.push(0);
        allPrice.push(0);
        allStock.push(0);
        allStock.push(0);        
        }
    const sortAllPrice: number[] | undefined = allPrice.sort((a,b) => a-b)
    const minPrice = <number>sortAllPrice.shift() 
    const maxPrice = <number>sortAllPrice.pop()
    const sortAllStock: number[] | undefined = allStock.sort((a,b) => a-b)
    const minStock = <number>sortAllStock.shift() 
    const maxStock = <number>sortAllStock.pop()

    //console.log('min and max from filteredArray',minRangePrice, maxRangePrice,minRangeStock, maxRangeStock)
    console.log('min and max from updateRanges',minPrice, maxPrice, minStock, maxStock)      

    minPriceValue.innerHTML = `€${Math.floor(minPrice)}`; //span
    maxPriceValue.innerHTML = `€${Math.floor(maxPrice)}`;   //span
    // minRangePrice.value = `${Math.floor(minPrice)}`;    //input-range
    // maxRangePrice.value = `${Math.floor(maxPrice)}`;    //input-range

    minStockValue.innerHTML = `${minStock}`;  //span
    maxStockValue.innerHTML = `${maxStock}`;    //span
    // minRangeStock.value = `${minStock}`;    //input-range
    // maxRangeStock.value = `${maxStock}`;    //input-range

    updateRange();
  }
  function resetRangesAfterFiltration() {
    localStorage.removeItem('rangeArray');
    const allPrice: number[] = [];
    const allStock: number[] = [];
    copyAllProducts.forEach((item: IProduct) => {
      allPrice.push(item.price)
      allStock.push(item.stock)
    })
    const sortAllPrice: number[] | undefined = allPrice.sort((a,b) => a-b)
    const minPrice = <number>sortAllPrice.shift() 
    const maxPrice = <number>sortAllPrice.pop()
    const sortAllStock: number[] | undefined = allStock.sort((a,b) => a-b)
    const minStock = <number>sortAllStock.shift() 
    const maxStock = <number>sortAllStock.pop()

    console.log('min and max from resetRanges',minPrice, maxPrice, minStock, maxStock)

    minPriceValue.innerHTML = `€${Math.floor(minPrice)}`; //span
    maxPriceValue.innerHTML = `€${Math.floor(maxPrice)}`;   //span
    // minRangePrice.value = `${Math.floor(minPrice)}`;    //input-range
    // maxRangePrice.value = `${Math.floor(maxPrice)}`;    //input-range

    minStockValue.innerHTML = `${minStock}`;  //span
    maxStockValue.innerHTML = `${maxStock}`;    //span
    // minRangeStock.value = `${minStock}`;    //input-range
    // maxRangeStock.value = `${maxStock}`;    //input-range
    updateRange();
  }

  //listens for changes in the range and writes to the local store
  const ranges: NodeListOf<HTMLElement> = document.querySelectorAll('.multi-range');
  if(ranges) Array.from(ranges).forEach(element => element.onchange = ():void => updateRange())
  const updateRange = ():void =>{
    const rangeArray: Array<string> = []
    rangeArray.push(minPriceValue.innerHTML,maxPriceValue.innerHTML,minStockValue.innerHTML,maxStockValue.innerHTML)
    localStorage.setItem('rangeArray', JSON.stringify(rangeArray))
    console.log('rangeArray from updateRange()',rangeArray)
    getFilteredProductsList().then(()=> {
      updateBrandCountSpan()
      updateCategoryCountSpan()
      
    })
    checkLocalRangeArray('rangeArray');
  }

  const checkLocalRangeArray = (arrName:string):void =>{
    const localArr: Array<string> = JSON.parse(String(localStorage.getItem(arrName)));
    // console.log(localArr);
    if(localArr){
      [minPriceValue.innerHTML,maxPriceValue.innerHTML,minStockValue.innerHTML,maxStockValue.innerHTML] = [...localArr];
      updateSlider(minPriceValue.innerHTML, maxPriceValue.innerHTML, minRangePrice, maxRangePrice)
      updateSlider(minStockValue.innerHTML, maxStockValue.innerHTML, minRangeStock, maxRangeStock)
    }
  }
  checkLocalRangeArray('rangeArray');


  


  // checkbox click handler
  const categories: HTMLInputElement | null = document.querySelector('.select__category');
  const categoriesInput: NodeListOf<HTMLInputElement> = document.querySelectorAll('.select__category input');
  const brands: HTMLInputElement | null = document.querySelector('.select__brand');
  const brandsInput: NodeListOf<HTMLInputElement> = document.querySelectorAll('.select__brand input');
  const brandSpanList: NodeListOf<HTMLElement> = document.querySelectorAll('.brand__count_current');
  const categorySpanList: NodeListOf<HTMLElement> = document.querySelectorAll('.category__count_current');

  
  function updateBrandCountSpan():void {
    Array.from(brandSpanList).map(el => {      
      const count: number = getBrandCount(el.id.slice(5));      
      count? el.innerHTML = `${count}`: el.innerHTML = '0';
    })
  }


  function updateCategoryCountSpan():void {
    Array.from(categorySpanList).map(el => {      
      const count: number = getCategoryCount(el.id.slice(5));      
      count? el.innerHTML = `${count}`: el.innerHTML = '0';
    })
  }


 //listens for changes in the categories and writes to the local store
  const updateCategories = ():void =>{
    const categoriesArray: Array<string> = []
    Array.from(categoriesInput).map(el => {if(el.checked) categoriesArray.push(el.id) })
    localStorage.setItem('categoriesArray', JSON.stringify(categoriesArray))
    // console.log('categoriesArray',categoriesArray)
    getFilteredProductsList().then(()=> {
      updateBrandCountSpan()
      updateCategoryCountSpan()
      resetRangesAfterFiltration()
      updateRangesAfterFiltration()
      
    })
  }
  if(categories) categories.onclick = () => updateCategories()


  //listens for changes in the brands and writes to the local store
  const updateBrands = ():void =>{
    const brandsArray: Array<string> = []
    Array.from(brandsInput).map(el => {if(el.checked) brandsArray.push(el.id)})
    localStorage.setItem('brandsArray', JSON.stringify(brandsArray))
    // console.log('brandsArray',brandsArray)
    getFilteredProductsList().then(()=> {
      updateBrandCountSpan()
      updateCategoryCountSpan()
      resetRangesAfterFiltration()
      updateRangesAfterFiltration()
    })
  }  
  if(brands) brands.onclick = () => updateBrands()

  //
  const checkLocalCheckboxArr = (arrName:string):void =>{
    const localArr: Array<string> | null =JSON.parse(localStorage.getItem(arrName) as string);
    //console.log(localArr)
    if (localArr) localArr.map(el => {
        const element: HTMLElement | null = document.getElementById(`${el}`)
        if(element) element.setAttribute('checked', 'checked');
    })
  }
  checkLocalCheckboxArr('categoriesArray');
  checkLocalCheckboxArr('brandsArray');


  //lisener size items
  function listenSizeItem(){
    const size:string | null = localStorage.getItem('sizeItem');
    const itemShort: HTMLElement | null = document.querySelector('.shop__view_short');
    const itemFull: HTMLElement | null = document.querySelector('.shop__view_full');
    const itemsArray: NodeListOf<HTMLElement> = document.querySelectorAll('.item');

    if(size && size==='short')showShortItem(itemsArray);
    if(size && size==='full')showFullItem(itemsArray);
    if(itemFull)itemFull.onclick = () => showFullItem(itemsArray);
    if(itemShort)itemShort.onclick = () => showShortItem(itemsArray);
  }
  listenSizeItem()

  function showFullItem(itemsArray : NodeListOf<HTMLElement>){
    localStorage.setItem('sizeItem', 'full');
    setQueryStringToURL();
    [...itemsArray].map((item:HTMLElement) =>{
      item.classList.remove('item-short');
      (<HTMLElement>item.querySelector('.item__settings')).classList.remove('settings-short');
      (<HTMLElement>item.querySelector('.item__buttons')).classList.remove('buttons-short');
      (<HTMLElement>item.querySelector('.item__price')).classList.remove('price-short');
      (<HTMLElement>item.querySelector('.item__title')).classList.remove('title-short');
      (<HTMLElement>item.querySelector('.item__image')).classList.remove('image-short');
    })
  }

  function showShortItem(itemsArray:NodeListOf<HTMLElement>){
    localStorage.setItem('sizeItem', 'short');
    setQueryStringToURL();
    [...itemsArray].map((item:HTMLElement) =>{
      item.classList.add('item-short');
      (<HTMLElement>item.querySelector('.item__settings')).classList.add('settings-short');
      (<HTMLElement>item.querySelector('.item__buttons')).classList.add('buttons-short');
      (<HTMLElement>item.querySelector('.item__price')).classList.add('price-short');
      (<HTMLElement>item.querySelector('.item__title')).classList.add('title-short');
      (<HTMLElement>item.querySelector('.item__image')).classList.add('image-short');
    })
  }

  sortSelected.addEventListener('change', ()=> {
    const sortValue = sortSelected.value    
    localStorage.setItem('sortName', JSON.stringify(sortValue))    
    getFilteredProductsList()
  })

  function setSelectValue(value: string) {
    sortSelected.value = value;
  }
  
  searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value   
    if (searchValue !== "") localStorage.setItem('searchValue', JSON.stringify(searchValue))
    else localStorage.removeItem('searchValue');
    getFilteredProductsList().then(()=> {
      updateBrandCountSpan();
      updateCategoryCountSpan();
      (searchValue !== "")? updateRangesAfterFiltration(): resetRangesAfterFiltration();
    })
  })

  
  function setSearchValue(value: string) {
    searchInput.value = value;
  }

  const setCheckboxUnchecked = (arrName: AllCategories | AllBrands):void =>{   
    for (const checkbox in arrName) {    
      const label = <HTMLInputElement>document.getElementById(`${checkbox}`);    
      if (label) label.checked = false;
    }    
  }


  if (resetButton) {
    resetButton.addEventListener('click', () => {
      localStorage.clear();

      getFilteredProductsList().then(()=> {
        updateBrandCountSpan()
        updateCategoryCountSpan()
        if (allCategories) setCheckboxUnchecked(allCategories);
        if (allBrands) setCheckboxUnchecked(allBrands);
      })    
    });
  }


  if (copyButton) {
    copyButton.addEventListener('click', ()=> {
      copyButton.innerHTML = 'Copying';
      copyButton.classList.add('__copying');
      const queryStr = setQueryStringToURL();
      localStorage.setItem('queryStr', JSON.stringify(queryStr))
      console.log('save queryStr', queryStr);
      setTimeout(()=>{
        copyButton.innerHTML = 'Copy Lynk'
        copyButton.classList.remove('__copying');
      },1200)
    });

  }


  function itemClickHandler(){
    const itemList: NodeListOf<HTMLElement> = document.querySelectorAll(".item");
  
    itemList.forEach(el => {
      const btnDetails: HTMLElement = el.querySelector(".item__details") as HTMLElement;
      btnDetails.addEventListener("click", function(e){
        const element = e.target as HTMLElement;
        const current = element.parentNode?.parentNode as HTMLElement;
        localStorage.setItem('currentId',current.id )
        location.href=`#/product-details`;
      })
  
    })
  }
  itemClickHandler()

}

