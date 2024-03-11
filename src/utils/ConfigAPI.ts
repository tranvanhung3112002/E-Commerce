import axios from "axios";
const request = axios.create({
  baseURL: "https://85sjtr-8080.csb.app/",
});

request.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default request;
