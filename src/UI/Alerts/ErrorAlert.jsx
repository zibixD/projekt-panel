import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideError } from "../../store/uiReducer";

const ErrorAlert = () => {
  const error = useSelector((state) => state.ui.error);
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(hideError());
  };

  return (
    <Snackbar
      open={error.visible}
      autoHideDuration={error.duration}
      onClose={closeHandler}
    >
      <Alert severity="error">{error.message}</Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
