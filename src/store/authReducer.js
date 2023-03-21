import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  token: "",
  refreshToken: "",
  expiration: null,
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
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = "";
      state.expiration = null;
      state.refreshToken = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
