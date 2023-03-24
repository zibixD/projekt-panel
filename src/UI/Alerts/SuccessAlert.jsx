import { Snackbar, Alert } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideSuccess } from "../../store/uiReducer";

const SuccessAlert = () => {
  const success = useSelector((state) => state.ui.success);
  const dispatch = useDispatch();

 useEffect(() => {
    if (success.visible) {
      setTimeout(() => {
        closeHandler();
      }, success.duration);
    }
  }, [success.visible]);

  const closeHandler = () => {
    dispatch(hideSuccess());
  };

  return (
    <Snackbar open={success.visible}>
      <Alert severity="success">{success.message}</Alert>
    </Snackbar>
  );
};

export default SuccessAlert;
