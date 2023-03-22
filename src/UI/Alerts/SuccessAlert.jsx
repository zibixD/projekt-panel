import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { hideSuccess } from "../../store/uiReducer";

const SuccessAlert = () => {
  const success = useSelector((state) => state.ui.success);
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(hideSuccess());
  };

  return (
    <Snackbar
      open={success.visible}
      autoHideDuration={success.duration}
      onClose={closeHandler}
    >
      <Alert severity="success">{success.message}</Alert>
    </Snackbar>
  );
};

export default SuccessAlert;
