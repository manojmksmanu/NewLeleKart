import axios from "axios";

// export const baseURL = "https://newlelekartbackend-production.up.railway.app";
export const baseURL = "http://192.168.31.240:3000";

export const api = axios.create({
  baseURL,
});
