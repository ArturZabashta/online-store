import { IProducts, IProduct, AllBrands, AllCategories } from "../interfaces/api-interfaces";
import httpClient from "../API/api"

async function returnAllProducts(): Promise<IProducts | undefined> {
  const allProducts = await httpClient.getLimitPartProducts(100,0);
  return allProducts;
}

export async function returnAllCategories(): Promise<AllCategories | undefined> {
  const allCategories: AllCategories = {};
  const allProducts = await httpClient.getLimitPartProducts(100,0);
  allProducts?.products.forEach((item: IProduct) => {
    if (!allCategories[item.category.toLowerCase()] ) allCategories[item.category.toLowerCase()] = 1
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



