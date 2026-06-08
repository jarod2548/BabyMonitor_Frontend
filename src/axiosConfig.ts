import axios from "axios";

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {

      console.log("401 detected");

      localStorage.clear();

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axios;