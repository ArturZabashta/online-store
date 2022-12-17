import { IProducts, IProduct, AllBrands, AllCategories } from "../interfaces/api-interfaces";
import httpClient from "../API/api"
import { ListSeparator } from "../../../../node_modules/sass/types/index";

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
  //console.log(allProducts)
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
  const filteredProductList: IProduct[] = productList.filter((product) => {
    return filterArray.indexOf((product.brand).toLowerCase()) !== -1
  })  
  return filteredProductList;
}

export function getFilteredByCategory(productList: IProduct[], filterArray: Array<string>) {
  const filteredProductList: IProduct[] = productList.filter((product) => {
    return filterArray.indexOf((product.category).toLowerCase()) !== -1
  })  
  return filteredProductList;
}
