import { showError, showSuccess } from "./uiReducer";

export const showSuccessSnack = (message) => async (dispatch) => {
  await dispatch(showSuccess({ message }));
};

export const showErrorSnack = (message) => async (dispatch) => {
  await dispatch(showError({ message }));
};
