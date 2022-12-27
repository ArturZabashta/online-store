import { IPromo } from "../interfaces/cart-interfaces";

const API_URL = {
  MAIN_URL: `https://dummyjson.com`,
};

enum ApiMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

enum ApiStatus {
  REAL_SUCCESS = 200,
  SUCCESS = 201,  
  NOT_FOUND = 404,
  EXIST = 409,
  SERVER_ERROR = 500,
}

const PROMO_LIST: IPromo = {
  'rss': ['The RS School code', 10],
  'js': ['JavaScript code', 5],
  'ts': ['TypeScript code', 15],
}

export { API_URL, ApiMethods, ApiStatus, PROMO_LIST };
