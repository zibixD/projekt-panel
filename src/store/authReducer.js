import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  token: "",
  refreshToken: "",
  expiration: null,
  userId: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.expiration = action.payload.expiration;
      state.refreshToken = action.payload.refreshToken;
      state.userId = action.payload.userId;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = "";
      state.expiration = null;
      state.refreshToken = "";
      state.userId = null;
    },
    refreshToken(state, action) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { login, refreshToken, logout } = authSlice.actions;
export default authSlice.reducer;
