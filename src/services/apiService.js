import axios from "axios";
import { store } from "../store/storeMain";

let accToken = store.getState().auth.token;
let refToken = store.getState().auth.refreshToken;

async function refreshToken() {
  try{
    const response = await (apiService.post('/auth/v2/user/refresh'), {
      refresh_oken: refToken
    })
    console.log(response)
    accToken = response.data.access_token;
    refToken = response.data.refresh_token
  }
  catch (error){
    console.error(error);
    throw error
  }
}

const apiService = axios.create({
  baseURL: "https://dev.pgitdev.pl/",
});

apiService.interceptors.request.use(async (config) => {
  if (store.getState().auth.token) {
    config.headers["Authorization"] = `Bearer ${store.getState().auth.token}`;
    }

  return config;
});

export default apiService;

apiService.interceptors.request.use(async (config) => {
  const token = store.getState().auth.token
    if(token){
      config.headers["x-access-token"] = token;
    }
    return config;  
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use((response) => {
  return response;
  },
  async (error) => {
    const originalRequest = error.config; 
    if(error.response) {
      if( error.response.status == 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return refreshToken().then(() => {
          originalRequest.headers.Authorization = `Bearer ${accToken}`;
          return apiService(originalRequest);
        });
        
        return Promise.reject(error);
      }
    };
  }
)
