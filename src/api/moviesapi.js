import axios from "axios";
import queryString from "query-string";
import apiConfig from "./apiconfig";

const axiosClient = axios.create({
  baseURL: apiConfig.baseURL,
  headers: {
    "Content-type": "application/json",
  },
  paramsSerializer: (params) =>
    queryString.stringify({ ...params, apiKey: apiConfig.api_key }),
  params: {
    api_key: apiConfig.api_key,
  },
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (err) => {
    throw err;
  }
);

export default axiosClient;
