import { Snackbar, Alert } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideError } from "../../store/uiReducer";

const ErrorAlert = () => {
  const error = useSelector((state) => state.ui.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error.visible) {
      setTimeout(() => {
        closeHandler();
      }, error.duration);
    }
  }, [error.visible]);

  const closeHandler = () => {
    dispatch(hideError());
  };

  return (
    <Snackbar open={error.visible}>
      <Alert severity="error">{error.message}</Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
