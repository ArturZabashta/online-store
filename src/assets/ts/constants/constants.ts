const API_URL = {
  MAIN_URL: `https://dummyjson.com`,
};

const API_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const API_STATUS = {
  REAL_SUCCESS: 200,
  SUCCESS: 201,  
  NOT_FOUND: 404,
  EXIST: 409,
  SERVER_ERROR: 500,
};

export { API_URL, API_METHODS, API_STATUS };