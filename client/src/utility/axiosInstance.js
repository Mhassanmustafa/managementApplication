import axios from "axios";

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
  "x-auth-token"
);
let axiosInstance = axios;
export default axiosInstance;
