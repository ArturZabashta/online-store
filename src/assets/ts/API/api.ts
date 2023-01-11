import { IProducts, IProduct, Categories } from '../interfaces/api-interfaces';
import { API_URL, ApiMethods, ApiStatus } from '../constants/constants';


class HTTPClient {
  
  async getAllProducts(): Promise<IProducts | undefined> {     
    try {             
      const request = await fetch(`${API_URL.MAIN_URL}/products?limit=10&skip=20`, {
        method: `${ApiMethods.GET}`});

      if (request.status === ApiStatus.REAL_SUCCESS) {        
        return await request.json();
      } else throw new Error (`status ${request.status}`)
     
    } catch (err) {      
      console.warn('Error checked: ', err);
    }
  }

  async getLimitPartProducts(limit: number, skip: number): Promise<IProducts | undefined> {     
    //limit - number products per page, skip - from which product to output 
    try {             
      const request = await fetch(`${API_URL.MAIN_URL}/products?limit=${limit}&skip=${skip}`, {
        method: `${ApiMethods.GET}`});

      if (request.status === ApiStatus.REAL_SUCCESS) {        
        return await request.json();
      } else throw new Error (`status ${request.status}`)
     
    } catch (err) {      
      console.warn('Error checked: ', err);
    }
  }
  
  async getOneProduct(id: number): Promise<IProduct | undefined> {
    try {
      const request = await fetch(`${API_URL.MAIN_URL}/products/${id}`, {
        method: `${ApiMethods.GET}`});

      if (request.status === ApiStatus.REAL_SUCCESS) {        
        return await request.json();
      } else throw new Error (`status ${request.status}`)
     
    } catch (err) {
      console.warn('Error: ', err);
    }
  }
  

  async searchProducts(queryStr: string): Promise<IProducts | undefined> {
    try {
      const request = await fetch(`${API_URL.MAIN_URL}/products/search?${queryStr}`, {
        method: `${ApiMethods.GET}`});
        console.warn('URL: ', `${API_URL.MAIN_URL}/products/search?${queryStr}`);  
      if (request.status === ApiStatus.REAL_SUCCESS) {        
        return await request.json();
      } else throw new Error (`status ${request.status}`)
     
    } catch (err) {
      console.warn('Error: ', err);
    }
  }

  async getAllProductsCategories(): Promise<Categories | undefined> {
    try {
      const request = await fetch(`${API_URL.MAIN_URL}/products/categories`, {
        method: `${ApiMethods.GET}`});

      if (request.status === ApiStatus.REAL_SUCCESS) {        
        return await request.json();
      } else throw new Error (`status ${request.status}`)

    } catch (err) {      
      console.warn('Error: ', err);
    }
  }

  async getProductsOfCategory(queryStr: string): Promise<IProducts | undefined> {
    try {
      const request = await fetch(`${API_URL.MAIN_URL}/products/category/${queryStr}`, {
        method: `${ApiMethods.GET}`});
        
      if (request.status === ApiStatus.REAL_SUCCESS) {        
        return await request.json();
      } else throw new Error (`status ${request.status}`)

    } catch (err) {
      console.warn('Error: ', err);
    }
  }
}
const httpClient = new HTTPClient();
export default httpClient;