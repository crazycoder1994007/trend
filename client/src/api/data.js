// API requests to get data from the server

const axios = require("axios");

const api = {
  getData: (endpoint) => {
    const url = `http://localhost:3001/api/${endpoint}`; // Get port from environment variables
    return axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return { success: false, error: error };
      });
  },
};

export default api;
