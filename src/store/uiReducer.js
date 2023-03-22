import { createSlice } from "@reduxjs/toolkit";

const uiState = {
  error: {
    message: null,
    visible: false,
    duration: 6000,
  },
  success: {
    message: null,
    visible: false,
    duration: 6000,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState: uiState,
  reducers: {
    showError(state, action) {
      state.error.message = action.payload.message;
      state.error.visible = true;
    },
    showSuccess(state, action) {
      state.success.message = action.payload.message;
      state.success.visible = true;
    },
    hideError(state) {
      state.error.message = null;
      state.error.visible = false;
    },
    hideSuccess(state) {
      state.error.message = null;
      state.error.visible = false;
    },
  },
});

export const { showError, hideError, showSuccess, hideSuccess } =
  uiSlice.actions;
export default uiSlice.reducer;
