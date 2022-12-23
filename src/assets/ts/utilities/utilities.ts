import { IProducts, IProduct, AllBrands, AllCategories } from "../interfaces/api-interfaces";
import httpClient from "../API/api"
import { filteredArray } from "../components/homePage";
import { ICart } from "../interfaces/cart-interfaces";
import { totalCount, totalSum } from "../add-base-html";

export const zeroProduct: Array<IProduct> = [
  {
    "id": 0,
    "title": "",
    "description": "",
    "price": 0,
    "discountPercentage": 0,
    "rating": 0,
    "stock": 0,
    "brand": "",
    "category": "",
    "thumbnail": "...",
    "images": ["...", "...", "..."]
  },
]

export async function returnAllProducts(): Promise<IProducts | undefined> {
  const allProducts = await httpClient.getLimitPartProducts(100,0);
  return allProducts;
}

export async function returnAllCategories(): Promise<AllCategories | undefined> {
  const allCategories: AllCategories = {};
  const allProducts = await httpClient.getLimitPartProducts(100,0);
  allProducts?.products.forEach((item: IProduct) => {
    if (!allCategories[item.category.toLowerCase()]) allCategories[item.category.toLowerCase()] = 1
    else allCategories[item.category.toLowerCase()]++
    return
  })  
  return allCategories;
}

export async function returnAllBrands(): Promise<AllBrands | undefined> {
  const allBrands: AllBrands = {};
  const allProducts = await httpClient.getLimitPartProducts(100,0);
  allProducts?.products.forEach((item: IProduct) => {
    if (!allBrands[item.brand.toLowerCase()] ) allBrands[item.brand.toLowerCase()] = 1
    else allBrands[item.brand.toLowerCase()]++
    return
  })  
  return allBrands;
}

export async function returnMinMaxPrice(): Promise< number[] > {
  const allPrice: number[] = [];
  const allProducts = await httpClient.getLimitPartProducts(100,0)
  allProducts?.products.forEach((item: IProduct) => {
    allPrice.push(item.price)
  })
  const sortAllPrice: number[] | undefined = allPrice.sort((a,b) => a-b)
  const minPrice = <number>sortAllPrice.shift() 
  const maxPrice = <number>sortAllPrice.pop()
  return [minPrice,maxPrice]
}

export async function returnMinMaxStock(): Promise< number[] > {
  const allStock: number[] = [];
  const allProducts = await httpClient.getLimitPartProducts(100,0)
  allProducts?.products.forEach((item: IProduct) => {
    allStock.push(item.stock)
  })
  const sortAllStock: number[] | undefined = allStock.sort((a,b) => a-b)
  const minStock = <number>sortAllStock.shift() 
  const maxstock = <number>sortAllStock.pop()
  return [minStock,maxstock]
}


export function getFilteredByBrand(productList: IProduct[], filterArray: Array<string>) {
  //console.warn('filter = Brand')
  const filteredProductList: IProduct[] = productList.filter((product) => {
    return filterArray.indexOf((product.brand).toLowerCase()) !== -1
  })  
  return filteredProductList;
}

export function getFilteredByCategory(productList: IProduct[], filterArray: Array<string>) {
  //console.warn('filter = Category')
  const filteredProductList: IProduct[] = productList.filter((product) => {
    return filterArray.indexOf((product.category).toLowerCase()) !== -1
  })  
  return filteredProductList;
}

export function getFilteredByRange(productList: IProduct[], filterArray: Array<string>) {
  //console.warn('filter = Range')
  const [minPrice, maxPrice, minStock, maxStock] = filterArray;  
  const filteredProductList: IProduct[] = productList
  .filter((product) => (product.price >= Number(minPrice.substr(1)) && product.price <= Number(maxPrice.substr(1))))
  .filter((product) => (product.stock >= Number(minStock) && product.stock <= Number(maxStock)))  
  return filteredProductList;
}

export function getSortedProducts(productList: IProduct[], filterMethod: string) {
  const sortedProductList: IProduct[] = [...productList];
  switch (filterMethod) {
    case 'priceUp': {
      return sortedProductList.sort((a:IProduct, b:IProduct)=> a.price-b.price)
    }
    case 'priceDown': {
      return sortedProductList.sort((a:IProduct, b:IProduct)=> b.price-a.price)
    }
    case 'ratingUp': {
      return sortedProductList.sort((a:IProduct, b:IProduct)=> a.rating-b.rating)
    }
    case 'ratingDown': {
      return sortedProductList.sort((a:IProduct, b:IProduct)=> b.rating-a.rating)
    }  
    default: return sortedProductList
  }  
}

export function getSearchByInput(productList: IProduct[], searchValue: string) {
  const search = searchValue.toLowerCase();
  return productList.filter((product)=> (product.title.toLowerCase().indexOf(search) !== -1
  || product.description.toLowerCase().indexOf(search) !== -1
  || String(product.price).indexOf(search) !== -1
  || String(product.rating).indexOf(search) !== -1
  || String(product.stock).indexOf(search) !== -1
  || String(product.discountPercentage).indexOf(search) !== -1
  || product.brand.toLowerCase().indexOf(search) !== -1
  || product.category.toLowerCase().indexOf(search) !== -1
  ));
}

export function getAllFilters() {  
  let brandsArray: Array<string> = []
  let categoriesArray: Array<string> = []
  let rangeArray: Array<string> = []
  let sortName = '';
  let searchValue = '';
  let sizeItem = '';   

  if (localStorage.getItem('brandsArray') && String(localStorage.getItem('brandsArray')).length > 2) {
    brandsArray = JSON.parse(String(localStorage.getItem('brandsArray')));
  }
  if (localStorage.getItem('categoriesArray') && String(localStorage.getItem('categoriesArray')).length > 2) {
    categoriesArray = JSON.parse(String(localStorage.getItem('categoriesArray')));
  }
  if (localStorage.getItem('rangeArray') && String(localStorage.getItem('rangeArray')).length > 2) {
    rangeArray = JSON.parse(String(localStorage.getItem('rangeArray')))
  }
  if (localStorage.getItem('sortName') && String(localStorage.getItem('sortName')).length > 1) {
    sortName = JSON.parse(String(localStorage.getItem('sortName')))    
  }
  if (localStorage.getItem('searchValue') && String(localStorage.getItem('searchValue')).length > 0) {
    searchValue = JSON.parse(String(localStorage.getItem('searchValue')))    
  }
  if (localStorage.getItem('sizeItem')) {
    sizeItem = String(localStorage.getItem('sizeItem'))
  }

  const allFiltersArray: [Array<string>, Array<string>, Array<string>, string, string, string] = [
    brandsArray, categoriesArray, rangeArray, sortName, searchValue, sizeItem
  ]
   
  return allFiltersArray;
}

export async function returnOneProduct():  Promise<IProduct | undefined> {
  const currentItem: number = Number(localStorage.getItem('currentId')) as number;
  const productDetails = await httpClient.getOneProduct(currentItem);
  return productDetails;
}

export function returnCurtSum(): void {
  const cartList: Array<ICart> = JSON.parse(String(localStorage.getItem('cartList')));
  let summa = 0;
  let count = 0;
  if (cartList && cartList.length > 0) {
    cartList.forEach(element => {
      summa += element.price;
      count += element.count;
    });
  }
  console.log('returnCurtSum()')         
  if (totalSum) totalSum.innerHTML = `${summa}`;
  if (totalCount) totalCount.innerHTML = `${count}`;
  
}