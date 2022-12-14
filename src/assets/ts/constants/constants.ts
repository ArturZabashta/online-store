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

export { API_URL, ApiMethods, ApiStatus };