import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  token: "",
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
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = "";
      state.expiration = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
