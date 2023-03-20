import axios from "axios";
import { store } from "../store/storeMain";

const apiService = axios.create({
  baseURL: "https://dev.pgitdev.pl/admin",
});

apiService.interceptors.request.use(async (config) => {
  if (store.getState().auth.token) {
    config.headers["Authorization"] = `Bearer ${store.getState().auth.token}`;
  }

  return config;
});

export default apiService;
