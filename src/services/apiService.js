import axios from "axios";
import { refreshToken } from "../store/authReducer";
import { dispatch, store } from "../store/storeMain";

async function refreshInnerToken() {
  try {
    const response = await apiService.post("/auth/v2/user/refresh", {
      refresh_token: store.getState().auth.refreshToken,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const apiService = axios.create({
  baseURL: "https://dev.pgitdev.pl/",
});

apiService.interceptors.request.use(async (config) => {
  if (store.getState().auth.token && !config.headers.Authorization) {
    config.headers["Authorization"] = `Bearer ${store.getState().auth.token}`;
  }

  return config;
});

export default apiService;

apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response) {
      if (error.response.status == 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return refreshInnerToken()
          .then(async (res) => {
            await dispatch(
              refreshToken({
                token: res.access_token,
                refreshToken: res.refresh_token,
              })
            );
            originalRequest.headers.Authorization = `Bearer ${res.access_token}`;
            return apiService(originalRequest);
          })
          .catch(() => {
            return Promise.reject(error);
          });
      }
    }
  }
);
