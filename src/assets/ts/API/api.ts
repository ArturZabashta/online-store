import { IProducts, IProduct, Categories } from '../interfaces/api-interfaces';
import { API_URL, API_METHODS, API_STATUS } from '../constants/constants';

class HTTPClient {
  
  async getAllProducts(): Promise<IProducts | undefined> {     
    try {             
      const request = await fetch(`${API_URL.MAIN_URL}/products?limit=10&skip=20`, {
        method: `${API_METHODS.GET}`});

      if (request.status === API_STATUS.REAL_SUCCESS) {        
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
        method: `${API_METHODS.GET}`});

      if (request.status === API_STATUS.REAL_SUCCESS) {        
        return await request.json();
      } else throw new Error (`status ${request.status}`)
     
    } catch (err) {      
      console.warn('Error checked: ', err);
    }
  }

  async getOneProduct(id: number): Promise<IProduct | undefined> {
    try {
      const request = await fetch(`${API_URL.MAIN_URL}/products/${id}`, {
        method: `${API_METHODS.GET}`});

      if (request.status === API_STATUS.REAL_SUCCESS) {        
        return await request.json();
      } else throw new Error (`status ${request.status}`)
     
    } catch (err) {
      console.warn('Error: ', err);
    }
  }
  

  async searchProducts(queryStr: string): Promise<IProducts | undefined> {
    try {
      const request = await fetch(`${API_URL.MAIN_URL}/products/search?q=${queryStr}`, {
        method: `${API_METHODS.GET}`});
        
      if (request.status === API_STATUS.REAL_SUCCESS) {        
        return await request.json();
      } else throw new Error (`status ${request.status}`)
     
    } catch (err) {
      console.warn('Error: ', err);
    }
  }

  async getAllProductsCategories(): Promise<Categories | undefined> {
    try {
      const request = await fetch(`${API_URL.MAIN_URL}/products/categories`, {
        method: `${API_METHODS.GET}`});

      if (request.status === API_STATUS.REAL_SUCCESS) {        
        return await request.json();
      } else throw new Error (`status ${request.status}`)

    } catch (err) {      
      console.warn('Error: ', err);
    }
  }

  async getProductsOfCategory(queryStr: string): Promise<IProducts | undefined> {
    try {
      const request = await fetch(`${API_URL.MAIN_URL}/products/category/${queryStr}`, {
        method: `${API_METHODS.GET}`});
        
      if (request.status === API_STATUS.REAL_SUCCESS) {        
        return await request.json();
      } else throw new Error (`status ${request.status}`)

    } catch (err) {
      console.warn('Error: ', err);
    }
  }
}
const httpClient = new HTTPClient();
export default httpClient;